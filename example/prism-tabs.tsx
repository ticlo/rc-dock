import React from 'react';

let name = window.location.pathname.split('/').pop();
name = name.substr(0, name.length - 5);

export const jsxTab = {
  id: 'jsxTab',
  title: 'jsx',
  closable: true,
  content: <iframe src={`./${name}.jsx.html`}/>
};


export const htmlTab = {
  id: 'htmlTab',
  title: 'html',
  closable: true,
  content: <iframe src={`./${name}.html.html`}/>
};
