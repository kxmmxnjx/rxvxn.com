# RxvButton

`RxvButton` is an interactive component that triggers actions when clicked. It supports multiple variants, states, and accessibility features for building consistent user interfaces.

## Features

- **Multiple Variants**: Primary, outline, ghost, and link styles
- **Size Options**: Small, medium, and large sizes
- **State Management**: Loading, disabled, and focus states
- **Accessibility**: Full keyboard and screen reader support
- **Custom Events**: Emits `rxv-click` event for flexible handling

## Basic Usage

```html
<!-- Default button -->
<rxv-button>Click me</rxv-button>

<!-- Button with variant -->
<rxv-button variant="outline">Outline Button</rxv-button>

<!-- Button with size -->
<rxv-button size="lg">Large Button</rxv-button>
```

## Variants

### Primary (Default)

```html
<rxv-button>Primary Button</rxv-button>
```

### Outline

```html
<rxv-button variant="outline">Outline Button</rxv-button>
```

### Ghost

```html
<rxv-button variant="ghost">Ghost Button</rxv-button>
```

### Link

```html
<rxv-button variant="link">Link Button</rxv-button>
```

## Sizes

```html
<rxv-button size="sm">Small</rxv-button>
<rxv-button>Medium (default)</rxv-button>
<rxv-button size="lg">Large</rxv-button>
```

## States

### Loading State

```html
<rxv-button loading>Loading...</rxv-button>
```

### Disabled State

```html
<rxv-button disabled>Disabled</rxv-button>
```

### Full Width

```html
<rxv-button full-width>Full Width Button</rxv-button>
```

## Form Integration

```html
<form>
  <rxv-button type="submit">Submit Form</rxv-button>
  <rxv-button type="reset" variant="outline">Reset Form</rxv-button>
  <rxv-button type="button" variant="ghost">Cancel</rxv-button>
</form>
```

## Event Handling

```html
<rxv-button id="myButton">Click me</rxv-button>

<script>
document.getElementById('myButton').addEventListener('rxv-click', (event) => {
  console.log('Button clicked!', event.detail);
});
</script>
```

## Attributes

| Attribute    | Description                    | Type    | Values                              | Default  |
| ------------ | ------------------------------ | ------- | ----------------------------------- | -------- |
| `variant`    | Button style variant           | String  | `primary`, `outline`, `ghost`, `link` | `primary` |
| `size`       | Button size                    | String  | `sm`, `md`, `lg`                    | `md`     |
| `type`       | HTML button type               | String  | `button`, `submit`, `reset`         | `button` |
| `disabled`   | Disables the button            | Boolean | `true`, `false`                     | `false`  |
| `loading`    | Shows loading state            | Boolean | `true`, `false`                     | `false`  |
| `full-width` | Makes button full width        | Boolean | `true`, `false`                     | `false`  |

## CSS Custom Properties

You can customize the button appearance using these CSS variables:

```css
rxv-button {
  --bg-color: var(--color-primary);
  --text-color: var(--color-background);
  --border-color: var(--color-primary);
  --bg-hover: var(--color-foreground);
  --text-hover: var(--color-background);
  --border-hover: var(--color-foreground);
  --min-height: 2.5rem;
  --padding: var(--space-sm) var(--space-md);
  --font-size: var(--font-size-md);
  --font-weight: 500;
}
```

## Methods

### focus()

Programmatically focus the button:

```javascript
document.querySelector('rxv-button').focus();
```

### blur()

Programmatically remove focus from the button:

```javascript
document.querySelector('rxv-button').blur();
```

## Accessibility

- **Keyboard Navigation**: Supports Tab, Enter, and Space key interactions
- **Screen Readers**: Properly announces button state and content
- **Focus Management**: Clear visual focus indicators
- **ARIA Support**: Automatically handles `aria-disabled` when disabled
- **Loading State**: Prevents interaction and announces loading status

## Best Practices

1. **Use semantic types**: Use `type="submit"` for form submissions, `type="button"` for actions
2. **Loading feedback**: Always show loading state for async operations
3. **Descriptive labels**: Use clear, action-oriented button text
4. **Consistent variants**: Use the same variant for similar actions across your app
5. **Size appropriately**: Use larger buttons for primary actions, smaller for secondary actions

## Examples

### Action Button Group

```html
<rxv-box direction="row" gap="sm">
  <rxv-button variant="ghost">Cancel</rxv-button>
  <rxv-button variant="outline">Save Draft</rxv-button>
  <rxv-button>Publish</rxv-button>
</rxv-box>
```

### Loading Button

```html
<rxv-button id="saveButton">Save Changes</rxv-button>

<script>
const button = document.getElementById('saveButton');
button.addEventListener('rxv-click', async () => {
  button.setAttribute('loading', '');
  try {
    await saveData();
  } finally {
    button.removeAttribute('loading');
  }
});
</script>
```
