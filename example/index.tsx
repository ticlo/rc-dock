import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createRoot } from "react-dom/client";

interface AppState {
  current: string;
}

class App extends React.Component<{}, AppState> {

  render() {
    return (
      <div>
        <iframe src={`./basic.html`}/>
      </div>
    );
  }
}

createRoot(document.getElementById("app")).render(<App/>);
