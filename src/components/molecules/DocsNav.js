import "/src/components/atoms/RxvBox.js";
import "/src/components/atoms/RxvText.js";
import "/src/components/atoms/RxvLink.js";
import "/src/components/atoms/RxvStack.js";

class DocsNav extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                .nav-item {
                    margin-bottom: var(--space-sm);
                }
                rxv-box {
                    border: none !important;
                }
            </style>
            <rxv-box>
                <rxv-text size="lg" weight="bold">Docs Navigation</rxv-text>
                <rxv-stack direction="column" gap="sm">
                    <rxv-link href="/docs">Introduction</rxv-link>
                    <rxv-text size="md" weight="bold">Atoms</rxv-text>
                    <rxv-link href="/docs/atoms/RxvBox">Box</rxv-link>
                    <rxv-link href="/docs/atoms/RxvText">Text</rxv-link>
                    <rxv-link href="/docs/atoms/RxvButton">Button</rxv-link>
                    <rxv-link href="/docs/atoms/RxvInput">Input</rxv-link>
                    <rxv-link href="/docs/atoms/RxvCheckbox">Checkbox</rxv-link>
                    <rxv-link href="/docs/atoms/RxvLink">Link</rxv-link>
                    <rxv-link href="/docs/atoms/RxvStack">Stack</rxv-link>
                    <rxv-text size="md" weight="bold">Molecules</rxv-text>
                    <rxv-link href="/docs/molecules/RxvCard">Card</rxv-link>
                    <rxv-link href="/docs/molecules/RxvGrid">Grid</rxv-link>
                    <rxv-link href="/docs/molecules/MarkdownRenderer">MarkdownRenderer</rxv-link>
                    <rxv-text size="md" weight="bold">Organisms</rxv-text>
                    <rxv-link href="/docs/organisms/SiteHeader">SiteHeader</rxv-link>
                    <rxv-link href="/docs/organisms/SiteFooter">SiteFooter</rxv-link>
                </rxv-stack>
            </rxv-box>
        `;
    }
}

customElements.define("docs-nav", DocsNav);
