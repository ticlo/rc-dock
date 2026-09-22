import '../../style/index-light.less';

// React's act() waits for component updates in the browser tests.
(globalThis as typeof globalThis & {IS_REACT_ACT_ENVIRONMENT: boolean}).IS_REACT_ACT_ENVIRONMENT = true;
