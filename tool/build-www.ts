import shell from "shelljs";

// Build examples using Vite
function buildExample() {
  // Use Vite to build examples directly to www/examples folder
  shell.exec('vite build');
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
}

main();
