import React from 'react';
/** @ignore */
let _idCount = 0;
/** @ignore */
export function nextId() {
    ++_idCount;
    // if (_idCount >= Number.MAX_SAFE_INTEGER) {
    // }
    return `+${_idCount}`;
}
/** @ignore */
export const DockContextType = React.createContext(null);
/** @ignore */
export const DockContextProvider = DockContextType.Provider;
/** @ignore */
export const DockContextConsumer = DockContextType.Consumer;
//# sourceMappingURL=DockData.js.map