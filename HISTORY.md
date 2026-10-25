## 5.0.0 (unreleased)

- Add an optional `tabs` registry for resolving `{id}` references and updating tab definitions without moving tabs or resetting cached component state. `dockMove` and `updateTab` accept tab references, and `loadTab` can return `null` to skip unavailable tabs.
- Add `sideColumns` with collapsible tab-title rails, accordion panels, outer padding and saved column state.
- Anchor floating panels near the right and bottom edges, preview anchors during dragging and resizing, and preserve edge gaps when the layout container resizes. Anchors are saved with the layout.
- Replace Less theme sources with configurable SCSS modules. Existing compiled light and dark CSS import paths remain available.
- Add `rc-dock/dist/rc-dock-antd.css`, a theme that follows Ant Design CSS variables and responds to theme changes.
- Add `DragLayerContext` for applying classes, styles or attributes to drag previews before they are attached and measured.
- Separate icon artwork from control hit areas and expose semantic CSS classes for font, image and CSS mask customization.
- Fix `updateTab` to preserve tab order and selection and recalculate changed sizing constraints.
- Fix `find` item-type filtering and prevent crashes when drop-indicator removals are batched.

Most applications need no migration. Custom Less themes, icon artwork and certain advanced integrations need updates; see the [v5 migration guide](MIGRATION.md).

## 4.0.3

- Move accept and reject icons above the finger during touch dragging while preserving drag preview and drop target positions.

## 4.0.2

- Restore panel content sizing and hide inactive tab content with the updated @rc-component/tabs markup, including cached tabs and floating or maximized panels.
- Rebuild JavaScript, declarations, and both CSS themes before packing for npm.

## 4.0.0

- migrate to pnpm
- migrate to @rc-component packages
- deprecated animated property in Tab
- make Tab cached property default to true

## 3.2.18 / 2023-06-08
- fix the issue that sometimes dock icons are shown and no UI response after switching tabs quickly

## 3.2.14 / 2022-11-25
- make rc-dock compatible with preact

## 3.2.11 / 2022-08-24
- add new parameter to dockmove() for default float panel position

## 3.2.9 / 2022-01-17
- new TabGroup.floatable option: "singleTab"

## 3.2.8 / 2022-01-10
- add support to resize float panel by dragging panel edges 

## 3.2.1 / 2021-10-09
- TabGroup and panelLock now have 2 new properties: widthFlex and heightFlex, this allows panel to stretch at different ratio during window resize

## 3.2.0 / 2021-10-03
- in a float panel with single tab, dragging the tab should work the same way as dragging the panel header

## 3.1.0 / 2021-09-06
- add dark theme

## 3.0.14 / 2021-05-15
- panel navigation with arrow keys

## 3.0.10 / 2021-04-11
- make it possible for Docklayout.updateTab to update tab without changing activeId

## 3.0.8 / 2021-03-10
- when controlled layout is used and onLayoutChange callback doesn't set new layout prop, there should be a forceUpdate() so the original layout prop is re-rendered 

## 3.0.7 / 2021-03-09
- add direction parameter to onLayoutChange callback
  - onLayoutChange callback now gives the tabId when tab is removed, this is changed from previous version where tabId=null when it's removed

## 3.0.5 / 2021-03-08
- allow mouse event handler on tab title
- fix the issue that calling updateTab() doesn't trigger onLayoutChange

## 3.0.2 / 2021-02-06
- fix serialization of popup window

## 3.0.0 / 2020-12-05
- switch to rc-tabs 11.x, internal component structure changed
- tabs overflow is now shown as dropdown menu instead of left/right scroll
- support popup window with rc-new-window
