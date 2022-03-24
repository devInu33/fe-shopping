import { ModelVisitor } from "./Visitor.js";
import { App } from "../app.js";
import { EventHandler } from "./EventHandler.js";

export class Store {
  #state = new WeakMap();
  #currentObserver;
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
    const state = view.initState();
    const isProxy = Symbol("isProxy");
    const handler = {
      get: (target, name, receiver) => {
        if (name === isProxy) return true;
        const prop = Reflect.get(target, name, receiver);
        if (typeof prop === "undefined") return;
        if (!prop.isProxy && typeof prop == "object")
          return new Proxy(prop, handler);
        return prop;
      },
      set: (target, name, value) => {
        if (target[name] == value) return true;
        Reflect.set(target, name, value);
        view.render();
        return true;
      },
    };
    this.#state.set(view, new Proxy(state, handler));
  }
  setState(newState, view) {
    console.log(newState);
    this.#state.set(view, { ...this.#state.get(view), ...newState });
    this.#handler.debounce(() => this.#head.render());
  }
}
