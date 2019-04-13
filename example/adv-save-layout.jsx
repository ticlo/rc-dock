import React from 'react';
import ReactDOM from 'react-dom';
import {htmlTab, jsxTab} from "./prism-tabs";
import {DockLayout} from '../lib';

class InputTab extends React.PureComponent {

  onChange = (e) => {
    this.props.tabData.inputValue = e.target.value;
    this.forceUpdate();
  };

  render() {
    return (
      <div>
        <p>input value will be saved</p>
        <input style={{width: '100%'}} onChange={this.onChange} value={this.props.tabData.inputValue}/>
      </div>
    )
  }

  static create(tabData) {
    return <InputTab tabData={tabData}/>;
  }
}

let tab0 = {
  id: 'tab0', title: 'tab0',
  content: <div>This tab will be added back to main panel every time you load layout.</div>
};

class Demo extends React.Component {
  getRef = (r) => {
    this.dockLayout = r;
  };

  state = {saved: null};

  defaultLayout = {
    dockbox: {
      mode: 'horizontal',
      children: [
        {
          size: 200,
          tabs: [{id: 'tab1'}, {id: 'tab2'}],
        },
        {
          id: 'main-panel',
          size: 400,
          tabs: [{id: 'tab0'}, {id: 'jsxTab'}, {id: 'htmlTab'}],
          panelLock: {
            panelStyle: 'main'
          }
        },
        {
          size: 200,
          tabs: [{id: 'tab5'}, {id: 'tab6'}],
        },
      ]
    }
  };

  saveTab = (tabData) => {
    let {id, inputValue} = tabData;
    // add inputValue from saved data;
    if (id === 'tab0') {
      return null;
    }
    return {id, inputValue};
  };
  loadTab = (savedTab) => {
    let id = savedTab.id;
    switch (id) {
      case 'tab0':
        return tab0;
      case 'jsxTab':
        return jsxTab;
      case 'htmlTab':
        return htmlTab;
      default:
        return {id, title: id, content: InputTab.create, inputValue: savedTab.inputValue};
    }
  };

  // add tab0 to the main panel
  afterPanelLoaded = (savedPanel, panelData) => {
    let id = savedPanel.id;

    if (id === 'main-panel') {
      panelData.panelLock = {
        panelStyle: 'main'
      };
      panelData.tabs.unshift({...tab0});
    }
  };

  render() {
    return (
      <div>
        <DockLayout ref={this.getRef} defaultLayout={this.defaultLayout}
                    saveTab={this.saveTab} loadTab={this.loadTab} afterPanelLoaded={this.afterPanelLoaded}
                    style={{position: 'absolute', left: 10, top: 60, right: 10, bottom: 10}}/>
        <div className='top-panel'>
          <button style={{marginRight: 20}}
                  onClick={() => this.setState({saved: this.dockLayout.saveLayout()})}>
            Save Layout
          </button>
          <button disabled={this.state.saved == null}
                  onClick={() => this.dockLayout.loadLayout(this.state.saved)}>
            Load Layout
          </button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Demo/>, document.getElementById('app'));
