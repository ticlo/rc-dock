import * as React from 'react';
import {DockLayout} from '../../src/DockLayout';
import {DragDropDiv, DragLayerContext} from '../../src/dragdrop/DragDropDiv';
import {DragState} from '../../src/dragdrop/DragManager';
import {layout} from '../fixtures';
import {mouse, render} from './render';

async function cancelDrag() {
  await React.act(async () => document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape', bubbles: true})));
}

it('lets the nearest provider initialize classes, styles and attributes before the preview is measured', async () => {
  const outer = vi.fn();
  const initialize = vi.fn((layer: HTMLDivElement, state: DragState) => {
    expect(layer.isConnected).toBe(false);
    layer.classList.add('preview-theme');
    layer.style.opacity = '0.25';
    layer.dataset.source = state.component.element.dataset.testid;
  });
  let setEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  function Owner() {
    const [enabled, update] = React.useState(true);
    setEnabled = update;
    return (
      <DragLayerContext.Provider value={outer}>
        <DragLayerContext.Provider value={enabled ? initialize : null}>
          <style>{`
            body > .dragging-layer.preview-theme {
              --default-background-color: rgb(20, 20, 20);
              font: 18px/27px monospace;
            }
            .preview-theme .preview-label { color: rgb(220, 220, 220); font-style: italic; }
            .preview-theme .preview-label::before { content: "custom"; }
          `}</style>
          <div style={{transform: 'scale(0.5)', overflow: 'hidden'}}>
            <DragDropDiv data-testid="source" style={{width: 80, height: 30}}
                         onDragStartT={(state) => state.startDrag(undefined, undefined, {opacity: 0.9})}>
              <span className="preview-label">Preview</span>
            </DragDropDiv>
          </div>
        </DragLayerContext.Provider>
      </DragLayerContext.Provider>
    );
  }
  const container = await render(<Owner />);
  const source = container.querySelector<HTMLElement>('[data-testid="source"]');
  const bodyClass = document.body.className;
  for (const enabled of [true, false]) {
    await React.act(async () => setEnabled(enabled));
    const rect = source.getBoundingClientRect();
    await mouse(source, 'mousedown', rect.x + 5, rect.y + 5);
    await mouse(document, 'mousemove', 200, 150);
    const layer = document.querySelector<HTMLElement>('body > .dragging-layer');
    const clone = layer.firstElementChild;
    const label = clone.querySelector('.preview-label');
    expect(layer.classList.contains('preview-theme')).toBe(enabled);
    expect(getComputedStyle(clone).backgroundColor).toBe(enabled ? 'rgb(20, 20, 20)' : 'rgb(255, 255, 255)');
    expect(getComputedStyle(layer).opacity).toBe('0.9');
    if (enabled) {
      expect(layer.dataset.source).toBe('source');
      expect(getComputedStyle(label).color).toBe('rgb(220, 220, 220)');
      expect(getComputedStyle(label).fontFamily).toBe('monospace');
      expect(getComputedStyle(label).fontStyle).toBe('italic');
      expect(getComputedStyle(label, '::before').content).toBe('"custom"');
    }
    const previewRect = clone.getBoundingClientRect();
    expect(previewRect.x + previewRect.width / 2).toBeCloseTo(200);
    expect(previewRect.y + previewRect.height / 2).toBeCloseTo(150);
    await cancelDrag();
    expect(document.querySelector('.dragging-layer')).toBeNull();
    expect(document.body.className).toBe(bodyClass);
  }
  expect(initialize).toHaveBeenCalledOnce();
  expect(outer).not.toHaveBeenCalled();
});

it.each(['tab', 'panel'])('initializes the layer for a dock %s drag', async (target) => {
  const initialize = vi.fn((layer: HTMLDivElement) => layer.classList.add('dock-preview-theme'));
  const container = await render(
    <DragLayerContext.Provider value={initialize}>
      <DockLayout defaultLayout={layout()} style={{position: 'absolute', inset: 0}} />
    </DragLayerContext.Provider>
  );
  const source = container.querySelector(target === 'tab' ? '.dock-tab[data-node-key="a"] [role="tab"]' : '.dock-bar');
  const rect = source.getBoundingClientRect();
  await mouse(source, 'mousedown', rect.x + 10, rect.y + 10);
  await mouse(document, 'mousemove', rect.x + 30, rect.y + 20);
  const layer = document.querySelector<HTMLElement>('body > .dragging-layer');
  expect(layer.classList.contains('dock-preview-theme')).toBe(true);
  expect(initialize).toHaveBeenCalledOnce();
  await cancelDrag();
  expect(document.querySelector('.dragging-layer')).toBeNull();
});
