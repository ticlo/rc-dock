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

const isArray = Array.isArray;

export function compareChildKeys(a: {[key: string]: any}[], b: {[key: string]: any}[], keys: string[]) {
  if (a === b) {
    return true;
  }
  if (isArray(a) && isArray(b)) {
    let len = a.length;
    if (len !== b.length) {
      return false;
    }
    for (let i = 0; i < len; ++i) {
      if (!compareKeys(a[i], b[i], keys)) {
        return false;
      }
    }
    return true;
  }
  return false;
}