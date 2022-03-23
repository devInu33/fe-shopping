import { ModelVisitor } from "./Visitor.js";
import { App } from "../app.js";
import { EventHandler } from "./EventHandler.js";

export class Store {
  #state = new WeakMap();

  #head;
  #visitor;
  #handler = new EventHandler();

  constructor(visitor) {
    this.#visitor = visitor;
  }

  getState(view) {
    return this.#state.get(view);
  }

  addView(view) {
    if (!this.#head) this.#head = view;
    if (this.#state.has(view)) return;
    this.#state.set(view, view.initState());
  }

  setState(newState, view) {
    const oldstate = this.#state.get(view);
    this.#state.set(view, { ...oldstate, ...newState });
    this.#head.render();
  }
}
