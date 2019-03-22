(async function () {

  let {React, ReactDOM, DockLayout, DockContextType, DragStore} = await import('./shared-import');

  let group = {
    floatable: true,
  };
  let box: any = {
    dockbox: {
      mode: 'horizontal',
      children: [
        {
          tabs: [{
            id: 'hello1',
            title: 'hello',
            content: <div style={{padding: 20}}>hello</div>,
            group
          }, {
            id: 'world2',
            title: 'world',
            content: <div style={{padding: 20}}>world</div>,
            group
          }],
          group,
          activeId: 'world2',
          id: 'panel1',
        },
        {
          tabs: [{
            id: 'hello3',
            title: 'hello',
            content: <div style={{padding: 20}}>hello</div>,
            group
          }
          // , {
          //   id: 'world4',
          //   title: 'world',
          //   content: <div style={{padding: 20}}>world</div>,
          //   group
          // }
          ],
          group,
          activeId: 'world4',
          id: 'panel2',
        }
      ]
    },
    floatbox: {
      mode: 'float',
      children: [
        {
          tabs: [{
            id: 'hello5',
            title: 'hello',
            content: <span style={{padding: 20}}>hello</span>,
            group
          }, {
            id: 'world6',
            title: 'world',
            content: <span style={{padding: 20}}>world</span>,
            group
          }],
          group,
          activeId: 'world6',
          id: 'panel2',
          x: 20, y: 30, w: 200, h: 200
        }
      ]
    }
  };

  interface State {
    activeId: string;
  }

  let count = 0;

  class Demo extends React.Component<any, State> {
    state = {activeId: 'world'};

    onTabChange = (activeId: string) => {
      this.setState({activeId});
    };

    render() {
      return (
        <div style={{margin: 20}}>
          <DockLayout defaultLayout={box} style={{position: 'absolute', left: 10, top: 10, right: 200, bottom: 10}}/>

          <div className='dragMe' draggable={true} onDragStart={(e) => {
            let content = `New Tab ${count++}`;
            DragStore.dragStart(DockContextType, {
              tab: {
                id: content,
                content: <div style={{padding: 20}}>{content}</div>,
                title: content,
                closable: true,
                group
              }
            });
          }} style={{}}>New Tab
          </div>
        </div>
      );
    }
  }

  ReactDOM.render(<Demo/>, document.getElementById('app'));
})();