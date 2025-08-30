
# RxvBox

`RxvBox` is a versatile layout component that provides a flexible box model with extensive styling and layout capabilities. It serves as the foundation for building complex layouts with consistent spacing, alignment, and styling.

## Features

- **Flexible Layout**: Supports both block and flex layouts
- **Responsive Design**: Dynamic attribute updates
- **Extensive Styling**: Background, borders, spacing controls
- **Accessibility**: Semantic layout structure

## Basic Usage

```html
<!-- Simple container -->
<rxv-box padding="md" border="true">
  <p>Basic box with padding and border</p>
</rxv-box>

<!-- Flex layout -->
<rxv-box direction="row" gap="md" align="center" justify="between">
  <rxv-text>Left content</rxv-text>
  <rxv-text>Right content</rxv-text>
</rxv-box>
```

## Layout Examples

### Horizontal Layout

```html
<rxv-box direction="row" gap="sm" padding="lg">
  <rxv-box bg="muted" padding="md">Item 1</rxv-box>
  <rxv-box bg="muted" padding="md">Item 2</rxv-box>
  <rxv-box bg="muted" padding="md">Item 3</rxv-box>
</rxv-box>
```

### Vertical Stack with Alignment

```html
<rxv-box direction="column" gap="md" align="center" padding="xl">
  <rxv-text size="lg" weight="bold">Centered Content</rxv-text>
  <rxv-text>Supporting text below</rxv-text>
  <rxv-button>Action Button</rxv-button>
</rxv-box>
```

### Card-like Container

```html
<rxv-box 
  padding="lg" 
  border="true" 
  radius="md" 
  bg="background"
  direction="column" 
  gap="md"
>
  <rxv-text as="h3" size="lg" weight="bold">Card Title</rxv-text>
  <rxv-text>Card content goes here with proper spacing.</rxv-text>
  <rxv-box direction="row" gap="sm" justify="end">
    <rxv-button variant="ghost">Cancel</rxv-button>
    <rxv-button>Confirm</rxv-button>
  </rxv-box>
</rxv-box>
```

## Attributes

### Layout Properties

| Attribute   | Description                           | Type   | Values                                    | Default |
| ----------- | ------------------------------------- | ------ | ----------------------------------------- | ------- |
| `direction` | Flex direction (enables flex layout)  | String | `row`, `column`                          | -       |
| `align`     | Cross-axis alignment                  | String | `start`, `center`, `end`, `stretch`, `baseline` | `stretch` |
| `justify`   | Main-axis alignment                   | String | `start`, `center`, `end`, `between`, `around`, `evenly` | `start` |
| `gap`       | Space between child elements          | String | `xs`, `sm`, `md`, `lg`, `xl`, `2xl` or custom | `0` |
| `wrap`      | Allow items to wrap                   | String | `true`, `wrap`, `reverse`                | `nowrap` |

### Spacing Properties

| Attribute | Description        | Type   | Values                                  | Default |
| --------- | ------------------ | ------ | --------------------------------------- | ------- |
| `padding` | Internal spacing   | String | `xs`, `sm`, `md`, `lg`, `xl`, `2xl` or custom | `0` |
| `margin`  | External spacing   | String | `xs`, `sm`, `md`, `lg`, `xl`, `2xl` or custom | `0` |

### Visual Properties

| Attribute | Description           | Type   | Values                              | Default       |
| --------- | --------------------- | ------ | ----------------------------------- | ------------- |
| `bg`      | Background color      | String | `primary`, `secondary`, `muted` or custom | `transparent` |
| `border`  | Border style          | String | `true` (uses theme) or custom CSS   | `none`        |
| `radius`  | Border radius         | String | `sm`, `md`, `lg`, `xl` or custom    | `0`           |

## Design Tokens

RxvBox uses the following CSS custom properties:

```css
/* Spacing tokens */
--space-xs: 0.25rem;
--space-sm: 0.5rem;
--space-md: 1rem;
--space-lg: 1.5rem;
--space-xl: 2rem;
--space-2xl: 3rem;

/* Color tokens */
--color-primary: #000000;
--color-secondary: #666666;
--color-muted: #f5f5f5;
--color-background: #ffffff;

/* Border tokens */
--border-width: 1px;
--border-style: solid;
--border-color: var(--color-foreground);

/* Radius tokens */
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
```

## Accessibility

- Uses semantic HTML structure
- Maintains proper focus management
- Supports screen reader navigation
- Follows WCAG guidelines for spacing and contrast

## Best Practices

1. **Use semantic direction**: Use `direction="column"` for vertical stacks, `direction="row"` for horizontal layouts
2. **Consistent spacing**: Use design tokens (`xs`, `sm`, `md`, etc.) instead of custom values
3. **Logical hierarchy**: Nest boxes logically to create clear content structure
4. **Performance**: Avoid excessive nesting; use other layout components when appropriate
