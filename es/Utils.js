export const groupClassNames = (groupName = '', classes = []) => {
    var _a;
    return ((_a = groupName.split(' ').map((name) => `dock-style-${name}`)) !== null && _a !== void 0 ? _a : [])
        .concat(classes)
        .join(' ');
};
