import shell from "shelljs";
import * as fs from 'fs';
import { highlight, languages } from 'prismjs';
// Ensure required Prism languages are loaded
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';

// Build examples using Vite
function buildExample() {
  // Use Vite to build examples directly to www/examples folder
  shell.exec('vite build');
}

// Export syntax-highlighted source code for each example into www/examples/*.html
function exportCodeHtml(lan: string, file: string, data: string) {
  const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <link rel="stylesheet" href="./prism-coy.css">
  <title>${file}</title>
  <style>body{margin:0;padding:16px;box-sizing:border-box}</style>
  </head>
<body>
<pre class="language-${lan}"><code class="language-${lan}">${highlight(data, languages[lan] || languages.markup, lan)}</code></pre>
</body>
</html>`;
  // Ensure output dir exists
  shell.mkdir('-p', './www/examples');
  fs.writeFileSync(`./www/examples/${file}.html`, html);
}

function buildCodeHtml() {
  const exampleDir = './example';
  const files = fs.readdirSync(exampleDir);
  for (const file of files) {
    // Generate code HTML for .tsx and .html examples
    if (file.endsWith('.tsx') || file.endsWith('.html')) {
      const data = fs.readFileSync(`${exampleDir}/${file}`, 'utf8');
      const lan = file.endsWith('.tsx') ? 'tsx' : 'html';
      exportCodeHtml(lan, file, data);
    }
  }
}

function buildDocs() {
  shell.exec('typedoc');
  shell.mv('./temp-doc/*', './www');
}

function main() {
  shell.rm('-rf', './temp-doc');
  shell.rm('-rf', './www/examples');
  shell.rm('-rf', './www/interfaces');
  shell.rm('-rf', './www/classes');
  shell.rm('-rf', './www/assets');
  buildDocs();
  buildExample();
  if (fs.existsSync('./example/prism-coy.css')) {
    shell.cp('./example/prism-coy.css', './www/examples/prism-coy.css');
  }
  buildCodeHtml();
}

main();
