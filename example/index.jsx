import React from 'react';
import ReactDOM from 'react-dom';
import {Divider} from '../lib';

let demos = ['basic', 'panel-style', 'tab-cache', 'tab-update', 'save-layout', 'panel-extra'];
let advance = ['adv-tab-update', 'adv-save-layout', 'standalone-divider'];

let defaultPage = window.location.hash.substr(1);
if (!(demos.includes(defaultPage) || advance.includes(defaultPage))) {
  defaultPage = 'basic';
}

class App extends React.Component {
  state = {current: defaultPage};

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
        <nav>
          <h2>rc-dock</h2>
          <div className='link-bar'>
            Examples:<br/>
            {demoPages}
          </div>
          <div className='link-bar'>
            Advanced:<br/>
            {advancePages}
          </div>
        </nav>
        <iframe src={`./${current}.html`}/>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
