import '/src/components/atoms/RxvBox.js';
import '/src/components/atoms/RxvText.js';
import '/src/components/atoms/RxvButton.js';
import '/src/components/atoms/RxvInput.js';
import '/src/components/atoms/RxvCheckbox.js';
import '/src/components/atoms/RxvLink.js';
import '/src/components/atoms/RxvStack.js';
import '/src/components/molecules/RxvCard.js';
import '/src/components/molecules/RxvGrid.js';

class MarkdownRenderer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.renderMarkdown = this.renderMarkdown.bind(this);

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                :host {
                    display: block;
                    font-family: var(--font-family-base);
                    color: var(--color-foreground);
                }
                /* Basic markdown styling */
                h1, h2, h3, h4, h5, h6 {
                    color: var(--color-primary);
                    margin-top: var(--space-lg);
                    margin-bottom: var(--space-sm);
                }
                p {
                    margin-bottom: var(--space-sm);
                }
                a {
                    color: var(--color-primary);
                    text-decoration: underline;
                }
                pre {
                    background-color: var(--color-secondary);
                    padding: var(--space-sm);
                    border: var(--border-width) var(--border-style) var(--border-color);
                    border-radius: var(--border-radius);
                    overflow-x: auto;
                }
                code {
                    font-family: monospace;
                }
                blockquote {
                    border-left: var(--border-width) var(--border-style) var(--border-color);
                    padding-left: var(--space-sm);
                    margin-left: 0;
                    color: var(--color-secondary);
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: var(--space-md);
                }
                th, td {
                    border: var(--border-width) var(--border-style) var(--border-color);
                    padding: var(--space-sm);
                    text-align: left;
                }
                ul, ol {
                    margin-left: var(--space-md);
                    margin-bottom: var(--space-sm);
                }
            </style>
            <div id="content"></div>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ['src'];
    }

    connectedCallback() {
        this.renderMarkdown();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'src' && oldValue !== newValue) {
            this.renderMarkdown();
        }
    }

    async renderMarkdown() {
        const src = this.getAttribute('src');
        const contentDiv = this.shadowRoot.querySelector('#content');

        if (!src) {
            contentDiv.innerHTML = '<p>No markdown source provided.</p>';
            return;
        }

        this.fetchAndRender(src, contentDiv);
    }

    async fetchAndRender(src, contentDiv) {
        try {
            const response = await fetch(src);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const markdown = await response.text();
            const html = marked.parse(markdown);
            contentDiv.innerHTML = html;
            this.dispatchEvent(new CustomEvent('markdown-rendered', {
                detail: { content: html },
                bubbles: true,
                composed: true
            }));
        } catch (error) {
            console.error('Error fetching or parsing markdown:', error);
            contentDiv.innerHTML = `<p>Error loading content: ${error.message}</p>`;
        }
    }
}

customElements.define('markdown-renderer', MarkdownRenderer);
