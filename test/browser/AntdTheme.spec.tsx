import * as React from 'react';
import {act} from 'react';
import {DockLayout} from '../../src/DockLayout';
import type {TabData} from '../../src/DockData';
import themeCss from '../../style/index-antd.scss?inline';
import {layout} from '../fixtures';
import {render} from './render';

it('updates docked and floating panels when inherited Ant Design tokens change', async () => {
  const stylesheet = document.createElement('style');
  stylesheet.textContent = themeCss;
  document.head.appendChild(stylesheet);
  let dock: DockLayout;
  try {
    const container = await render(
      <DockLayout
        ref={(ref) => {
          dock = ref;
        }}
        defaultLayout={layout()}
        style={{position: 'absolute', inset: 0}}
      />
    );
    await act(async () => dock.dockMove(dock.find('b') as TabData, null, 'float'));
    const panel = container.querySelector('.dock-panel');
    const floating = container.querySelector('.dock-fbox .dock-panel');
    const activeTab = container.querySelector('.dock-tab-active');
    const corner = floating.querySelector('.dock-panel-drag-size-b-r');
    const dropIndicator = container.querySelector('.dock-drop-indicator');

    expect(getComputedStyle(panel).backgroundColor).toBe('rgb(255, 255, 255)');
    for (const [background, text, primary, border] of [
      ['rgb(20, 20, 20)', 'rgb(220, 220, 220)', 'rgb(64, 169, 255)', 'rgb(67, 67, 67)'],
      ['rgb(250, 245, 235)', 'rgb(60, 40, 20)', 'rgb(150, 70, 180)', 'rgb(180, 160, 140)'],
      ['rgb(255, 255, 255)', 'rgb(30, 30, 30)', 'rgb(22, 119, 255)', 'rgb(217, 217, 217)'],
    ]) {
      container.style.setProperty('--ant-color-bg-container', background);
      container.style.setProperty('--ant-color-text', text);
      container.style.setProperty('--ant-color-primary', primary);
      container.style.setProperty('--ant-color-border', border);
      expect(getComputedStyle(panel).backgroundColor).toBe(background);
      expect(getComputedStyle(floating).backgroundColor).toBe(background);
      expect(getComputedStyle(panel).color).toBe(text);
      await expect.poll(() => getComputedStyle(activeTab).color).toBe(primary);
      expect(getComputedStyle(floating).borderColor).toBe(border);
      expect(getComputedStyle(corner, '::after').backgroundColor).toBe(border);
      expect(getComputedStyle(dropIndicator).backgroundColor).toBe(primary);
    }
    container.style.setProperty('--dock-drop-indicator-bg', 'rgb(255, 120, 100)');
    expect(getComputedStyle(dropIndicator).backgroundColor).toBe('rgb(255, 120, 100)');
    expect(corner.getBoundingClientRect().width).toBe(17);
  } finally {
    stylesheet.remove();
  }
});
