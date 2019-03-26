import React from 'react';
import ReactDOM from 'react-dom';
import {DockLayout} from '../lib';

let group = {
  floatable: true
};

let minSizeTab300 = {
  title: 'min size',
  minWidth: 300,
  minHeight: 300,
  content: (
    <div>
      <p>This tab has a minimal size.<br/>
        300 x 300 px</p>
    </div>
  ),
  group
};
let minSizeTab200 = {
  title: 'min size',
  minWidth: 200,
  minHeight: 200,
  content: (
    <div>
      <p>This tab has a minimal size.<br/>
        200 x 200 px</p>
    </div>
  ),
  group
};
let tab = {
  title: 'normal',
  content: (
    <div/>
  ),
  group
};
let box = {
  dockbox: {
    mode: 'horizontal',
    children: [
      {
        mode: 'vertical',
        children: [
          {
            tabs: [{...minSizeTab300, id: 'id1'}, {...tab, id: 'id2'}],
          },
          {
            tabs: [{...minSizeTab200, id: 'id5'}],
          }
        ]
      },

      {
        tabs: [{...tab, id: 'id3'}, {...tab, id: 'id4'}],
      },
    ]
  }
};

class Demo extends React.Component {
  render() {
    return (
      <DockLayout defaultLayout={box} style={{position: 'absolute', left: 10, top: 10, right: 10, bottom: 10}}/>
    );
  }
}

ReactDOM.render(<Demo/>, document.getElementById('app'));
