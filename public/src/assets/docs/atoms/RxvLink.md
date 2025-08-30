# RxvLink

`RxvLink` is a navigation component that provides consistent styling and behavior for links throughout your application. It supports different variants, states, and accessibility features.

## Features

- **Multiple Variants**: Different visual styles for various contexts
- **Navigation Support**: Internal and external link handling
- **Accessibility**: Full keyboard and screen reader support
- **Custom Styling**: Consistent with design system
- **State Management**: Hover, focus, and active states

## Basic Usage

```html
<rxv-link href="/about">About Us</rxv-link>

<rxv-link href="https://example.com" external>External Link</rxv-link>

<rxv-link href="/contact" variant="button">Contact</rxv-link>
```

## Variants

### Default Link

```html
<rxv-link href="/home">Default link style</rxv-link>
```

### Button Style

```html
<rxv-link href="/signup" variant="button">Sign Up</rxv-link>
```

### Subtle Link

```html
<rxv-link href="/terms" variant="subtle">Terms of Service</rxv-link>
```

### Underlined Link

```html
<rxv-link href="/help" variant="underline">Need Help?</rxv-link>
```

## External Links

```html
<!-- Opens in new tab -->
<rxv-link href="https://github.com" external>
  GitHub
</rxv-link>

<!-- External link with custom target -->
<rxv-link href="https://example.com" target="_blank" rel="noopener noreferrer">
  External Site
</rxv-link>
```

## Sizes

```html
<rxv-link href="/home" size="sm">Small link</rxv-link>
<rxv-link href="/home">Medium link (default)</rxv-link>
<rxv-link href="/home" size="lg">Large link</rxv-link>
```

## Disabled State

```html
<rxv-link href="/disabled" disabled>Disabled link</rxv-link>
```

## Navigation Integration

```html
<!-- Simple navigation -->
<nav>
  <rxv-stack direction="row" gap="lg">
    <rxv-link href="/" variant="subtle">Home</rxv-link>
    <rxv-link href="/about" variant="subtle">About</rxv-link>
    <rxv-link href="/services" variant="subtle">Services</rxv-link>
    <rxv-link href="/contact" variant="button">Contact</rxv-link>
  </rxv-stack>
</nav>
```

## Event Handling

```html
<rxv-link id="myLink" href="/page">Click me</rxv-link>

<script>
document.getElementById('myLink').addEventListener('click', (event) => {
  console.log('Link clicked:', event.target.href);
  
  // Prevent default navigation if needed
  // event.preventDefault();
});
</script>
```

## Attributes

| Attribute  | Description                    | Type    | Values                              | Default    |
| ---------- | ------------------------------ | ------- | ----------------------------------- | ---------- |
| `href`     | Link destination               | String  | URL or path                         | -          |
| `variant`  | Visual style variant           | String  | `default`, `button`, `subtle`, `underline` | `default` |
| `size`     | Link size                      | String  | `sm`, `md`, `lg`                    | `md`       |
| `external` | Mark as external link          | Boolean | `true`, `false`                     | `false`    |
| `disabled` | Disabled state                 | Boolean | `true`, `false`                     | `false`    |
| `target`   | Link target                    | String  | `_self`, `_blank`, `_parent`, `_top` | `_self`   |
| `rel`      | Link relationship              | String  | `noopener`, `noreferrer`, etc.      | -          |
| `download` | Download attribute             | String  | Filename or boolean                 | -          |

## CSS Custom Properties

```css
rxv-link {
  --link-color: var(--color-primary);
  --link-color-hover: var(--color-foreground);
  --link-color-active: var(--color-primary);
  --link-text-decoration: none;
  --link-text-decoration-hover: underline;
  --link-font-weight: 400;
  --link-font-weight-hover: 500;
  --link-transition: var(--transition-fast);
  
  /* Button variant */
  --link-button-bg: var(--color-primary);
  --link-button-color: var(--color-background);
  --link-button-padding: var(--space-sm) var(--space-md);
  --link-button-border-radius: var(--radius-sm);
  
  /* Disabled state */
  --link-disabled-color: var(--color-muted);
  --link-disabled-cursor: not-allowed;
}
```

## Accessibility

- **Keyboard Navigation**: Full keyboard support including Tab and Enter
- **Screen Readers**: Proper link announcement and context
- **Focus Management**: Clear visual focus indicators
- **External Links**: Automatically adds appropriate ARIA labels for external links
- **Semantic HTML**: Uses proper `<a>` elements

## Examples

### Navigation Bar

```html
<header>
  <rxv-box direction="row" justify="between" align="center" padding="md">
    <rxv-link href="/" size="lg" weight="bold">Brand</rxv-link>
    
    <nav>
      <rxv-stack direction="row" gap="lg" align="center">
        <rxv-link href="/products">Products</rxv-link>
        <rxv-link href="/about">About</rxv-link>
        <rxv-link href="/contact">Contact</rxv-link>
        <rxv-link href="/login" variant="button">Login</rxv-link>
      </rxv-stack>
    </nav>
  </rxv-box>
</header>
```

### Footer Links

```html
<footer>
  <rxv-box padding="xl">
    <rxv-stack direction="column" gap="lg">
      <rxv-stack direction="row" gap="xl" justify="between">
        <rxv-stack direction="column" gap="md">
          <rxv-text weight="bold">Company</rxv-text>
          <rxv-stack direction="column" gap="sm">
            <rxv-link href="/about" variant="subtle">About Us</rxv-link>
            <rxv-link href="/careers" variant="subtle">Careers</rxv-link>
            <rxv-link href="/press" variant="subtle">Press</rxv-link>
          </rxv-stack>
        </rxv-stack>
        
        <rxv-stack direction="column" gap="md">
          <rxv-text weight="bold">Support</rxv-text>
          <rxv-stack direction="column" gap="sm">
            <rxv-link href="/help" variant="subtle">Help Center</rxv-link>
            <rxv-link href="/contact" variant="subtle">Contact</rxv-link>
            <rxv-link href="/status" variant="subtle" external>Status</rxv-link>
          </rxv-stack>
        </rxv-stack>
      </rxv-stack>
      
      <rxv-box direction="row" justify="center" gap="md" padding="md">
        <rxv-link href="/privacy" variant="subtle" size="sm">Privacy</rxv-link>
        <rxv-link href="/terms" variant="subtle" size="sm">Terms</rxv-link>
      </rxv-Box>
    </rxv-stack>
  </rxv-box>
</footer>
```

### Breadcrumb Navigation

```html
<nav aria-label="Breadcrumb">
  <rxv-stack direction="row" gap="xs" align="center">
    <rxv-link href="/" variant="subtle">Home</rxv-link>
    <rxv-text color="muted">/</rxv-text>
    <rxv-link href="/products" variant="subtle">Products</rxv-link>
    <rxv-text color="muted">/</rxv-text>
    <rxv-text color="muted">Current Page</rxv-text>
  </rxv-stack>
</nav>
```

### Call-to-Action Links

```html
<rxv-box direction="column" gap="md" align="center" padding="xl">
  <rxv-text as="h2" size="xl" weight="bold">Ready to get started?</rxv-text>
  <rxv-text color="muted">Join thousands of satisfied customers</rxv-text>
  
  <rxv-stack direction="row" gap="md">
    <rxv-link href="/signup" variant="button" size="lg">Start Free Trial</rxv-link>
    <rxv-link href="/demo" variant="subtle" size="lg">Watch Demo</rxv-link>
  </rxv-stack>
</rxv-box>
```

### Download Links

```html
<rxv-stack direction="column" gap="sm">
  <rxv-text weight="bold">Downloads</rxv-text>
  <rxv-link href="/files/manual.pdf" download="user-manual.pdf">
    📄 User Manual (PDF)
  </rxv-link>
  <rxv-link href="/files/app.zip" download>
    📦 Application Package
  </rxv-link>
</rxv-stack>
```

## Router Integration

For single-page applications, you can integrate with your router:

```html
<rxv-link href="/about" data-route>About</rxv-link>

<script>
document.addEventListener('click', (event) => {
  const link = event.target.closest('rxv-link[data-route]');
  if (link) {
    event.preventDefault();
    // Your router navigation logic here
    router.navigate(link.href);
  }
});
</script>
```

## Best Practices

1. **Use semantic href**: Always provide meaningful href values, even for SPA routing
2. **External link indicators**: Use the `external` attribute for external links
3. **Consistent styling**: Use variants consistently across your application
4. **Accessibility**: Provide descriptive link text that makes sense out of context
5. **Performance**: Prefer client-side navigation for internal links in SPAs
