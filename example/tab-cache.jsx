import React from 'react';
import ReactDOM from 'react-dom';
import {DockLayout} from '../lib';

let cachedTab = {
  title: 'cached',
  cached: true,  // cached = true allows the component to keep its internal state when dragged around
  content: (
    <div>
      <p>cached = true</p>
      <p>React component in this tab will keep its internal state when dragged around</p>
      <input/>
    </div>
  ),
};
let nocachedTab = {
  title: 'lose state',
  content: (
    <div>
      <p>By default, React won't reuse component if it moves out from its parent</p>
      <p style={{color: 'red'}}>This input might lose its state when dragged around</p>
      <input/>
    </div>
  ),
};
let box = {
  dockbox: {
    mode: 'horizontal',
    children: [
      {
        tabs: [{...cachedTab, id: 'cache1'}, {...cachedTab, id: 'cache2'}],
      },
      {
        tabs: [{...nocachedTab, id: 'nocache1'}, {...nocachedTab, id: 'nocache2'}],
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
