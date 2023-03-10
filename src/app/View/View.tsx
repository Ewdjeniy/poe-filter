import * as React from 'react';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import { createRoot } from 'react-dom/client';
import Filter from './containers/filter/Filter';
import Header from './containers/Header';
import Footer from './components/Footer';

class View implements ViewI {
  root: HTMLElement;

  constructor(el: HTMLElement) {
    this.root = el;
    createRoot(el).render(
      <Provider store={store}>
        <div className="container">
          <Header />
          <Filter />
          <Footer />
        </div>
      </Provider>,
    );
  }
}

export default View;
