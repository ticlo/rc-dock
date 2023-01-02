export const groupClassNames = (groupName: string = '', classes: string[] = []) =>
  (groupName.split(' ').map((name) => `dock-style-${name}`) ?? [])
    .concat(classes)
    .join(' ');
