import sane from 'sane';
import fs from 'fs-extra';
import path from 'path';
import glob from 'glob';
import readline from 'readline';
import inquirer from 'inquirer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import rsync from 'rsync';

function syncFiles(sourceDir, targetDir) {

  rsync.list(sourceDir).forEach(file => {
    console.log(path.dirname(file));
    // const parentDir = path.dirname(file);
    // const pathSegments = file.split('/');
    // const pluginName = pathSegments[pathSegments.length - 3];
    // const relativePath = path.relative(parentDir, file);
    // const targetFile = path.join(targetDir, pluginName, relativePath);

    // rsync.copy(file, targetFile);

  });

  // Rsync monitor 
  // rsync.monitor(sourceDir, {
  //   recursive: true,
  //   delete: true,
  //   source: sourceDir,
  //   destination: targetDir
  // }, error => {
  //   if (error) {
  //     console.error(error); 
  //   }
  // });

}


syncFiles('./', '../operations/SyncedPlugins');