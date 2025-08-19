import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {createRoot} from "react-dom/client";
import {jsxTab, htmlTab} from './prism-tabs';
import {DockLayout, LayoutData} from '../src';
import LoadingComponent from './loading';

// Lazy load the components
const SampleForm = React.lazy(() => import('./sample-form'));
const EmployeeTable = React.lazy(() => import('./employee-table'));
const DataTable = React.lazy(() => import('./sample-table'));

let layout: LayoutData = {
  dockbox: {
    mode: 'horizontal',
    children: [
      {
        mode: 'vertical',
        size: 250,
        children: [
          {
            tabs: [{
              id: 't3',
              title: 'Sample Form ',
              cached: true,
              content: (
                // <SampleForm />
                <React.Suspense fallback={<LoadingComponent />}>
                  <SampleForm />
                </React.Suspense>
              ), minWidth: 250, minHeight: 250,
            },
            ],
          },
          {
            mode: 'horizontal',
            children: [
              {
                mode: 'vertical',
                size: 20,
                children: [
                  {
                    tabs: [{
                      id: 't3 innner',
                      title: 'Sample Form inner ',
                      cached: true,
                      content: (
                        // <SampleForm />
                        <React.Suspense fallback={<LoadingComponent />}>
                          <SampleForm />
                        </React.Suspense>
                      )
                    },
                    ],
                  },

                ]
              },
              {
                size: 500,
                mode: "vertical",
                children: [
                  {
                    tabs: [{
                      id: 'employeTableTab1 inner',
                      cached: true,
                      title: 'employeTableTab1 inner',
                      closable: true,
                      content:
                        <React.Suspense fallback={<LoadingComponent />}>
                          <EmployeeTable />
                        </React.Suspense>

                    }],
                  },
                  {
                    tabs: [{
                      id: 'sample mui table inner ',
                      cached: true,
                      title: 'sample mui table inner',
                      closable: true,
                      content:
                        <React.Suspense fallback={<LoadingComponent />}>
                          <DataTable />
                        </React.Suspense>
                    }]
                  },
                ]
              },
            ]
          },
        ]
      },
      {
        size: 500,
        mode: "vertical",
        panelLock: {panelStyle: 'main'},
        children: [
          {
            tabs: [{
              id: 'employeTableTab1',
              cached: true,
              title: 'employeTableTab1',
              closable: true,
              content:
                <React.Suspense fallback={<LoadingComponent />}>
                  <EmployeeTable />
                </React.Suspense>

            }],
          },
          {
            tabs: [{
              id: 'sample mui table',
              cached: true,
              title: 'sample mui table',
              closable: true,
              content:
                <React.Suspense fallback={<LoadingComponent />}>
                  <DataTable />
                </React.Suspense>
            }]
          },
        ]
      },
    ]
  },
}

class Demo extends React.Component {

  render() {
    return (
      <DockLayout defaultLayout={layout} style={{position: 'absolute', left: 10, top: 10, right: 10, bottom: 10}} />
    );
  }
}

createRoot(document.getElementById("app")!).render(<Demo />);
// createRoot(document.getElementById("app")!).render(<React.StrictMode><Demo /></React.StrictMode>);
