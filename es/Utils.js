export function mergeTabGroups(group, localGroup) {
    return (group || localGroup) && Object.assign(Object.assign({}, group), localGroup);
}
