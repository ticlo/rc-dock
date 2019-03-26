import React from 'react';
import ReactDOM from 'react-dom';
import {Divider} from '../lib';

let demos = ['basic', 'panel-style', 'tab-cache', 'tab-update'];
let advance = ['standalone-divider'];

class App extends React.Component {
  state = {current: 'basic'};

  render() {
    let {current} = this.state;
    let demoPages = [];
    for (let page of demos) {
      let cls = '';
      if (page === current) {
        cls = 'current';
      }
      demoPages.push(
        <a href={`#${page}`} key={page} className={cls} onClick={(e) => this.setState({current: page})}>
          {page}
        </a>
      )
    }
    let advancePages = [];
    for (let page of advance) {
      let cls = '';
      if (page === current) {
        cls = 'current';
      }
      advancePages.push(
        <a href={`#${page}`} key={page} className={cls} onClick={(e) => this.setState({current: page})}>
          {page}
        </a>
      )
    }
    return (
      <div>
        <h2>rc-dock <small> - dock layout for react component</small></h2>
        <div className='link-bar'>
          Examples:
          {demoPages}
        </div>
        <div className='link-bar'>
          Advanced:
          {advancePages}
        </div>
        <iframe src={`./${current}.html`}/>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
