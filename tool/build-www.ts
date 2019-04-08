import shell from "shelljs";
import * as fs from 'fs';

let reg = /(.|[\n\r])*\{(.*)\} from '..\/lib';/m;

function replacer(str: string, p1: string, p2: string) {
  return `(async function () {
  let {React, ReactDOM, ${p2}} = await import('./shared-import');`;
}

// convert example to dynamic import
// compile all dependencies in shared-import.js
function buildExample() {
  shell.mkdir('-p', './temp-example');
  for (let file of fs.readdirSync('./example')) {
    let data: string = fs.readFileSync(`./example/${file}`, 'utf8');

    if (file.endsWith('.jsx')) {
      data = `${data.replace(reg, replacer)} \n})();`;
    }
    fs.writeFileSync(`./temp-example/${file}`, data);
  }
  shell.exec('yarn parcel build ./temp-example/* --no-content-hash --no-source-maps --no-minify --out-dir www/examples --public-url ./');
}

function buildDocs() {
  shell.exec('yarn typedoc --options ./typedocconfig.js');
  shell.mv('./temp-doc/*', './www');
}

function main() {
  shell.rm('-rf', './www/examples');
  shell.rm('-rf', './www/interfaces');
  shell.rm('-rf', './www/classes');
  shell.rm('-rf', './www/assets');
  buildDocs();
  buildExample();
}

main();
