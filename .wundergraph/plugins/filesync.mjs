import sane from 'sane';
import fs from 'fs-extra';
import path from 'path';
import glob from 'glob';
import readline from 'readline';
import inquirer from 'inquirer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import file from 'fs-extra/lib/ensure/file';


function filesync(sourceDir, targetDir, syncType) {

  // Check if the source folder exists

  const sourceDirExists = fs.existsSync(sourceDir);
  const targetDirExists = fs.existsSync(targetDir);
  function builtTargetPath(sourceDir, targetDir, filepath) {
    const fullpath = path.join(sourceDir, filepath);
    const parentDir = path.dirname(fullpath);
    const pathSegments = filepath.split('/');
    const pluginName = pathSegments[pathSegments.length - 3];
    const relativePath = path.relative(parentDir, filepath);
    return targetFilePath = path.join(targetDir, pluginName, relativePath);
  }

  if (!sourceDirExists) {
    console.log('The source directory does not exist.');
    process.exit(1);
  }

  // Checks if the source and target match and ask to continue
  else if (sourceDirExists && targetDirExists) {
    inquirer.prompt([
      {
        name: 'syncyn',
        message: 'The target ' + syncType + ' directory already exists. Do you want to overwrite it? (Y/N) '
      }
    ])
      .then((answer) => {
        if (answer.syncyn === 'n' || answer.syncyn === 'N') {
          process.exit(1);
        } else if (answer.syncyn === 'y' || answer.syncyn === 'Y') {
          // Overwrite the target folder location.
          fs.emptyDirSync(targetDir);
          console.log('emptydir');
          glob.sync('**/' + syncType + '/**.graphql', { cwd: sourceDir }).forEach(filepath => {
            builtTargetPath(sourceDir, targetDir, filepath);
            fs.ensureDirSync(path.dirname(targetFilePath));
            fs.copySync(filepath, targetFilePath);
            console.log(`Copied ${filepath} to ${targetFilePath} (initial sync)`);
          });
          watchSync(sourceDir, targetDir, syncType);
        } else {
          console.log("invalid input");
          process.exit(1);
        }
      });
  }

  else {
    console.log('No Conflicting Target Directory found.')
    watchSync(sourceDir, targetDir, syncType);
  };
};



// watches folders for changes
function watchSync(sourceDir, targetDir, syncType) {
  const currentFilePath = fileURLToPath(import.meta.url);
  const currentDir = dirname(currentFilePath);

  console.log('Running from directory:', currentDir);
  
  const watcher = sane(sourceDir, {
    glob: ['**/' + syncType + '/**.graphql']
  });

  watcher.on('change', (filepath, stat) => {
    builtTargetPath(sourceDir, targetDir, filepath);
    fs.ensureDirSync(path.dirname(targetFilePath));
    fs.copySync(filepath, targetFilePath);

    console.log(`Copied ${filepath} to ${targetFilePath}`);
  });

  watcher.on('delete', (filepath) => {
    builtTargetPath(sourceDir, targetDir, filepath);
    fs.unlinkSync(targetFilePath);

    console.log(`Deleted ${filepath} from ${targetFilePath}`);
  });

  console.log('Watching for ' + syncType + ' folder changes...');
};


filesync('./', '../operations/SyncedPlugins', 'operations');
// filesync('./', '../fragments/SyncedPlugins', 'fragments');