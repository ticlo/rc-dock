# Dock Layout for React Component

![alt text](https://ticlo.github.io/rc-dock/images/demo.gif)

- **Examples:** https://ticlo.github.io/rc-dock/examples
- **Docs:** https://ticlo.github.io/rc-dock

## Usage

[![rc-tabs](https://nodei.co/npm/rc-dock.png)](https://npmjs.org/package/rc-dock)

```jsx
import DockLayout from 'rc-dock'

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
  return <DockLayout defaultLayout={defaultLayout}/>
}

```

## defaultLayout types


### DefaultLayout [🗎](https://ticlo.github.io/rc-dock/interfaces/defaultlayout.html)
| Property | Type | Comments | Default |
| :---: | :---: | :---: | :---: |
| dockbox | BoxData | main dock box | **required**  |
| floatbox | BoxData | main float box, children can only be PanelData  | empty BoxData |
| groups | {[key]: TabGroup} | additional group information | {} |

### BoxData [🗎](https://ticlo.github.io/rc-dock/interfaces/boxdata.html)
a box is the layout element that contains other boxes or panels

| Property | Type | Comments | Default |
| :---: | :---: | :---: | :---: |
| mode | 'horizontal' &#x7c; 'vertical' &#x7c; 'float' | layout mode of the box | |
| children | (BoxData &#x7c; PanelData)[] | children boxes or panels | **required** |

### PanelData [🗎](https://ticlo.github.io/rc-dock/interfaces/paneldata.html)
a panel is a visiaul container with tabs button in the title bar

| Property | Type | Comments | Default |
| :---: | :---: | :---: | :---: |
| tabs | TabData[] | children tabs | **required** |
| panelLock | PanelLock | addition information of a panel, this prevents the panel from being removed when there is no tab inside, a locked panel can not be moved to float layer either | |


### TabData [🗎](https://ticlo.github.io/rc-dock/interfaces/tabdata.html)
| Property | Type | Comments | Default |
| :---: | :---: | :---: | :---: |
| id | string | unique id | **required** |
| title | string &#x7c; ReactElement | tab title | **required** |
| content | ReactElement &#x7c; (tab: TabData) => ReactElement | tab content | **required** |
| closable | bool | whether tab can be closed | false |
| group | string | tabs with different tab group can not be put in same panel, more options for the group can be defined as TabGroup in DefaultLayout.groups | |

## DockLayout API

### saveLayout [🗎](https://ticlo.github.io/rc-dock/interfaces/savemodifier.html)
save layout

```typescript
saveLayout(modifier?: SaveModifier): SavedLayout 
```

### loadLayout [🗎](https://ticlo.github.io/rc-dock/interfaces/loadmodifier.html)
load layout

```typescript
 loadLayout(savedLayout: SavedLayout, modifier?: LoadModifier): void
```

### dockMove [🗎](https://ticlo.github.io/rc-dock/classes/docklayout.html#dockmove)
move a tab or a panel, if source or target is already in the layout, you can use the find method to get it with id first

```typescript
dockMove(source: TabData | PanelData, target: TabData | PanelData | BoxData, direction: DropDirection): void;
```

### find [🗎](https://ticlo.github.io/rc-dock/classes/docklayout.html#find)
find PanelData or TabData by id

```typescript
find(id: string): PanelData | TabData;
```

### updateTab [🗎](https://ticlo.github.io/rc-dock/classes/docklayout.html#updatetab)
update a tab with new TabData

returns false if the tab is not found

```typescript
updateTab(id: string, newTab: TabData): boolean;
```