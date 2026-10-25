# Migrating to rc-dock 5

**Most applications upgrading from 4.0.3 need no migration.** Update the package
and load the CSS from the same version. Existing compiled light and dark CSS import paths, full
inline tab definitions, `loadTab` / `saveTab` callbacks and v4 saved layouts remain
supported. No saved layout conversion is required.

Check the cases that apply to your application:

| Your application | Action |
| --- | --- |
| Imports compiled CSS and uses default icons | No styling migration. |
| Uses inline tab definitions or v4 saved layouts | No tab or layout migration. |
| Imports or compiles `rc-dock/style/*.less` | [Switch the theme build to Sass](#less-themes). |
| Replaces control icon artwork through CSS | [Update icon selectors](#custom-icon-css). |
| Inspects control children or uses `:empty` selectors | [Account for icon spans](#control-dom). |
| Implements `DockContext` or exhaustively handles `DropDirection` | [Update the affected TypeScript integration](#custom-typescript-integrations). |

New features such as the `tabs` registry, side columns, Ant Design theme and
drag-layer customization are optional. See [v5 release notes](HISTORY.md#500-unreleased)
and the [usage documentation](README.md#usage) when you want to adopt them.

## Less themes

This applies only if you compile rc-dock's theme sources. The published source
files now use SCSS instead of Less. Install and configure Sass in your build and
replace Less imports and variable overrides with Sass modules:

```less
/* Before */
@import "rc-dock/style/index-light.less";
@primary-color: #108ee9;
```

```scss
/* Version 5 */
@use "rc-dock/style/index-light" with (
  $primary-color: #108ee9
);
```

Use `rc-dock/style/index-dark` for dark themes. Theme variables keep their names
with `$` in place of `@`. Applications importing `rc-dock/dist/rc-dock.css` or
`rc-dock/dist/rc-dock-dark.css` can keep those imports.

## Custom icon CSS

**Default icons need no changes.** Color, font and layout rules on the existing
controls continue to work. Update rules only if they replace the icon artwork.

Version 5 puts artwork in a noninteractive `.dock-icon` span inside each control.
The existing control classes still handle layout, clicks and dragging. Move
artwork rules from the control's `::before` to the icon's `::before`:

| Previous artwork selector | Version 5 artwork selector |
| --- | --- |
| `.dock-tab-close-btn::before` | `.dock-icon-close::before` |
| `.dock-panel-max-btn::before` | `.dock-icon-maximize::before` |
| `.dock-panel-min-btn::before` | `.dock-icon-restore::before` |
| `.dock-column-collapse-left::before` | `.dock-icon-collapse-left::before` |
| `.dock-column-collapse-right::before` | `.dock-icon-collapse-right::before` |
| `.dock-column-accordion-btn::before` | `.dock-icon-accordion::before` |
| `.dock-drop-left::before` | `.dock-icon-left::before` |
| `.dock-drop-right::before` | `.dock-icon-right::before` |
| `.dock-drop-top::before` | `.dock-icon-top::before` |
| `.dock-drop-bottom::before` | `.dock-icon-bottom::before` |

For example:

```css
/* Before */
.my-app .dock-tab-close-btn::before { content: '\00d7'; }

/* Version 5 */
.my-app .dock-icon-close::before { content: '\00d7'; }
```

The close icon class covers tab close buttons and floating panel close buttons.
Scope through the existing control or panel classes if they need different
artwork.

Color and font rules on controls still inherit into the icon. For maximize,
change the control's `color` instead of its old pseudo-element's `border-color`;
the icon's border uses `currentColor`. Load application overrides after rc-dock's
stylesheet.

For font, background-image and CSS mask examples, see [icon styling](README.md#styling).

## Control DOM

This applies only to code or selectors that inspect a control's children or
assume the control is empty. For example, a tab close control now contains:

```html
<div class="dock-tab-close-btn">
  <span class="dock-icon dock-icon-close"></span>
</div>
```

Update child-count checks or `:empty` selectors accordingly. Keep click handlers
and hit-area sizing on the existing control. The icon has `pointer-events: none`;
replacing or hiding its artwork does not change the control's hit area.

## Custom TypeScript integrations

Applications consuming the context supplied by `DockLayout` need no changes.
If you provide your own `DockContext` implementation or typed test double, add
the new `canDock`, `onColumnChange` and `setFloatAnchorRect` methods.

If you maintain exhaustive `DropDirection` maps or checks, include `collapse`
and `accordion`. These are new `onLayoutChange` reasons for side-column actions;
existing docking reasons remain unchanged.
