export const groupClassNames = (groupNames: string = ''): string[] =>
  groupNames
    .split(' ')
    .filter((value) => value !== '')
    .map((name) => `dock-style-${name}`);
