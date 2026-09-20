import * as React from 'react';
import {act} from 'react';
import {DockLayout} from '../../src/DockLayout';
import type {PanelData} from '../../src/DockData';
import {layout, tab} from '../fixtures';
import {mouse, render} from './render';

describe('floating panel edge anchors', () => {
  it.each(['mouseup', 'move away'])('clears the preview on %s before a pending render', async (end) => {
    const data = layout();
    data.floatbox.children.push({
      id: 'floating', x: 100, y: 100, w: 200, h: 150,
      tabs: [tab('float', {group: 'floating'})],
    });
    const container = await render(
      <DockLayout defaultLayout={data} groups={{floating: {floatable: true, disableDock: true}}}
                  style={{position: 'absolute', inset: 0}}/>
    );
    const header = container.querySelector('[data-dockid="floating"] .dock-bar');
    const rect = header.getBoundingClientRect();
    const startX = rect.left + 100;
    const startY = rect.top + 10;
    await mouse(header, 'mousedown', startX, startY);
    await mouse(document, 'mousemove', startX + 5, startY);
    // Deliver moves and release together, without flushing React between events.
    await act(async () => {
      document.dispatchEvent(new MouseEvent('mousemove', {clientX: startX + 480, clientY: startY + 318, buttons: 1}));
      document.dispatchEvent(new MouseEvent(end === 'mouseup' ? 'mouseup' : 'mousemove', {
        clientX: startX, clientY: startY, buttons: end === 'mouseup' ? 0 : 1,
      }));
    });
    expect(getComputedStyle(container.querySelector('.dock-drop-indicator')).display).toBe('none');
    if (end === 'move away') await mouse(document, 'mouseup', startX, startY);
  });

  it.each([
    {dropMode: 'default' as const, strict: false},
    {dropMode: 'edge' as const, strict: false},
    {dropMode: 'default' as const, strict: true},
    {dropMode: 'edge' as const, strict: true},
  ])('previews anchors in $dropMode mode (StrictMode=$strict)', async ({dropMode, strict}) => {
    let dock: DockLayout;
    const data = layout();
    data.floatbox.children.push({
      id: 'floating', x: 100, y: 100, w: 200, h: 150,
      tabs: [tab('float', {group: 'floating'})],
    });
    const dockLayout = (
      <DockLayout ref={(ref) => { dock = ref; }} defaultLayout={data} dropMode={dropMode}
                  groups={{floating: {floatable: true, disableDock: true}}}
                  style={{position: 'absolute', inset: 0}}/>
    );
    const container = await render(strict ? <React.StrictMode>{dockLayout}</React.StrictMode> : dockLayout);
    const element = container.querySelector<HTMLElement>('[data-dockid="floating"]');
    const indicator = container.querySelector<HTMLElement>('.dock-drop-indicator');
    const header = element.querySelector('.dock-bar');
    const rect = header.getBoundingClientRect();
    const startX = rect.left + 100;
    const startY = rect.top + 10;
    expect(getComputedStyle(indicator).display).toBe('none');
    await mouse(header, 'mousedown', startX, startY);
    await mouse(document, 'mousemove', startX + 5, startY);
    for (const [x, y, visible] of [
      [580, 100, true], [570, 120, true], [600, 120, true],
      [601, 120, false], [567, 120, false],
      [100, 418, true], [100, 417, false], [568, 418, true],
      [100, 451, false], [580, 418, true],
    ] as const) {
      await mouse(document, 'mousemove', startX + x - 100, startY + y - 100);
      expect(getComputedStyle(indicator).display).toBe(visible ? 'block' : 'none');
      if (visible) {
        const panelBounds = element.getBoundingClientRect();
        const layoutBounds = container.querySelector('.dock-layout').getBoundingClientRect();
        const previewBounds = indicator.getBoundingClientRect();
        expect(previewBounds.left).toBe(panelBounds.left);
        expect(previewBounds.top).toBe(panelBounds.top);
        expect(previewBounds.right).toBe(x >= 568 && x <= 600 ? layoutBounds.right : panelBounds.right);
        expect(previewBounds.bottom).toBe(y >= 418 && y <= 450 ? layoutBounds.bottom : panelBounds.bottom);
        expect(getComputedStyle(indicator).transitionDuration).toBe('0s');
      }
    }
    expect((dock.find('floating') as PanelData).floatAnchor).toBeUndefined();
    await mouse(document, 'mouseup', startX + 480, startY + 318);
    expect(getComputedStyle(indicator).display).toBe('none');

    // Ending a drag with Escape must clear the preview as well.
    const movedHeader = header.getBoundingClientRect();
    await mouse(header, 'mousedown', movedHeader.left + 100, movedHeader.top + 10);
    await mouse(document, 'mousemove', movedHeader.left + 105, movedHeader.top + 10);
    expect(getComputedStyle(indicator).display).toBe('block');
    await act(async () => document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape', bubbles: true})));
    expect(getComputedStyle(indicator).display).toBe('none');
  });

  it('anchors after dragging, follows container resizing, and releases when dragged away', async () => {
    let dock: DockLayout;
    const changed = vi.fn();
    const data = layout();
    data.floatbox.children.push({
      id: 'floating', x: 100, y: 100, w: 200, h: 150,
      tabs: [tab('float', {group: 'floating'})],
    });
    const container = await render(
      <DockLayout ref={(ref) => { dock = ref; }} defaultLayout={data}
                  groups={{floating: {floatable: true, disableDock: true}}}
                  onLayoutChange={changed} style={{position: 'absolute', inset: 0}}/>
    );
    const panel = () => dock.find('floating') as PanelData;
    const element = container.querySelector<HTMLElement>('[data-dockid="floating"]');

    async function dragHeader(x: number, y: number) {
      const header = element.querySelector('.dock-bar');
      const rect = header.getBoundingClientRect();
      const startX = rect.left + 100;
      const startY = rect.top + 10;
      const dx = x - panel().x;
      const dy = y - panel().y;
      await mouse(header, 'mousedown', startX, startY);
      await mouse(document, 'mousemove', startX + 5, startY);
      await mouse(document, 'mousemove', startX + dx, startY + dy);
      await mouse(document, 'mouseup', startX + dx, startY + dy);
    }

    async function resize(width: number, height: number) {
      await act(async () => {
        container.style.width = `${width}px`;
        container.style.height = `${height}px`;
        await new Promise((resolve) => setTimeout(resolve, 300));
      });
    }

    await dragHeader(580, 418);
    expect(panel().floatAnchor).toEqual({right: 20, bottom: 32});
    expect(changed).toHaveBeenLastCalledWith(expect.objectContaining({
      floatbox: expect.objectContaining({children: [expect.objectContaining({floatAnchor: {right: 20, bottom: 32}})]}),
    }), 'float', 'move');
    await resize(1000, 700);
    expect(panel()).toMatchObject({x: 780, y: 518});
    const bounds = element.getBoundingClientRect();
    const layoutBounds = dock.getRootElement().getBoundingClientRect();
    expect(layoutBounds.right - bounds.right).toBe(20);
    expect(layoutBounds.bottom - bounds.bottom).toBe(32);

    const corner = element.querySelector('.dock-panel-drag-size-b-r');
    const cornerBounds = corner.getBoundingClientRect();
    const cornerX = cornerBounds.left + 2;
    const cornerY = cornerBounds.top + 2;
    await mouse(corner, 'mousedown', cornerX, cornerY);
    await mouse(document, 'mousemove', cornerX + 5, cornerY + 5);
    await mouse(document, 'mousemove', cornerX + 10, cornerY + 10);
    await mouse(document, 'mouseup', cornerX + 10, cornerY + 10);
    expect(panel()).toMatchObject({w: 210, h: 160, floatAnchor: {right: 10, bottom: 22}});

    const saved = dock.saveLayout();
    await dragHeader(100, 100);
    expect(panel().floatAnchor).toBeUndefined();
    await resize(800, 600);
    expect(panel()).toMatchObject({x: 100, y: 100});
    await act(async () => dock.loadLayout(saved));
    expect(panel()).toMatchObject({x: 580, y: 418, floatAnchor: {right: 10, bottom: 22}});
    await resize(400, 160);
    expect(panel().y).toBe(0);
    expect(element.getBoundingClientRect().top).toBe(dock.getRootElement().getBoundingClientRect().top);
    await resize(800, 600);
    expect(panel()).toMatchObject({x: 580, y: 418});
  });
});
