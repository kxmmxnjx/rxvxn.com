class RxvText extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
        this.updateStyles();
    }

    static get observedAttributes() {
        return [
            "size",
            "weight",
            "color",
            "align",
            "transform",
            "decoration",
            "variant",
            "as",
        ];
    }

    attributeChangedCallback() {
        if (this.shadowRoot) {
            this.updateStyles();
        }
    }

    render() {
        const as = this.getAttribute("as") || "span";
        const allowedTags = [
            "span",
            "p",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "div",
            "strong",
            "em",
            "small",
        ];
        const tag = allowedTags.includes(as) ? as : "span";

        const template = document.createElement("template");
        template.innerHTML = `
            <style>
                :host {
                    display: var(--display, inline);
                    font-family: var(--font-family, var(--font-family-base));
                    font-size: var(--font-size, var(--font-size-md));
                    font-weight: var(--font-weight, normal);
                    color: var(--color, var(--color-foreground));
                    line-height: var(--line-height, 1.5);
                    text-align: var(--text-align, left);
                    text-transform: var(--text-transform, none);
                    text-decoration: var(--text-decoration, none);
                    font-variant: var(--font-variant, normal);
                    letter-spacing: var(--letter-spacing, normal);
                    
                    transition: color 0.2s ease;
                }
                
                /* Semantic heading styles */
                :host([as="h1"]) { 
                    --display: block;
                    --font-size: var(--font-size-xl, 2rem);
                    --font-weight: bold;
                    --line-height: 1.2;
                }
                :host([as="h2"]) { 
                    --display: block;
                    --font-size: var(--font-size-lg, 1.5rem);
                    --font-weight: bold;
                    --line-height: 1.3;
                }
                :host([as="h3"]) { 
                    --display: block;
                    --font-size: var(--font-size-md, 1.25rem);
                    --font-weight: bold;
                    --line-height: 1.4;
                }
                :host([as="p"]) { 
                    --display: block;
                    --line-height: 1.6;
                }
                :host([as="small"]) { 
                    --font-size: var(--font-size-sm, 0.875rem);
                }
            </style>
            <slot></slot>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    updateStyles() {
        const style = this.style;

        // Size
        const size = this.getAttribute("size");
        if (size) {
            const sizeMap = {
                xs: "var(--font-size-xs, 0.75rem)",
                sm: "var(--font-size-sm, 0.875rem)",
                md: "var(--font-size-md, 1rem)",
                lg: "var(--font-size-lg, 1.25rem)",
                xl: "var(--font-size-xl, 1.5rem)",
                "2xl": "var(--font-size-2xl, 2rem)",
            };
            style.setProperty("--font-size", sizeMap[size] || size);
        }

        // Weight
        const weight = this.getAttribute("weight");
        if (weight) {
            const weightMap = {
                thin: "100",
                light: "300",
                normal: "400",
                medium: "500",
                semibold: "600",
                bold: "700",
                extrabold: "800",
                black: "900",
            };
            style.setProperty("--font-weight", weightMap[weight] || weight);
        }

        // Color
        const color = this.getAttribute("color");
        if (color) {
            style.setProperty("--color", `var(--color-${color}, ${color})`);
        }

        // Alignment
        const align = this.getAttribute("align");
        if (align) {
            style.setProperty("--text-align", align);
        }

        // Transform
        const transform = this.getAttribute("transform");
        if (transform) {
            style.setProperty("--text-transform", transform);
        }

        // Decoration
        const decoration = this.getAttribute("decoration");
        if (decoration) {
            style.setProperty("--text-decoration", decoration);
        }

        // Variant
        const variant = this.getAttribute("variant");
        if (variant) {
            style.setProperty("--font-variant", variant);
        }
    }
}

customElements.define("rxv-text", RxvText);
