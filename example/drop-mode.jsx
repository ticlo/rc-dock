import React from 'react';
import ReactDOM from 'react-dom';
import {htmlTab, jsxTab} from "./prism-tabs";
import {DockLayout} from '../lib';

let dropModeTab = {
  title: 'Drop Mode',
  content: (
    <div>
      <p>When you set <b>dropMode</b>='edge' on &lt;DockLayout&gt;</p>
      <p>The distance between mouse cursor and panel border is used to pick drop location.</p>
    </div>
  )
};

let tab = {
  title: 'Tab',
  content: <div>Tab Content</div>
};
let box = {
  dockbox: {
    mode: 'horizontal',
    children: [
      {
        mode: 'vertical',
        children: [
          {
            tabs: [{...dropModeTab, id: 't1'}, jsxTab, htmlTab],
          },
          {
            tabs: [{...tab, id: 't4'}, {...tab, id: 't5'}, {...tab, id: 't6'}],
          }
        ]
      },
      {
        tabs: [{...tab, id: 't7'}, {...tab, id: 't8'}, {...tab, id: 't9'}],
      },
    ]
  }
};

class Demo extends React.Component {
  render() {
    return (
      <DockLayout defaultLayout={box} dropMode='edge'
                  style={{position: 'absolute', left: 10, top: 10, right: 10, bottom: 10}}/>
    );
  }
}

ReactDOM.render(<Demo/>, document.getElementById('app'));
