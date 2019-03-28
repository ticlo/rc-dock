import React from 'react';
import ReactDOM from 'react-dom';
import {DockLayout} from '../lib';


let minSizeTab400 = {
  title: 'min size 400',
  minWidth: 400,
  minHeight: 400,
  content: (
    <div>
      <p>This tab has a minimal size.<br/>
        400 x 400 px</p>
    </div>
  ),
};
let minSizeTab300 = {
  title: 'min size 300',
  minWidth: 300,
  minHeight: 300,
  content: (
    <div>
      <p>This tab has a minimal size.<br/>
        300 x 300 px</p>
    </div>
  ),
};
let minSizeTab200 = {
  title: 'min size 200',
  minWidth: 200,
  minHeight: 200,
  content: (
    <div>
      <p>This tab has a minimal size.<br/>
        200 x 200 px</p>
    </div>
  ),
};
let tab = {
  title: 'normal',
  content: (
    <div/>
  ),
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
        tabs: [{...minSizeTab400, id: 'id3'}, {...tab, id: 'id4'}],
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
