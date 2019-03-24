module.exports = {
  src: [
    './src'
  ],
  mode: 'file',
  tsconfig: 'tsconfig.json',
  out: './www',
  excludePrivate: true,
  excludeProtected: true,
  excludeExternals: true,
  readme: 'README.md',
  name: 'RC Dock',
  ignoreCompilerErrors: true,
  plugin: 'none'
};