import * as React from "react";
/** @ignore */
export const defaultGroup = {
    floatable: true,
    maximizable: true,
    movable: true,
    resizable: true
};
/** @ignore */
export const placeHolderStyle = 'place-holder';
/** @ignore */
export const maximePlaceHolderId = '-maximized-placeholder-';
/** @ignore */
export const placeHolderGroup = {
    floatable: false,
};
/** @ignore */
export const DockContextType = React.createContext(null);
/** @ignore */
export const DockContextProvider = DockContextType.Provider;
/** @ignore */
export const DockContextConsumer = DockContextType.Consumer;
export const DockTabIdContext = React.createContext(null);
