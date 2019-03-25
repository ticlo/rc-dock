import shell from "shelljs";
import * as fs from 'fs';

let reg = /(.|[\n\r])*\{(.*)\} from '..\/lib';/m;

function replacer(str: string, p1: string, p2: string) {
  return `(async function () {
  let {React, ReactDOM, ${p2}} = await import('./shared-import');`;
}

// convert example to dynamic import
// compile all dependencies in shared-import.js
function main() {
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

main();
