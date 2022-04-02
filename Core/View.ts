import { Store } from "./Store.js";
import { EventHandler } from "./EventHandler.js";
import { stateObj } from "../util.js";
import Node from "./Node.js";

export default class View extends Node {
  private readonly handler = new EventHandler();

  state;

  constructor(
    protected store: Store,
    el: HTMLElement,
    parent: Node | null = null,
    state = {}
  ) {
    super(el, parent);
    store.addView(this);
    this.state = this.store.state;

    requestAnimationFrame(() => {
      this.setEvent();
      this.render();
      this.mount();
    });
  }

  setEvent() {}

  initState() {
    return {};
  }

  mount(): void {}

  setState(newState: stateObj): void {
    this.store.setState(newState);
  }
}
