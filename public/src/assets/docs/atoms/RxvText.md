# RxvText

`RxvText` is a flexible typography component that provides consistent text styling across your application. It supports semantic HTML elements, various styling options, and responsive typography.

## Features

- **Semantic HTML**: Use appropriate HTML elements (`h1-h6`, `p`, `span`, etc.)
- **Typography Scale**: Consistent font sizes and weights
- **Text Styling**: Color, alignment, transformation, and decoration options
- **Responsive**: Adapts to different screen sizes
- **Accessibility**: Proper semantic markup for screen readers

## Basic Usage

```html
<!-- Basic text -->
<rxv-text>Default text content</rxv-text>

<!-- Heading -->
<rxv-text as="h1" size="xl" weight="bold">Page Title</rxv-text>

<!-- Paragraph -->
<rxv-text as="p">This is a paragraph with default styling.</rxv-text>
```

## Semantic Elements

### Headings

```html
<rxv-text as="h1">Main Title</rxv-text>
<rxv-text as="h2">Section Title</rxv-text>
<rxv-text as="h3">Subsection Title</rxv-text>
<rxv-text as="h4">Minor Heading</rxv-text>
```

### Paragraphs and Text

```html
<rxv-text as="p">This is a paragraph element.</rxv-text>
<rxv-text as="span">Inline text element</rxv-text>
<rxv-text as="strong">Bold text for emphasis</rxv-text>
<rxv-text as="em">Italic text for emphasis</rxv-text>
<rxv-text as="small">Small text for fine print</rxv-text>
```

## Sizing

```html
<rxv-text size="xs">Extra small text</rxv-text>
<rxv-text size="sm">Small text</rxv-text>
<rxv-text size="md">Medium text (default)</rxv-text>
<rxv-text size="lg">Large text</rxv-text>
<rxv-text size="xl">Extra large text</rxv-text>
<rxv-text size="2xl">2X large text</rxv-text>
```

## Font Weights

```html
<rxv-text weight="thin">Thin text (100)</rxv-text>
<rxv-text weight="light">Light text (300)</rxv-text>
<rxv-text weight="normal">Normal text (400)</rxv-text>
<rxv-text weight="medium">Medium text (500)</rxv-text>
<rxv-text weight="semibold">Semibold text (600)</rxv-text>
<rxv-text weight="bold">Bold text (700)</rxv-text>
<rxv-text weight="extrabold">Extra bold text (800)</rxv-text>
<rxv-text weight="black">Black text (900)</rxv-text>
```

## Colors

```html
<rxv-text color="primary">Primary color text</rxv-text>
<rxv-text color="secondary">Secondary color text</rxv-text>
<rxv-text color="muted">Muted color text</rxv-text>
<rxv-text color="#ff0000">Custom color text</rxv-text>
```

## Text Alignment

```html
<rxv-text align="left">Left aligned text</rxv-text>
<rxv-text align="center">Center aligned text</rxv-text>
<rxv-text align="right">Right aligned text</rxv-text>
<rxv-text align="justify">Justified text</rxv-text>
```

## Text Transformations

```html
<rxv-text transform="uppercase">UPPERCASE TEXT</rxv-text>
<rxv-text transform="lowercase">lowercase text</rxv-text>
<rxv-text transform="capitalize">Capitalized Text</rxv-text>
```

## Text Decorations

```html
<rxv-text decoration="underline">Underlined text</rxv-text>
<rxv-text decoration="line-through">Strikethrough text</rxv-text>
<rxv-text decoration="overline">Overlined text</rxv-text>
```

## Attributes

| Attribute     | Description                    | Type   | Values                                      | Default    |
| ------------- | ------------------------------ | ------ | ------------------------------------------- | ---------- |
| `as`          | HTML element to render         | String | `span`, `p`, `h1-h6`, `div`, `strong`, `em`, `small` | `span` |
| `size`        | Font size                      | String | `xs`, `sm`, `md`, `lg`, `xl`, `2xl`         | `md`       |
| `weight`      | Font weight                    | String | `thin`, `light`, `normal`, `medium`, `semibold`, `bold`, `extrabold`, `black` | `normal` |
| `color`       | Text color                     | String | `primary`, `secondary`, `muted` or custom   | `foreground` |
| `align`       | Text alignment                 | String | `left`, `center`, `right`, `justify`        | `left`     |
| `transform`   | Text transformation            | String | `uppercase`, `lowercase`, `capitalize`      | `none`     |
| `decoration`  | Text decoration                | String | `underline`, `line-through`, `overline`     | `none`     |
| `variant`     | Font variant                   | String | `normal`, `small-caps`                      | `normal`   |

## CSS Custom Properties

Customize typography using these CSS variables:

```css
rxv-text {
  --font-family: var(--font-family-base);
  --font-size: var(--font-size-md);
  --font-weight: normal;
  --color: var(--color-foreground);
  --line-height: 1.5;
  --letter-spacing: normal;
  --text-align: left;
  --text-transform: none;
  --text-decoration: none;
}
```

## Accessibility

- **Semantic Structure**: Uses appropriate HTML elements for better screen reader support
- **Heading Hierarchy**: Maintains logical heading order when using `as="h1-h6"`
- **Color Contrast**: Follows WCAG guidelines for text contrast
- **Focus Management**: Proper focus behavior for interactive text elements

## Typography Scale

The component uses a consistent typography scale:

```css
/* Font sizes */
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-md: 1rem;       /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */

/* Line heights */
--line-height-tight: 1.25;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
```

## Examples

### Article Content

```html
<article>
  <rxv-text as="h1" size="2xl" weight="bold">Article Title</rxv-text>
  <rxv-text as="p" color="muted" size="sm">Published on January 1, 2024</rxv-text>
  
  <rxv-text as="p">
    This is the first paragraph of the article content. 
    It provides an introduction to the topic.
  </rxv-text>
  
  <rxv-text as="h2" size="lg" weight="semibold">Section Heading</rxv-text>
  <rxv-text as="p">
    This is content under the section heading.
  </rxv-text>
</article>
```

### UI Labels and Messages

```html
<rxv-box direction="column" gap="sm">
  <rxv-text as="label" weight="medium">Username</rxv-text>
  <input type="text" />
  <rxv-text size="sm" color="muted">Enter your username or email</rxv-text>
</rxv-box>
```

### Status Messages

```html
<rxv-text color="success" weight="medium">✓ Success message</rxv-text>
<rxv-text color="warning" weight="medium">⚠ Warning message</rxv-text>
<rxv-text color="error" weight="medium">✗ Error message</rxv-text>
```

## Best Practices

1. **Use semantic elements**: Choose the appropriate `as` value for your content structure
2. **Maintain hierarchy**: Use heading levels (`h1-h6`) in logical order
3. **Consistent sizing**: Use the typography scale for consistent visual hierarchy
4. **Color accessibility**: Ensure sufficient contrast for text colors
5. **Performance**: Avoid excessive inline styling; use design tokens when possible
