import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { DockLayout, LayoutData } from '../src';
import LoadingComponent from './loading';

// Lazy load the components
const SampleForm = React.lazy(() => import('./sample-form'));

const sampleFormTab = (depth: number) => ({
  id: `sample-form-${depth}`,
  title: `sample form ${depth}`,
  cached: true,
  content: (
    <React.Suspense fallback={<LoadingComponent />}>
      <SampleForm />
    </React.Suspense>
  ),
});

const placeholderTab = (name: string, depth: number) => ({
  id: `${name}-d${depth}`,
  title: `${name}`,
  closable: true,
  cached: true,
  content: <></>,
});

function buildRecursiveLayout(depth: number): LayoutData {
  if (depth <= 0) {
    return {
      dockbox: {
        mode: 'vertical',
        children: [
          {
            tabs: [placeholderTab('base placeholder', 0)],
          },
        ],
      },
    };
  }

  return {
    dockbox: {
      mode: 'horizontal',
      children: [
        {
          mode: 'vertical',
          children: [
            {
              tabs: [sampleFormTab(depth)],
            },
          ],
        },
        {
          mode: 'vertical',
          panelLock: { panelStyle: 'main' },
          children: [
            {
              tabs: [placeholderTab('placeholder (up)', depth)],
            },
            buildRecursiveLayout(depth - 1).dockbox!,
          ],
        },
      ],
    },
  };
}

class Demo extends React.Component {
  render() {
    const DEPTH = 10; 
    const layout = buildRecursiveLayout(DEPTH);

    return (
      <DockLayout
        defaultLayout={layout}
        style={{ position: 'absolute', left: 10, top: 10, right: 10, bottom: 10 }}
      />
    );
  }
}

createRoot(document.getElementById('app')!).render(<Demo />);