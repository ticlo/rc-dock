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
            group,
            activeId: 'id1',
          },
          {
            tabs: [{...minSizeTab200, id: 'id5'}],
            group,
            activeId: 'id5',
          }
        ]
      },

      {
        tabs: [{...tab, id: 'id3'}, {...tab, id: 'id4'}],
        group,
        activeId: 'id3',
      },
    ]
  }
};

const Context = React.createContext();


class Demo extends React.Component {

  state = {ctx: 0};
  addCtx = () => {
    this.setState({ctx: this.state.ctx + 1})
  };

  defaultLayout = {
    dockbox: {
      mode: 'horizontal',
      children: [
        {
          tabs: [{
            id: 'id1', title: 'consumer', group, content: (
              <Context.Consumer>
                {(value) => (
                  <div>
                    <p>React Context is the easiest way to update children tab.</p>
                    Current value is: <b>{value}</b> <input/>
                  </div>
                )}
              </Context.Consumer>
            )
          }],
          group, cached: true,
          activeId: 'id1',
        },
        {
          tabs: [{
            id: 'id2', title: 'add count', group, content: (
              <div>
                <p>Click here to change context.</p>
                <button onClick={this.addCtx}>Add</button>
              </div>
            )
          }],
          group,
          activeId: 'id2',
        }
      ]
    }
  };

  render() {
    return (
      <Context.Provider value={this.state.ctx}>
        <DockLayout defaultLayout={this.defaultLayout}
                    style={{position: 'absolute', left: 10, top: 10, right: 10, bottom: 10}}/>
      </Context.Provider>

    );
  }
}

ReactDOM.render(<Demo/>, document.getElementById('app'));
