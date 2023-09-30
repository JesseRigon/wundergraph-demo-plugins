import sane from 'sane';
import fs from 'fs-extra';
import path, { dirname } from 'path';
import glob from 'glob';
import inquirer from 'inquirer';
import { fileURLToPath } from 'url';


function filesync (sourceDir, targetDir, syncType) {

  const buildTargetPaths = (sourceDir, targetDir, syncType, filepath) => {
    const fullpath = path.join(sourceDir, filepath);
    const parentDir = path.dirname(fullpath);
    const pathSegments = filepath.split('/');
    const pluginName = pathSegments[pathSegments.length - 3];
    const relativePath = path.relative(parentDir, filepath);
    return path.join(targetDir, pluginName, relativePath);
  };


  function initialSync () {
    glob.sync('**/' + syncType + '/**.graphql', { cwd: sourceDir }).forEach(filepath => {
      var targetFilePath = buildTargetPaths(sourceDir, targetDir, syncType, filepath);
      fs.ensureDirSync(path.dirname(targetFilePath));
      fs.copySync(filepath, targetFilePath);
      console.log(`Copied ${filepath} to ${targetFilePath} (initial sync)`);
    });
  };


  function watch () {
    const currentFilePath = fileURLToPath(import.meta.url);
    const currentDir = dirname(currentFilePath);
  
    console.log('Running from directory:', currentDir);
    
    const watcher = sane(sourceDir, {
      glob: ['**/' + syncType + '/**.graphql']
    });
  
    watcher.on('change', (filepath, stat) => {
      var targetFilePath = buildTargetPaths();
      fs.ensureDirSync(path.dirname(targetFilePath));
      fs.copySync(filepath, targetFilePath);
  
      console.log(`Copied ${filepath} to ${targetFilePath}`);
    });
  
    watcher.on('delete', (filepath) => {
      var targetFilePath = buildTargetPaths();
      fs.unlinkSync(targetFilePath);
  
      console.log(`Deleted ${filepath} from ${targetFilePath}`);
    });
  
    console.log('Watching for ' + syncType + ' folder changes...');
  };


  const sourceDirExists = fs.existsSync(sourceDir);
  const targetDirExists = fs.existsSync(targetDir);

  // Check if the source folder exists
  if (!sourceDirExists) {
    console.log('The source directory does not exist.');
    process.exit(1);
  }

  // Checks if the source and target match and ask to continue
  else if (sourceDirExists && targetDirExists) {
    inquirer.prompt([
      {
        name: 'overwrite',
        message: 'The target ' + syncType + ' directory already exists. Do you want to overwrite it? (Y/N) '
      }
    ])
    .then((answer) => {
      if (answer.overwrite === 'n' || answer.overwrite === 'N') {
        process.exit(1);
      } else if (answer.overwrite === 'y' || answer.overwrite === 'Y') {
        // Overwrite the target folder location.
        fs.emptyDirSync(targetDir);
        console.log('Target Directory has been removed and recreated');
        initialSync();
        watch();
      } else {
        console.log("invalid input");
        process.exit(1);
      }
    });
  }

  else {
    console.log('No Conflicting Target Directory found.')
    initialSync();
    watch();
  };
};



filesync('./', '../operations/SyncedPlugins', 'operations');
// filesync('./', '../fragments/SyncedPlugins', 'fragments');