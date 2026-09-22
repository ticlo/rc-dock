# Dock Layout for React Component

![](https://ticlo.github.io/rc-dock/images/demo.gif)

#### Popup panel as new browser window
![](https://ticlo.github.io/rc-dock/images/new-window.gif)

#### Dark Theme
![](https://ticlo.github.io/rc-dock/images/dark-theme.png)

- **Examples:** https://ticlo.github.io/rc-dock/examples
- **Docs:** https://ticlo.github.io/rc-dock
- **Discord:** [![Discord](https://img.shields.io/discord/434106806503997445.svg?color=7289DA&logo=discord&logoColor=white
)](https://discord.gg/G7pw9DR)

## Testing

The tests use Vitest 5 and Playwright with Chromium, following Ticlo's Node and browser test setup. Use Node 24 for development.

```sh
pnpm install
pnpm exec playwright install chromium
pnpm test                  # Layout algorithms and serialization
pnpm test-browser          # React components and drag/drop in Chromium
pnpm test-browser-ui       # Watch browser tests with a visible browser
pnpm test-typecheck        # Type-check source, tests and test configuration
pnpm test-coverage         # Node coverage in coverage/node
pnpm test-browser-coverage # Browser coverage in coverage/browser
```

Tests live under `test/node` and `test/browser`, outside the published source build. Browser tests import the Less styles directly and clean up rendered roots and active drags after each test.

Coverage is based on the basic, tab-min-size, standalone-divider, save-layout, controlled-layout, tab-cache, adv-tab-update and drag-new-tab examples, plus drag-preview opacity and cleanup.

## Usage

[![rc-tabs](https://nodei.co/npm/rc-dock.png)](https://npmjs.org/package/rc-dock)

```jsx
import DockLayout from 'rc-dock'
import "rc-dock/dist/rc-dock.css";

...

defaultLayout = {
  dockbox: {
    mode: 'horizontal',
    children: [
      {
        tabs: [
          {id: 'tab1', title: 'tab1', content: <div>Hello World</div>}
        ]
      }
    ]
  }
};

render() {
  return (
    <DockLayout
      defaultLayout={defaultLayout}
      style={{
        position: "absolute",
        left: 10,
        top: 10,
        right: 10,
        bottom: 10,
      }}
    />
  )
}

```
- use as **uncontrolled layout**
  - set layout object in **[DockLayout.defaultLayout](https://ticlo.github.io/rc-dock/interfaces/docklayout.layoutprops.html#defaultlayout)**
- use as **controlled layout**
  - set layout object in **[DockLayout.layout](https://ticlo.github.io/rc-dock/interfaces/docklayout.layoutprops.html#layout)** 


## types


### LayoutData [🗎](https://ticlo.github.io/rc-dock/interfaces/dockdata.layoutdata.html)
| Property | Type | Comments | Default |
| :---: | :---: | :---: | :---: |
| dockbox | BoxData | main dock box | empty BoxData |
| floatbox | BoxData | main float box, children can only be PanelData  | empty BoxData |

### BoxData [🗎](https://ticlo.github.io/rc-dock/interfaces/dockdata.boxdata.html)
a box is the layout element that contains other boxes or panels

| Property | Type | Comments | Default |
| :---: | :---: | :---: | :---: |
| mode | 'horizontal' &#x7c; 'vertical' &#x7c; 'float' | layout mode of the box | |
| children | (BoxData &#x7c; PanelData)[] | children boxes or panels | **required** |

### PanelData [🗎](https://ticlo.github.io/rc-dock/interfaces/dockdata.paneldata.html)
a panel is a visiaul container with tabs button in the title bar

| Property | Type | Comments | Default |
| :---: | :---: | :---: | :---: |
| tabs | TabData[] | children tabs | **required** |
| panelLock | PanelLock | addition information of a panel, this prevents the panel from being removed when there is no tab inside, a locked panel can not be moved to float layer either | |


### TabData [🗎](https://ticlo.github.io/rc-dock/interfaces/dockdata.tabdata.html)
| Property | Type | Comments | Default |
| :---: | :---: | :---: | :---: |
| id | string | unique id | **required** |
| title | string &#x7c; ReactElement | tab title | **required** |
| content | ReactElement &#x7c; (tab: TabData) => ReactElement | tab content | **required** |
| closable | bool | whether tab can be closed | false |
| group | string | tabs with different tab group can not be put in same panel, more options for the group can be defined as TabGroup in DefaultLayout.groups | |

## DockLayout API

get the `ref` of the DockLayout component to use the following API

### saveLayout [🗎](https://ticlo.github.io/rc-dock/interfaces/docklayout.layoutprops.html)
save layout

```typescript
saveLayout(): SavedLayout 
```

### loadLayout [🗎](https://ticlo.github.io/rc-dock/interfaces/docklayout.layoutprops.html)
load layout

```typescript
 loadLayout(savedLayout: SavedLayout): void
```

### dockMove [🗎](https://ticlo.github.io/rc-dock/classes/docklayout.docklayout-1.html#dockmove)
move a tab or a panel, if source is already in the layout, you can use the find method to get it with id first

```typescript
dockMove(source: TabData | PanelData, target: string | TabData | PanelData | BoxData, direction: DropDirection): void;
```

### find [🗎](https://ticlo.github.io/rc-dock/classes/docklayout.docklayout-1.html#find)
find PanelData or TabData by id

```typescript
find(id: string | ((item: PanelData | TabData | BoxData) => boolean), filter?: Filter): PanelData | TabData | BoxData | undefined;
```

### updateTab [🗎](https://ticlo.github.io/rc-dock/classes/docklayout.docklayout-1.html#updatetab)
update a tab with new TabData

returns false if the tab is not found

```typescript
updateTab(id: string, newTab: TabData): boolean;
```
