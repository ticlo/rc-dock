import * as React from "react";

let name = window.location.pathname.split('/').pop();
name = name.substr(0, name.length - 5);

export const tsxTab = {
  id: 'tsxTab',
  title: 'tsx',
  closable: true,
  content: <iframe src={`./${name}.tsx.html`}/>
};


export const htmlTab = {
  id: 'htmlTab',
  title: 'html',
  closable: true,
  content: <iframe src={`./${name}.html.html`}/>
};
