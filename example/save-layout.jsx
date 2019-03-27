import React from 'react';
import ReactDOM from 'react-dom';
import {DockLayout} from '../lib';

let group = {
  floatable: true
};

let tab1 = {id: 't1', title: 'Tab 1', content: <div>Tab 1</div>, group};
let tab2 = {id: 't2', title: 'Tab 2', content: <div>Tab 2</div>, group};
let tab3 = {id: 't3', title: 'Tab 3', content: <div>Tab 3</div>, group};
let tab4 = {id: 't4', title: 'Tab 4', content: <div>Tab 4</div>, group};
let tab5 = {id: 't5', title: 'Tab 5', content: <div>Tab 5</div>, group};
let tab6 = {id: 't6', title: 'Tab 6', content: <div>Tab 6</div>, group};

let defaultLayout = {
  dockbox: {
    mode: 'horizontal',
    children: [
      {
        mode: 'vertical',
        children: [
          {
            tabs: [tab1, tab2],
          },
          {
            tabs: [tab3, tab4],
          }
        ]
      },
      {
        tabs: [tab5, tab6],
      },
    ]
  }
};
let panelLayout = {
  dockbox: {
    mode: 'horizontal',
    children: [
      {
        tabs: [{id: 't1'}, {id: 't2'}, {id: 't3'}, {id: 't4'}, {id: 't5'}, {id: 't6'}],
      },
    ]
  }
};
let horizontalLayout = {
  dockbox: {
    mode: 'horizontal',
    children: [
      {tabs: [{id: 't1'}]},
      {tabs: [{id: 't2'}]},
      {tabs: [{id: 't3'}]},
      {tabs: [{id: 't4'}]},
      {tabs: [{id: 't5'}]},
      {tabs: [{id: 't6'}]},
    ]
  }
};

class Demo extends React.Component {
  getRef = (r) => {
    this.dockLayout = r;
  };

  state = {saved: null};

  render() {
    return (
      <div>
        <DockLayout ref={this.getRef} defaultLayout={defaultLayout}
                    style={{position: 'absolute', left: 10, top: 10, right: 180, bottom: 10}}/>
        <div style={{width: 150, position: 'absolute', right: 20}}>
          <div onClick={() => this.setState({saved: this.dockLayout.saveLayout()})}>
            Save Layout
          </div>
          <div onClick={() => this.dockLayout.loadLayout(this.state.saved)}>
            Load Saved Layout
          </div>
          <div>Load Horizontal</div>
          <div>Load Single Panel</div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Demo/>, document.getElementById('app'));
