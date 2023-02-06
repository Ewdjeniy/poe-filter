import Model from '../Model/Model';
import View from '../View/View';

class Presenter implements PresenterI {
  model: Model;

  view: View;

  constructor(el: HTMLElement) {
    this.model = new Model();
    this.view = new View(el);
  }
}

export default Presenter;
