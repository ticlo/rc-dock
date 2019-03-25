import React from 'react';
import ReactDOM from 'react-dom';


let demos = ['basic', 'panel-style', 'tab-cache', 'tab-min-size', 'divider'];

class App extends React.Component {
  state = {current: 'basic'};

  render() {
    let {current} = this.state;
    let children = [];
    for (let page of demos) {
      let cls = '';
      if (page === current) {
        cls = 'current';
      }
      children.push(
        <a href={`#${page}`} className={cls} onClick={(e) => this.setState({current: page})}>
          {page}
        </a>
      )
    }
    return (
      <div>
        <div className='link-bar'>
          Examples:
          {children}
        </div>
        <iframe src={`./${current}.html`}/>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
