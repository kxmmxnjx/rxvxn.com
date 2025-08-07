import '/src/components/molecules/RxvGrid.js';
import '/src/components/atoms/RxvBox.js';

class DocsLayout extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%; /* Add this line */
                }
                rxv-grid {
                    grid-template-columns: 1fr 3fr 1fr; /* Left Nav | Content | Right ToC */
                    gap: var(--space-md);
                    min-height: calc(100vh - var(--header-height, 0) - var(--footer-height, 0) - var(--space-md) * 2); /* Adjust based on header/footer height */
                }
                .sidebar {
                    border: var(--border-width) var(--border-style) var(--border-color);
                    padding: var(--space-md);
                    overflow-y: auto;
                }
                .main-content {
                    overflow-y: auto;
                }
            </style>
            <rxv-grid columns="1fr 3fr 1fr" gap="md">
                <rxv-box class="sidebar">
                    <slot name="nav"></slot>
                </rxv-box>
                <rxv-box class="main-content" padding="md">
                    <slot name="content"></slot>
                </rxv-box>
                <rxv-box class="sidebar">
                    <slot name="toc"></slot>
                </rxv-box>
            </rxv-grid>
        `;
    }
}

customElements.define('docs-layout', DocsLayout);
