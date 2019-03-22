(async function () {
  const {React, ReactDOM, Divider} = await import('./shared-import');

  let index = 1;

  interface State {
    sizes: number[];
  }

  class Demo extends React.Component<any, State> {
    _ref: HTMLDivElement;
    getRef = (r: HTMLDivElement) => {
      this._ref = r;
    };
    state = {sizes: [200, 200, 30]};
    getDividerData = (idx: number) => {
      let children: any[] = [];
      this._ref.childNodes.forEach((child: HTMLDivElement) => {
        if (!child.classList.contains('dock-divider')) {
          children.push({
            size: child.offsetWidth,
            minSize: 20 // give them 20px min width
          });
        }
      });
      return {
        element: this._ref,
        beforeDivider: children.slice(0, idx),
        afterDivider: children.slice(idx)
      };
    };
    changeSizes = (sizes: number[]) => {
      this.setState({sizes});
    };

    render() {
      let {sizes} = this.state;
      return (
        <div ref={this.getRef} className='box'>
          <div style={{width: sizes[0]}}/>
          <Divider idx={1} getDividerData={this.getDividerData} changeSizes={this.changeSizes}/>
          <div style={{width: sizes[1]}}/>
          <Divider idx={2} getDividerData={this.getDividerData} changeSizes={this.changeSizes}/>
          <div style={{width: sizes[2]}}/>
        </div>
      );
    }
  }

  ReactDOM.render(<Demo/>, document.getElementById('app'));
})();

