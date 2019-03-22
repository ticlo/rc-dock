import React from 'react';
let _idCount = 0;
export function nextId() {
    ++_idCount;
    if (_idCount >= Number.MAX_SAFE_INTEGER) {
        _idCount = -Number.MAX_SAFE_INTEGER;
    }
    return `+${_idCount}`;
}
export const DockContextType = React.createContext(null);
export const DockContextProvider = DockContextType.Provider;
export const DockContextConsumer = DockContextType.Consumer;
//# sourceMappingURL=DockData.js.map