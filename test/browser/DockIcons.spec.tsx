import * as React from 'react';
import {act} from 'react';
import {page} from 'vitest/browser';
import {DockLayout} from '../../src/DockLayout';
import type {PanelData, TabData} from '../../src/DockData';
import {layout} from '../fixtures';
import {mouse, render} from './render';

const style: React.CSSProperties = {position: 'absolute', inset: 0};
const overrides = `
  .custom-dock .dock-icon::before { content: none; }
  .custom-dock .dock-icon-close {
    background: currentColor;
    mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='M2 2L10 10M10 2L2 10' stroke='black'/%3E%3C/svg%3E") center / 12px 12px no-repeat;
  }
`;

async function click(element: Element) {
  await act(async () => page.elementLocator(element).click());
}

describe('dock icon CSS hooks', () => {
  it('replaces decoration with CSS masks while retaining close, maximize and restore actions', async () => {
    let dock: DockLayout;
    const container = await render(<>
      <style>{overrides}</style>
      <DockLayout ref={(ref) => {dock = ref;}} defaultLayout={layout()} style={style}/>
    </>);
    container.classList.add('custom-dock');
    const close = container.querySelector<HTMLElement>('[data-node-key="a"] .dock-icon-close');
    expect(getComputedStyle(close, '::before').content).toBe('none');
    expect(getComputedStyle(close).maskImage).toContain('data:image/svg+xml');
    expect(close.parentElement.className).toBe('dock-tab-close-btn');
    expect(getComputedStyle(close).pointerEvents).toBe('none');
    expect(close.children).toHaveLength(0);

    const maximize = container.querySelector('.dock-icon-maximize');
    await click(maximize.parentElement);
    expect((dock.find('a') as TabData).parent.parent.mode).toBe('maximize');
    await click(container.querySelector('.dock-icon-restore').parentElement);
    expect((dock.find('a') as TabData).parent.parent.mode).toBe('horizontal');
    await click(container.querySelector('[data-node-key="a"] .dock-icon-close').parentElement);
    expect(dock.find('a')).toBeUndefined();
    expect(dock.find('b')).toBeDefined();
  });

  it('preserves control hit areas when icon artwork is hidden', async () => {
    let dock: DockLayout;
    const container = await render(<DockLayout ref={(ref) => {dock = ref;}} defaultLayout={layout()} style={style}/>);
    const close = container.querySelector<HTMLElement>('[data-node-key="a"] .dock-tab-close-btn');
    const maximize = container.querySelector<HTMLElement>('.dock-panel-max-btn');
    const controls = [close, maximize];
    const bounds = controls.map((control) => control.getBoundingClientRect().toJSON());
    for (const control of controls) control.querySelector<HTMLElement>('.dock-icon').style.display = 'none';
    expect(controls.map((control) => control.getBoundingClientRect().toJSON())).toEqual(bounds);
    expect(bounds.every(({width, height}) => width > 0 && height > 0)).toBe(true);
    await click(close);
    expect(dock.find('a')).toBeUndefined();
  });

  it('keeps drop indicators and docking functional when icons are decorated through CSS', async () => {
    const viewport = {width: innerWidth, height: innerHeight};
    await page.viewport(1000, 700);
    try {
      let dock: DockLayout;
      const container = await render(<>
        <style>{overrides}</style>
        <DockLayout ref={(ref) => {dock = ref;}} defaultLayout={layout()} style={style}/>
      </>);
      container.classList.add('custom-dock');
      const source = container.querySelector('[data-dockid="left"] .dock-bar');
      const target = container.querySelector('[data-dockid="right"]');
      const start = source.getBoundingClientRect();
      const bounds = target.getBoundingClientRect();
      const x = bounds.left + bounds.width / 2;
      const y = bounds.top + bounds.height / 2;
      await mouse(source, 'mousedown', start.left + 10, start.top + 10);
      await mouse(document, 'mousemove', start.left + 30, start.top + 20);
      await mouse(document, 'mousemove', x, y);
      await mouse(document, 'mousemove', x, y + 1);
      const square = target.querySelector<HTMLElement>('.dock-drop-top:not(.dock-drop-deep)');
      expect(square).not.toBeNull();
      const icon = square.querySelector('.dock-icon-top');
      expect(icon).not.toBeNull();
      expect(getComputedStyle(icon, '::before').content).toBe('none');
      expect(getComputedStyle(icon).pointerEvents).toBe('none');
      const drop = square.getBoundingClientRect();
      const dropX = drop.left + drop.width / 2;
      const dropY = drop.top + drop.height / 2;
      expect(document.elementFromPoint(dropX, dropY).closest('.dock-drop-square')).toBe(square);
      await mouse(document, 'mousemove', dropX, dropY);
      expect(dock.state.dropRect?.direction).toBe('top');
      await mouse(document, 'mouseup', dropX, dropY);
      const moved = dock.find('left') as PanelData;
      expect(moved.parent).toBe((dock.find('right') as PanelData).parent);
      expect(moved.parent.mode).toBe('vertical');
      expect(moved.parent.children.map(({id}) => id)).toEqual(['left', 'right']);
    } finally {
      await page.viewport(viewport.width, viewport.height);
    }
  });
});
