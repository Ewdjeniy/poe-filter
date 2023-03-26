import * as React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import store from './store/configureStore';
import Page from './containers/Page';

class View implements ViewI {
  root: HTMLElement;

  constructor(el: HTMLElement) {
    this.root = el;

    createRoot(el).render(
      <Provider store={store}>
        <Page />
      </Provider>,
    );
  }
}

export default View;
