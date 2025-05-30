import shell from "shelljs";
import * as fs from 'fs';
import {highlight, languages} from 'prismjs';

let reg = /(.|[\n\r])*\{(.*)\} from '..\/lib';/m;

function replacer(str: string, p1: string, p2: string) {
  return `import('./shared-import').then(({React, ReactDOM, jsxTab, htmlTab, createRoot, ${p2}})=>{`;
}

function exportCodeHtml(lan: string, file: string, data: string) {
  let html = highlight(data, languages[lan], lan);

  html = `<html>
<head>
<link rel="stylesheet" href="./prism-coy.css">
</head>
<body>
<pre class="language-${lan}">
<code class="language-${lan}">${html}</code>
</pre>
</body>
</html>`;
  fs.writeFileSync(`./temp-example/${file}.html`, html);
}

// convert example to dynamic import
// compile all dependencies in shared-import.js
function buildExample() {
  shell.mkdir('-p', './temp-example');
  for (let file of fs.readdirSync('./example')) {
    let data: string = fs.readFileSync(`./example/${file}`, 'utf8');

    if (file.endsWith('.jsx')) {
      exportCodeHtml('javascript', file, data);
      if (file.startsWith('dark-theme')) {
        // don't build dark theme js
        continue;
      }
      data = `${data.replace(reg, replacer)} \n});`;
    } else if (file.endsWith('.html')) {
      exportCodeHtml('html', file, data);
    }
    fs.writeFileSync(`./temp-example/${file}`, data);
  }
  shell.exec('parcel build ./temp-example/* --no-content-hash --no-source-maps --no-minify --out-dir www/examples --public-url ./');
}

function buildDocs() {
  shell.exec('typedoc');
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
