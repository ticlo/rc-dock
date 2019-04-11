module.exports = {
  src: [
    './src/DockLayout.tsx',
    './src/DockData.ts',
  ],
  mode: 'file',
  tsconfig: 'tsconfig.json',
  out: './temp-doc',
  excludePrivate: true,
  excludeProtected: true,
  excludeExternals: true,
  readme: 'README.md',
  name: 'rc-dock',
  ignoreCompilerErrors: true,
  plugin: 'none'
};
