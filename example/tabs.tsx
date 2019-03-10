import React from 'react';
import ReactDOM from 'react-dom';
import Tabs, {TabPane} from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';

let index = 1;

class Demo extends React.Component {
  state = {
    tabs: [{
      title: '初始',
      content: '初始内容',
    }],
    activeKey: '初始',
  };

  onTabChange = (activeKey) => {
    this.setState({
      activeKey,
    });
  };

  construct() {
    const disabled = true;
    return this.state.tabs.map((t) => {
      return (<TabPane
        tab={<span>{t.title}
          <a
            style={{
              position: 'absolute',
              cursor: 'pointer',
              color: 'red',
              right: 5,
              top: 0,
            }}
            onClick={(e) => {
              this.remove(t.title, e);
            }}
          >x</a>
      </span>}
        key={t.title}
      >
        <div style={{padding: 100}}>
          {t.content}
        </div>
      </TabPane>);
    }).concat([
      <TabPane
        tab={<a style={{color: 'black', cursor: 'pointer'}} onClick={this.add}> + 添加</a>}
        disabled={disabled}
        key="__add"
      />,
    ]);
  }

  remove = (title, e) => {
    e.stopPropagation();
    if (this.state.tabs.length === 1) {
      alert('只剩一个，不能删');
      return;
    }
    let foundIndex = 0;
    const after = this.state.tabs.filter((t, i) => {
      if (t.title !== title) {
        return true;
      }
      foundIndex = i;
      return false;
    });
    let activeKey = this.state.activeKey;
    if (activeKey === title) {
      if (foundIndex) {
        foundIndex--;
      }
      activeKey = after[foundIndex].title;
    }
    this.setState({
      tabs: after,
      activeKey,
    });
  };

  add = (e) => {
    e.stopPropagation();
    index++;
    const newTab = {
      title: `名称: ${index}`,
      content: `内容: ${index}`,
    };
    this.setState({
      tabs: this.state.tabs.concat(newTab),
      activeKey: `名称: ${index}`,
    });
  };

  render() {

    return (
      <div style={{margin: 20}}>
        <h2>Addable Tabs</h2>
        <div className='dock-root'>
          <div className='dock-panel'
               style={{position: 'absolute', left: 100, top: 100, width: 300, height: 300}}>
            <Tabs prefixCls='dock-tabs'
                  renderTabBar={() => (
                    <ScrollableInkTabBar
                      extraContent={
                        <button onClick={this.add}>+添加</button>
                      }
                    />
                  )}
                  renderTabContent={() => <TabContent/>}
                  activeKey={this.state.activeKey}
                  onChange={this.onTabChange}
            >
              {this.construct()}
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}


// import React from 'react';
// import ReactDOM from 'react-dom';
//
// import {Tabs} from 'antd';
//
// const TabPane = Tabs.TabPane;
//
// class Demo extends React.Component {
//   constructor(props) {
//     super(props);
//     this.newTabIndex = 0;
//     const panes = [
//       {title: 'Tab 1', content: 'Content of Tab 1', key: '1'},
//       {title: 'Tab 2', content: 'Content of Tab 2', key: '2'},
//       {
//         title: 'Tab 3', content: 'Content of Tab 3', key: '3', closable: false,
//       },
//     ];
//     this.state = {
//       activeKey: panes[0].key,
//       panes,
//     };
//   }
//
//   onChange = (activeKey) => {
//     this.setState({activeKey});
//   };
//
//   onEdit = (targetKey, action) => {
//     this[action](targetKey);
//   };
//
//   add = () => {
//     const panes = this.state.panes;
//     const activeKey = `newTab${this.newTabIndex++}`;
//     panes.push({title: 'New Tab', content: 'Content of new Tab', key: activeKey});
//     this.setState({panes, activeKey});
//   };
//
//   remove = (targetKey) => {
//     let activeKey = this.state.activeKey;
//     let lastIndex;
//     this.state.panes.forEach((pane, i) => {
//       if (pane.key === targetKey) {
//         lastIndex = i - 1;
//       }
//     });
//     const panes = this.state.panes.filter(pane => pane.key !== targetKey);
//     if (panes.length && activeKey === targetKey) {
//       if (lastIndex >= 0) {
//         activeKey = panes[lastIndex].key;
//       } else {
//         activeKey = panes[0].key;
//       }
//     }
//     this.setState({panes, activeKey});
//   };
//
//   render() {
//     return (
//       <div className='ticlo-dock'>
//         <div className='ticlo-dock-panel' style={{position: 'absolute', left: 100, top: 100, width: 300, height: 300}}>
//           <Tabs
//             onChange={this.onChange}
//             activeKey={this.state.activeKey}
//             onEdit={this.onEdit}
//           >
//             {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key}
//                                                    closable={pane.closable}>{pane.content}</TabPane>)}
//           </Tabs>
//         </div>
//
//       </div>
//     );
//   }
// }

ReactDOM.render(<Demo/>, document.getElementById('app'));