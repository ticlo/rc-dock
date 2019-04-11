import React from 'react';
import ReactDOM from 'react-dom';
import {DockLayout} from '../lib';

let tab0 = {
  title: 'Controlled Layout',
  content: (
    <div>
      <p>When you use <b>layout</b> instead of <b>defaultLayout</b> on &lt;DockLayout&gt;</p>
      <p>DockLayout will work as a controlled component</p>
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
            tabs: [{id: 't0'}, {id: 't2'}, {id: 't3'}],
          },
          {
            tabs: [{id: 't4'}, {id: 't5'}, {id: 't6'}],
          }
        ]
      },
      {
        tabs: [{id: 't7'}, {id: 't8'}, {id: 't9'}],
      },
    ]
  }
};

class Demo extends React.Component {
  state = {layout: box};

  loadTab = (data) => {
    let {id} = data;
    if (id === 't0') {
      return {...tab0, id};
    }
    return {
      id, title: id,
      content: <div>Tab Content</div>
    };
  };

  onLayoutChange = (newLayout) => {
    // control DockLayout from state
    console.log(newLayout);
    this.setState({layout: newLayout});
  };

  render() {
    return (
      <DockLayout layout={this.state.layout} loadTab={this.loadTab} onLayoutChange={this.onLayoutChange}
                  style={{position: 'absolute', left: 10, top: 10, right: 10, bottom: 10}}/>
    );
  }
}

ReactDOM.render(<Demo/>, document.getElementById('app'));
