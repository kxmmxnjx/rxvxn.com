# RxvCheckbox

`RxvCheckbox` is an interactive form control that allows users to select one or more options from a set. It provides accessible, customizable checkbox functionality with consistent styling.

## Features

- **Accessible**: Full keyboard and screen reader support
- **Form Integration**: Works seamlessly with forms and form libraries
- **Custom Styling**: Consistent with design system
- **States**: Support for checked, disabled, and indeterminate states
- **Events**: Custom events for flexible handling

## Basic Usage

```html
<rxv-checkbox>
  <rxv-text>Accept terms and conditions</rxv-text>
</rxv-checkbox>

<rxv-checkbox checked>
  <rxv-text>Pre-selected option</rxv-text>
</rxv-checkbox>
```

## States

### Checked State

```html
<rxv-checkbox checked>
  <rxv-text>This checkbox is checked</rxv-text>
</rxv-checkbox>
```

### Disabled State

```html
<rxv-checkbox disabled>
  <rxv-text>This checkbox is disabled</rxv-text>
</rxv-checkbox>

<rxv-checkbox checked disabled>
  <rxv-text>This checkbox is checked and disabled</rxv-text>
</rxv-checkbox>
```

### Indeterminate State

```html
<rxv-checkbox indeterminate>
  <rxv-text>This checkbox is in indeterminate state</rxv-text>
</rxv-checkbox>
```

## Form Integration

```html
<form>
  <rxv-stack direction="column" gap="md">
    <rxv-checkbox name="newsletter" value="yes">
      <rxv-text>Subscribe to newsletter</rxv-text>
    </rxv-checkbox>
    
    <rxv-checkbox name="notifications" value="email">
      <rxv-text>Email notifications</rxv-text>
    </rxv-checkbox>
    
    <rxv-checkbox name="notifications" value="sms">
      <rxv-text>SMS notifications</rxv-text>
    </rxv-checkbox>
    
    <rxv-button type="submit">Save Preferences</rxv-button>
  </rxv-stack>
</form>
```

## Event Handling

```html
<rxv-checkbox id="myCheckbox">
  <rxv-text>Click me</rxv-text>
</rxv-checkbox>

<script>
document.getElementById('myCheckbox').addEventListener('change', (event) => {
  console.log('Checkbox state:', event.target.checked);
});
</script>
```

## Attributes

| Attribute       | Description                    | Type    | Values           | Default |
| --------------- | ------------------------------ | ------- | ---------------- | ------- |
| `checked`       | Checkbox is selected           | Boolean | `true`, `false`  | `false` |
| `disabled`      | Checkbox is disabled           | Boolean | `true`, `false`  | `false` |
| `indeterminate` | Checkbox is in mixed state     | Boolean | `true`, `false`  | `false` |
| `name`          | Form field name                | String  | Any string       | -       |
| `value`         | Form field value               | String  | Any string       | `on`    |
| `required`      | Field is required              | Boolean | `true`, `false`  | `false` |

## Methods

### check()

Programmatically check the checkbox:

```javascript
document.querySelector('rxv-checkbox').check();
```

### uncheck()

Programmatically uncheck the checkbox:

```javascript
document.querySelector('rxv-checkbox').uncheck();
```

### toggle()

Toggle the checkbox state:

```javascript
document.querySelector('rxv-checkbox').toggle();
```

## Properties

### checked

Get or set the checked state:

```javascript
const checkbox = document.querySelector('rxv-checkbox');
console.log(checkbox.checked); // true or false
checkbox.checked = true;
```

### disabled

Get or set the disabled state:

```javascript
const checkbox = document.querySelector('rxv-checkbox');
checkbox.disabled = true;
```

## CSS Custom Properties

```css
rxv-checkbox {
  --checkbox-size: 1rem;
  --checkbox-border: var(--border-width) var(--border-style) var(--border-color);
  --checkbox-border-radius: var(--radius-sm);
  --checkbox-bg: var(--color-background);
  --checkbox-bg-checked: var(--color-primary);
  --checkbox-checkmark-color: var(--color-background);
  --checkbox-focus-color: var(--color-primary);
}
```

## Accessibility

- **Keyboard Navigation**: Supports Space key to toggle state
- **Screen Readers**: Properly announces state and label content
- **Focus Management**: Clear visual focus indicators
- **ARIA Support**: Uses appropriate ARIA attributes
- **Labels**: Associates labels with checkbox controls

## Examples

### Settings Form

```html
<rxv-box padding="lg" border="true">
  <rxv-text as="h3" size="lg" weight="bold">Privacy Settings</rxv-text>
  
  <rxv-stack direction="column" gap="md">
    <rxv-checkbox name="privacy" value="analytics">
      <rxv-stack direction="column" gap="xs">
        <rxv-text weight="medium">Allow Analytics</rxv-text>
        <rxv-text size="sm" color="muted">
          Help us improve by sharing anonymous usage data
        </rxv-text>
      </rxv-stack>
    </rxv-checkbox>
    
    <rxv-checkbox name="privacy" value="marketing" checked>
      <rxv-stack direction="column" gap="xs">
        <rxv-text weight="medium">Marketing Emails</rxv-text>
        <rxv-text size="sm" color="muted">
          Receive updates about new features and promotions
        </rxv-text>
      </rxv-stack>
    </rxv-checkbox>
    
    <rxv-checkbox name="privacy" value="third-party" disabled>
      <rxv-stack direction="column" gap="xs">
        <rxv-text weight="medium">Third-party Sharing</rxv-text>
        <rxv-text size="sm" color="muted">
          Currently disabled by your organization
        </rxv-text>
      </rxv-stack>
    </rxv-checkbox>
  </rxv-stack>
</rxv-box>
```

### Select All Pattern

```html
<rxv-stack direction="column" gap="sm">
  <rxv-checkbox id="selectAll">
    <rxv-text weight="bold">Select All</rxv-text>
  </rxv-checkbox>
  
  <rxv-stack direction="column" gap="xs">
    <rxv-checkbox class="item-checkbox">
      <rxv-text>Item 1</rxv-text>
    </rxv-checkbox>
    <rxv-checkbox class="item-checkbox">
      <rxv-text>Item 2</rxv-text>
    </rxv-checkbox>
    <rxv-checkbox class="item-checkbox">
      <rxv-text>Item 3</rxv-text>
    </rxv-checkbox>
  </rxv-stack>
</rxv-stack>

<script>
const selectAll = document.getElementById('selectAll');
const itemCheckboxes = document.querySelectorAll('.item-checkbox');

selectAll.addEventListener('change', () => {
  itemCheckboxes.forEach(checkbox => {
    checkbox.checked = selectAll.checked;
  });
});

itemCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    const checkedCount = Array.from(itemCheckboxes).filter(cb => cb.checked).length;
    selectAll.checked = checkedCount === itemCheckboxes.length;
    selectAll.indeterminate = checkedCount > 0 && checkedCount < itemCheckboxes.length;
  });
});
</script>
```

## Best Practices

1. **Clear Labels**: Use descriptive labels that explain what the checkbox controls
2. **Logical Grouping**: Group related checkboxes together
3. **Progressive Enhancement**: Ensure functionality works without JavaScript
4. **Form Validation**: Provide clear feedback for required checkboxes
5. **State Management**: Use indeterminate state appropriately for "select all" patterns
