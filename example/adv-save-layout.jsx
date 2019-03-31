import React from 'react';
import ReactDOM from 'react-dom';
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

function getTab(id) {
  return {id, title: id, content: InputTab.create, inputValue: ''}
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
          tabs: [getTab('tab1'), getTab('tab2')],
        },
        {
          id: 'main-panel',
          size: 400,
          tabs: [tab0, getTab('tab3'), getTab('tab4')],
          panelLock: {
            panelStyle: 'main'
          }
        },
        {
          size: 200,
          tabs: [getTab('tab5'), getTab('tab6')],
        },
      ]
    }
  };

  saveModifier = {
    modifySavedTab(savedTab, tabData) {
      // add inputValue from saved data;
      savedTab.inputValue = tabData.inputValue;
    },
  };
  loadModifier = {
    loadTab(savedTab) {
      let id = savedTab.id;
      if (id === 'tab0') {
        return null;
      }
      let tabData = getTab(id);
      // load inputValue from savedData
      tabData.inputValue = savedTab.inputValue;
      return tabData;
    },
    // add tab0 to the main panel
    modifyLoadedPanel(savedPanel, panelData) {
      let id = savedPanel.id;

      if (id === 'main-panel') {
        panelData.panelLock = {
          panelStyle: 'main'
        };
        panelData.tabs.unshift({...tab0});
      }
    }
  };

  render() {
    return (
      <div>
        <DockLayout ref={this.getRef} defaultLayout={this.defaultLayout}
                    style={{position: 'absolute', left: 10, top: 60, right: 10, bottom: 10}}/>
        <div className='top-panel'>
          <button style={{marginRight: 20}}
                  onClick={() => this.setState({saved: this.dockLayout.saveLayout(this.saveModifier)})}>
            Save Layout
          </button>
          <button disabled={this.state.saved == null}
                  onClick={() => this.dockLayout.loadLayout(this.state.saved, this.loadModifier)}>
            Load Layout
          </button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Demo/>, document.getElementById('app'));
