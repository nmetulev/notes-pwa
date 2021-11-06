import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import './app-home';

import { Router } from '@vaadin/router';

import '../components/editor/editor';

@customElement('app-index')
export class AppIndex extends LitElement {
  static get styles() {
    return css`

    `;
  }

  constructor() {
    super();
  }

  firstUpdated() {
    // this method is a lifecycle even in lit
    // for more info check out the lit docs https://lit.dev/docs/components/lifecycle/

    // For more info on using the @vaadin/router check here https://vaadin.com/router
    const router = new Router(this.shadowRoot?.querySelector('#routerOutlet'));
    router.setRoutes([
      // temporarily cast to any because of a Type bug with the router
      {
        path: '',
        animate: true,
        children: [
          { path: '/', component: 'app-home' },
          {
            path: '/about',
            component: 'app-about',
            action: async () => {
              await import('./app-about.js');
            },
          },
        ],
      } as any,
    ]);
  }

  render() {
    return html`
      <div>
        <notes-editor></notes-editor>
      </div>
    `;
  }
}
