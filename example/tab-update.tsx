import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createRoot } from "react-dom/client";
import {htmlTab, jsxTab} from "./prism-tabs";
import {DockLayout} from '../src';

const Context = React.createContext<number>(0);

interface DemoState {
  ctx: number;
}

class Demo extends React.Component<{}, DemoState> {

  state: DemoState = {ctx: 0};
  addCtx = () => {
    this.setState({ctx: this.state.ctx + 1})
  };

  defaultLayout: any = {
    dockbox: {
      mode: 'vertical',
      children: [
        {
          tabs: [
            {
              id: 'id2', title: 'change', content: (
                <div>
                  <p>Click here to change value in React Context.</p>
                  <button className='btn' onClick={this.addCtx}>Update Value</button>
                </div>
              )
            },
            jsxTab,
            htmlTab],
        },
        {
          tabs: [{
            id: 'id1', title: 'context consumer', content: (
              <Context.Consumer>
                {(value) => (
                  <div>
                    <p>React Context is the easiest way to update children tab.</p>
                    Current value is: <b>{value}</b>
                  </div>
                )}
              </Context.Consumer>
            ),
            // cached: true,
            // cacheContext: Context  // if cached = true, cacheContext is needed to pass the context to cache
          }],
        },
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

createRoot(document.getElementById("app")).render(<React.StrictMode><Demo/></React.StrictMode>);
