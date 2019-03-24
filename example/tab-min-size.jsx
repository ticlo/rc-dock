import React from 'react';
import ReactDOM from 'react-dom';
import {DockLayout} from '../lib';

let group = {
  floatable: true
};

let minSizeTab = {
  title: 'min size',
  minWidth: 300,
  minHeight: 300,
  content: (
    <div>
      This tab has a minimal size.
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
        tabs: [{...minSizeTab, id: 'id1'}, {...tab, id: 'id2'}],
        group,
        activeId: 'id1',
      },
      {
        tabs: [{...tab, id: 'id3'}, {...tab, id: 'id4'}],
        group,
        activeId: 'id3',
      },
    ]
  }
};

let count = 0;

class Demo extends React.Component {
  render() {
    return (
      <DockLayout defaultLayout={box} style={{position: 'absolute', left: 10, top: 10, right: 200, bottom: 10}}/>
    );
  }
}

ReactDOM.render(<Demo/>, document.getElementById('app'));
