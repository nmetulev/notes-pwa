import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from './editor.css';

@customElement('notes-editor')
export class AppHeader extends LitElement {
  static get styles() {
    return styles;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <div contenteditable>
        Hello World
      </div>
    `;
  }
}
