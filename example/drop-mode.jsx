import React from 'react';
import ReactDOM from 'react-dom';
import {DockLayout} from '../lib';

let tab = {
  title: 'Tab',
  content: (
    <div>
      <p>When you set dropMode='edge' on DockLayout</p>
      <p>The small square drop indicators will stop showing as you drag around.</p>
      <p>Instead, the distance between panel border to the mouse is used to choose the drop location.</p>
    </div>
  )
};

let box = {
  dockbox: {
    mode: 'horizontal',
    children: [
      {
        mode: 'vertical',
        children: [
          {
            tabs: [{...tab, id: 't1'}, {...tab, id: 't2'}, {...tab, id: 't3'}],
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
