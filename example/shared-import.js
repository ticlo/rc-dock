export * from '../lib';

import React1 from 'react';
import ReactDom1 from 'react-dom';
import {polyfill} from "mobile-drag-drop";

export const React = React1;
export const ReactDOM = ReactDom1;

polyfill({});
