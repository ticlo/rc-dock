import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createRoot } from "react-dom/client";
import {Divider} from '../src';
// keep the above unused import so tools script can understand this tsx

let demos = ['basic', 'dark-theme', 'panel-style', 'drop-mode', 'tab-update', 'save-layout', 'panel-extra'];
let advance = ['new-window', 'adv-tab-update', 'adv-save-layout', 'controlled-layout', 'tab-cache', 'divider-box', 'drag-new-tab'];

let defaultPage = window.location.hash.substr(1);
if (!(demos.includes(defaultPage) || advance.includes(defaultPage))) {
  defaultPage = 'basic';
}

interface AppState {
  current: string;
}

class App extends React.Component<{}, AppState> {
  state: AppState = {current: defaultPage};

  render() {
    let {current} = this.state;
    let demoPages = [];
    for (let page of demos) {
      let cls = '';
      if (page === current) {
        cls = 'current';
      }
      demoPages.push(
        <a href={`#${page}`} key={page} className={cls} onClick={() => this.setState({current: page})}>
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
        <a href={`#${page}`} key={page} className={cls} onClick={() => this.setState({current: page})}>
          {page}
        </a>
      )
    }
    return (
      <div>
        <nav className='nav'>
          <h2><a href='https://ticlo.github.io/rc-dock'>rc-dock</a></h2>
          <div className='nav'>
            <div className='link-bar'>
              <a href='https://github.com/ticlo/rc-dock/tree/master/example'>
                Examples:
              </a><br/>
              {demoPages}
            </div>
            <div className='link-bar'>
              <a href='https://github.com/ticlo/rc-dock/tree/master/example'>
                Advanced:
              </a><br/>
              {advancePages}
            </div>
          </div>
        </nav>
        <iframe src={`./${current}.html`}/>
      </div>
    );
  }
}

createRoot(document.getElementById("app")).render(<App/>);
