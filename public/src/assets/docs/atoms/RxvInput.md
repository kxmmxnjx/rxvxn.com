# RxvInput

`RxvInput` is a flexible form input component that provides consistent styling and behavior across different input types. It supports validation states, custom styling, and accessibility features.

## Features

- **Multiple Input Types**: Text, email, password, number, search, and more
- **Validation States**: Success, error, and warning states with visual feedback
- **Accessibility**: Full ARIA support and keyboard navigation
- **Custom Styling**: Consistent with design system
- **Form Integration**: Works seamlessly with forms and validation libraries

## Basic Usage

```html
<rxv-input placeholder="Enter your name"></rxv-input>

<rxv-input type="email" placeholder="Enter your email"></rxv-input>

<rxv-input type="password" placeholder="Enter your password"></rxv-input>
```

## Input Types

### Text Input (Default)

```html
<rxv-input type="text" placeholder="Text input"></rxv-input>
```

### Email Input

```html
<rxv-input type="email" placeholder="email@example.com"></rxv-input>
```

### Password Input

```html
<rxv-input type="password" placeholder="Password"></rxv-input>
```

### Number Input

```html
<rxv-input type="number" placeholder="0" min="0" max="100"></rxv-input>
```

### Search Input

```html
<rxv-input type="search" placeholder="Search..."></rxv-input>
```

### Textarea

```html
<rxv-input type="textarea" placeholder="Enter your message" rows="4"></rxv-input>
```

## Sizes

```html
<rxv-input size="sm" placeholder="Small input"></rxv-input>
<rxv-input placeholder="Medium input (default)"></rxv-input>
<rxv-input size="lg" placeholder="Large input"></rxv-input>
```

## Validation States

### Success State

```html
<rxv-input state="success" value="valid@email.com" placeholder="Email"></rxv-input>
```

### Error State

```html
<rxv-input state="error" value="invalid-email" placeholder="Email"></rxv-input>
```

### Warning State

```html
<rxv-input state="warning" value="test@example.com" placeholder="Email"></rxv-input>
```

## Disabled State

```html
<rxv-input disabled placeholder="Disabled input"></rxv-input>
<rxv-input disabled value="Disabled with value"></rxv-input>
```

## Required Fields

```html
<rxv-input required placeholder="Required field"></rxv-input>
```

## Form Integration

```html
<form>
  <rxv-stack direction="column" gap="md">
    <rxv-stack direction="column" gap="xs">
      <rxv-text as="label" weight="medium">Name *</rxv-text>
      <rxv-input name="name" required placeholder="Enter your full name"></rxv-input>
    </rxv-stack>
    
    <rxv-stack direction="column" gap="xs">
      <rxv-text as="label" weight="medium">Email *</rxv-text>
      <rxv-input name="email" type="email" required placeholder="Enter your email"></rxv-input>
    </rxv-stack>
    
    <rxv-stack direction="column" gap="xs">
      <rxv-text as="label" weight="medium">Message</rxv-text>
      <rxv-input name="message" type="textarea" rows="4" placeholder="Enter your message"></rxv-input>
    </rxv-stack>
    
    <rxv-button type="submit">Submit</rxv-button>
  </rxv-stack>
</form>
```

## Event Handling

```html
<rxv-input id="myInput" placeholder="Type something"></rxv-input>

<script>
const input = document.getElementById('myInput');

input.addEventListener('input', (event) => {
  console.log('Input value:', event.target.value);
});

input.addEventListener('change', (event) => {
  console.log('Input changed:', event.target.value);
});

input.addEventListener('blur', (event) => {
  console.log('Input lost focus');
});
</script>
```

## Attributes

| Attribute     | Description                    | Type    | Values                           | Default |
| ------------- | ------------------------------ | ------- | -------------------------------- | ------- |
| `type`        | Input type                     | String  | `text`, `email`, `password`, `number`, `search`, `textarea` | `text` |
| `size`        | Input size                     | String  | `sm`, `md`, `lg`                 | `md`    |
| `state`       | Validation state               | String  | `success`, `error`, `warning`    | -       |
| `placeholder` | Placeholder text               | String  | Any string                       | -       |
| `value`       | Input value                    | String  | Any string                       | -       |
| `disabled`    | Disabled state                 | Boolean | `true`, `false`                  | `false` |
| `required`    | Required field                 | Boolean | `true`, `false`                  | `false` |
| `readonly`    | Read-only state                | Boolean | `true`, `false`                  | `false` |
| `name`        | Form field name                | String  | Any string                       | -       |
| `min`         | Minimum value (number inputs)  | Number  | Any number                       | -       |
| `max`         | Maximum value (number inputs)  | Number  | Any number                       | -       |
| `rows`        | Textarea rows                  | Number  | Any positive number              | `3`     |

## Methods

### focus()

Programmatically focus the input:

```javascript
document.querySelector('rxv-input').focus();
```

### blur()

Remove focus from the input:

```javascript
document.querySelector('rxv-input').blur();
```

### select()

Select all text in the input:

```javascript
document.querySelector('rxv-input').select();
```

## Properties

### value

Get or set the input value:

```javascript
const input = document.querySelector('rxv-input');
console.log(input.value);
input.value = 'New value';
```

### validity

Get the input's validity state:

```javascript
const input = document.querySelector('rxv-input');
console.log(input.validity.valid);
```

## CSS Custom Properties

```css
rxv-input {
  --input-height: 2.5rem;
  --input-padding: var(--space-sm) var(--space-md);
  --input-border: var(--border-width) var(--border-style) var(--border-color);
  --input-border-radius: var(--radius-sm);
  --input-bg: var(--color-background);
  --input-text-color: var(--color-foreground);
  --input-placeholder-color: var(--color-muted);
  --input-focus-border-color: var(--color-primary);
  --input-focus-shadow: 0 0 0 2px var(--color-primary);
  
  /* State colors */
  --input-success-border-color: var(--color-success);
  --input-error-border-color: var(--color-error);
  --input-warning-border-color: var(--color-warning);
}
```

## Accessibility

- **Keyboard Navigation**: Full keyboard support including Tab, Enter, and arrow keys
- **Screen Readers**: Proper labeling and state announcements
- **Focus Management**: Clear visual focus indicators
- **ARIA Support**: Uses appropriate ARIA attributes for validation states
- **Labels**: Supports proper label association

## Examples

### Login Form

```html
<rxv-box padding="xl" border="true" direction="column" gap="lg">
  <rxv-text as="h2" size="xl" weight="bold" align="center">Sign In</rxv-text>
  
  <form>
    <rxv-stack direction="column" gap="md">
      <rxv-stack direction="column" gap="xs">
        <rxv-text as="label" weight="medium">Email</rxv-text>
        <rxv-input type="email" name="email" required placeholder="Enter your email"></rxv-input>
      </rxv-stack>
      
      <rxv-stack direction="column" gap="xs">
        <rxv-text as="label" weight="medium">Password</rxv-text>
        <rxv-input type="password" name="password" required placeholder="Enter your password"></rxv-input>
      </rxv-stack>
      
      <rxv-button type="submit" full-width>Sign In</rxv-button>
    </rxv-stack>
  </form>
</rxv-box>
```

### Contact Form with Validation

```html
<form id="contactForm">
  <rxv-stack direction="column" gap="lg">
    <rxv-stack direction="column" gap="xs">
      <rxv-text as="label" weight="medium">Name *</rxv-text>
      <rxv-input id="name" name="name" required></rxv-input>
      <rxv-text id="nameError" size="sm" color="error" style="display: none;"></rxv-text>
    </rxv-stack>
    
    <rxv-stack direction="column" gap="xs">
      <rxv-text as="label" weight="medium">Email *</rxv-text>
      <rxv-input id="email" name="email" type="email" required></rxv-input>
      <rxv-text id="emailError" size="sm" color="error" style="display: none;"></rxv-text>
    </rxv-stack>
    
    <rxv-stack direction="column" gap="xs">
      <rxv-text as="label" weight="medium">Message</rxv-text>
      <rxv-input id="message" name="message" type="textarea" rows="5"></rxv-input>
    </rxv-stack>
    
    <rxv-button type="submit">Send Message</rxv-button>
  </rxv-stack>
</form>

<script>
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Simple validation example
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  
  if (!name.value.trim()) {
    name.state = 'error';
    document.getElementById('nameError').textContent = 'Name is required';
    document.getElementById('nameError').style.display = 'block';
  } else {
    name.state = 'success';
    document.getElementById('nameError').style.display = 'none';
  }
  
  if (!email.validity.valid) {
    email.state = 'error';
    document.getElementById('emailError').textContent = 'Please enter a valid email';
    document.getElementById('emailError').style.display = 'block';
  } else {
    email.state = 'success';
    document.getElementById('emailError').style.display = 'none';
  }
});
</script>
```

## Best Practices

1. **Use appropriate input types**: Choose the correct type for better user experience and validation
2. **Provide clear labels**: Always associate labels with inputs for accessibility
3. **Show validation states**: Use success, error, and warning states to provide immediate feedback
4. **Consistent sizing**: Use the same size inputs throughout your form
5. **Progressive enhancement**: Ensure forms work without JavaScript for basic functionality
