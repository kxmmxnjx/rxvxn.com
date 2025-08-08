import "/src/components/atoms/RxvBox.js";
import "/src/components/atoms/RxvText.js";
import "/src/components/atoms/RxvLink.js";
import "/src/components/atoms/RxvStack.js";

class DocsToc extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.generateToc = this.generateToc.bind(this);
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                li {
                    margin-bottom: var(--space-sm);
                }
                .level-2 {
                    margin-left: var(--space-md);
                }
                .level-3 {
                    margin-left: var(--space-lg);
                }
                rxv-box {
                    border: none !important;ㅠ
                }
            </style>
            <rxv-box>
                <rxv-text size="lg" weight="bold">Table of Contents</rxv-text>
                <ul id="toc-list"></ul>
            </rxv-box>
        `;
        // Listen for a custom event from MarkdownRenderer when content is loaded
        document.addEventListener("markdown-rendered", this.generateToc);
    }

    disconnectedCallback() {
        document.removeEventListener("markdown-rendered", this.generateToc);
    }

    generateToc(event) {
        const markdownContent = event.detail.content;
        const tocList = this.shadowRoot.getElementById("toc-list");
        tocList.innerHTML = ""; // Clear previous TOC

        // Use a temporary div to parse the HTML string
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = markdownContent;

        const headings = tempDiv.querySelectorAll("h1, h2, h3, h4, h5, h6");

        headings.forEach((heading) => {
            const level = parseInt(heading.tagName.substring(1));
            const text = heading.textContent;
            const id =
                heading.id ||
                text
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, "");

            // Ensure the heading has an ID for linking
            if (!heading.id) {
                heading.id = id;
            }

            const listItem = document.createElement("li");
            listItem.classList.add(`level-${level}`);
            listItem.innerHTML = `<rxv-link href="#${id}">${text}</rxv-link>`;
            tocList.appendChild(listItem);
        });
    }
}

customElements.define("docs-toc", DocsToc);
