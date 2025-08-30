# RxvStack

`RxvStack` is a specialized layout component for arranging child elements in a single direction (horizontal or vertical) with consistent spacing. It provides advanced features like dividers and responsive behavior.

## Features

- **Flexible Direction**: Horizontal or vertical stacking
- **Consistent Spacing**: Uses design tokens for uniform gaps
- **Visual Dividers**: Optional separators between items
- **Responsive Layout**: Automatically adapts to screen size
- **Alignment Control**: Fine-tune item positioning

## Basic Usage

```html
<!-- Vertical stack (default) -->
<rxv-stack gap="md">
  <div>First item</div>
  <div>Second item</div>
  <div>Third item</div>
</rxv-stack>

<!-- Horizontal stack -->
<rxv-stack direction="row" gap="sm">
  <rxv-button>Button 1</rxv-button>
  <rxv-button>Button 2</rxv-button>
  <rxv-button>Button 3</rxv-button>
</rxv-stack>
```

## Direction

### Vertical Stack (Column)

```html
<rxv-stack direction="column" gap="lg">
  <rxv-text as="h3">Title</rxv-text>
  <rxv-text>Description text</rxv-text>
  <rxv-button>Action</rxv-button>
</rxv-stack>
```

### Horizontal Stack (Row)

```html
<rxv-stack direction="row" gap="md" align="center">
  <rxv-text weight="bold">Label:</rxv-text>
  <rxv-text>Value</rxv-text>
  <rxv-button size="sm">Edit</rxv-button>
</rxv-stack>
```

## Spacing

Use design tokens for consistent spacing:

```html
<rxv-stack gap="xs">Tight spacing</rxv-stack>
<rxv-stack gap="sm">Small spacing</rxv-stack>
<rxv-stack gap="md">Medium spacing</rxv-stack>
<rxv-stack gap="lg">Large spacing</rxv-stack>
<rxv-stack gap="xl">Extra large spacing</rxv-stack>
```

## Alignment

### Align Items (Cross-axis)

```html
<!-- Vertical stack with horizontal alignment -->
<rxv-stack direction="column" align="center">
  <rxv-text>Centered content</rxv-text>
  <rxv-button>Centered button</rxv-button>
</rxv-stack>

<!-- Horizontal stack with vertical alignment -->
<rxv-stack direction="row" align="center" gap="md">
  <rxv-text size="lg">Large text</rxv-text>
  <rxv-text size="sm">Small text</rxv-text>
</rxv-stack>
```

### Justify Content (Main-axis)

```html
<!-- Horizontal stack with justified content -->
<rxv-stack direction="row" justify="between">
  <rxv-text>Left content</rxv-text>
  <rxv-text>Right content</rxv-text>
</rxv-stack>

<rxv-stack direction="row" justify="center">
  <rxv-button>Centered button</rxv-button>
</rxv-stack>
```

## Dividers

Add visual separators between stack items:

```html
<!-- Vertical stack with dividers -->
<rxv-stack direction="column" gap="md" divider>
  <rxv-text>First section</rxv-text>
  <rxv-text>Second section</rxv-text>
  <rxv-text>Third section</rxv-text>
</rxv-stack>

<!-- Horizontal stack with dividers -->
<rxv-stack direction="row" gap="lg" divider>
  <rxv-text>Home</rxv-text>
  <rxv-text>About</rxv-text>
  <rxv-text>Contact</rxv-text>
</rxv-stack>
```

### Custom Divider Color

```html
<rxv-stack direction="column" gap="md" divider divider-color="primary">
  <rxv-text>Item 1</rxv-text>
  <rxv-text>Item 2</rxv-text>
  <rxv-text>Item 3</rxv-text>
</rxv-stack>
```

## Responsive Behavior

```html
<!-- Automatically switches to column layout on mobile -->
<rxv-stack direction="row" gap="md" responsive>
  <rxv-box>Content 1</rxv-box>
  <rxv-box>Content 2</rxv-box>
  <rxv-box>Content 3</rxv-box>
</rxv-stack>
```

## Wrapping

```html
<!-- Allow items to wrap to new lines -->
<rxv-stack direction="row" gap="sm" wrap="true">
  <rxv-button>Button 1</rxv-button>
  <rxv-button>Button 2</rxv-button>
  <rxv-button>Button 3</rxv-button>
  <rxv-button>Button 4</rxv-button>
  <rxv-button>Button 5</rxv-button>
</rxv-stack>
```

## Attributes

| Attribute       | Description                    | Type   | Values                                      | Default    |
| --------------- | ------------------------------ | ------ | ------------------------------------------- | ---------- |
| `direction`     | Stack direction                | String | `column`, `row`                             | `column`   |
| `gap`           | Space between items            | String | `xs`, `sm`, `md`, `lg`, `xl`, `2xl`         | `0`        |
| `spacing`       | Alternative to gap             | String | `xs`, `sm`, `md`, `lg`, `xl`, `2xl`         | `0`        |
| `align`         | Cross-axis alignment           | String | `start`, `center`, `end`, `stretch`, `baseline` | `stretch` |
| `justify`       | Main-axis alignment            | String | `start`, `center`, `end`, `between`, `around`, `evenly` | `start` |
| `wrap`          | Allow wrapping                 | String | `true`, `wrap`, `reverse`                   | `nowrap`   |
| `divider`       | Show dividers between items    | Boolean| `true`, `false`                             | `false`    |
| `divider-color` | Color of dividers              | String | `primary`, `secondary`, `muted` or custom   | `secondary`|
| `responsive`    | Enable responsive behavior     | Boolean| `true`, `false`                             | `false`    |

## CSS Custom Properties

```css
rxv-stack {
  --flex-direction: column;
  --gap: 0;
  --justify-content: flex-start;
  --align-items: stretch;
  --flex-wrap: nowrap;
  --divider-color: var(--color-secondary);
}
```

## Examples

### Navigation Menu

```html
<rxv-stack direction="row" gap="lg" align="center" divider>
  <rxv-text weight="bold">Brand</rxv-text>
  <rxv-text>Home</rxv-text>
  <rxv-text>About</rxv-text>
  <rxv-text>Services</rxv-text>
  <rxv-text>Contact</rxv-text>
</rxv-stack>
```

### Card Content

```html
<rxv-stack direction="column" gap="md">
  <rxv-text as="h3" size="lg" weight="bold">Card Title</rxv-text>
  <rxv-text>Card description and content goes here.</rxv-text>
  <rxv-stack direction="row" gap="sm" justify="end">
    <rxv-button variant="ghost">Cancel</rxv-button>
    <rxv-button>Confirm</rxv-button>
  </rxv-stack>
</rxv-stack>
```

### Form Layout

```html
<rxv-stack direction="column" gap="lg">
  <rxv-stack direction="column" gap="xs">
    <rxv-text as="label" weight="medium">Email</rxv-text>
    <input type="email" />
  </rxv-stack>
  
  <rxv-stack direction="column" gap="xs">
    <rxv-text as="label" weight="medium">Password</rxv-text>
    <input type="password" />
  </rxv-stack>
  
  <rxv-stack direction="row" gap="sm" justify="between">
    <rxv-button variant="ghost">Forgot Password?</rxv-button>
    <rxv-button type="submit">Sign In</rxv-button>
  </rxv-stack>
</rxv-stack>
```

### Responsive Layout

```html
<rxv-stack direction="row" gap="xl" responsive>
  <rxv-stack direction="column" gap="md">
    <rxv-text as="h2">Main Content</rxv-text>
    <rxv-text>Primary content area that will stack on mobile.</rxv-text>
  </rxv-stack>
  
  <rxv-stack direction="column" gap="sm">
    <rxv-text as="h3">Sidebar</rxv-text>
    <rxv-text size="sm">Sidebar content that appears below main content on mobile.</rxv-text>
  </rxv-stack>
</rxv-stack>
```

## Best Practices

1. **Use appropriate direction**: Column for vertical content flow, row for horizontal layouts
2. **Consistent spacing**: Use design tokens (`xs`, `sm`, `md`, etc.) for spacing consistency
3. **Logical grouping**: Group related items together in the same stack
4. **Responsive design**: Use the `responsive` attribute for layouts that should adapt to mobile
5. **Divider usage**: Use dividers sparingly to avoid visual clutter
6. **Performance**: Prefer RxvStack over nested flex containers for simple layouts

## Accessibility

- **Semantic Structure**: Maintains logical content flow for screen readers
- **Focus Management**: Preserves natural tab order through stacked items
- **Responsive**: Adapts to different viewport sizes and zoom levels
- **Color Contrast**: Dividers use theme colors that meet contrast requirements
