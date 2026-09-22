import {act, type ReactNode} from 'react';
import {createRoot, type Root} from 'react-dom/client';

let root: Root;
let container: HTMLDivElement;

export async function render(element: ReactNode) {
  container = document.createElement('div');
  container.style.cssText = 'position: relative; width: 800px; height: 600px;';
  document.body.appendChild(container);
  root = createRoot(container);
  await act(async () => root.render(element));
  return container;
}

export async function mouse(target: EventTarget, type: string, x: number, y: number) {
  await act(async () => {
    target.dispatchEvent(
      new MouseEvent(type, {
        bubbles: true,
        cancelable: true,
        clientX: x,
        clientY: y,
        button: 0,
        buttons: type === 'mouseup' ? 0 : 1,
      })
    );
  });
}

export async function unmount() {
  // Unmounting cancels any active DragDropDiv drag and removes its listeners.
  if (root) await act(async () => root.unmount());
  container?.remove();
  root = null;
  container = null;
}

afterEach(unmount);
