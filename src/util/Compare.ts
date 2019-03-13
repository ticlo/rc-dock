export function compareKeys(a: {[key: string]: any}, b: {[key: string]: any}, keys: string[]) {
  if (a === b) {
    return true;
  }
  if (a && b && typeof a === 'object' && typeof b === 'object') {
    for (let key of keys) {
      if (a[key] !== b[key]) {
        return false;
      }
    }
    return true;
  }
  return false;
}
