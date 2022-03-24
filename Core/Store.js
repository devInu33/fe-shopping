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
    const noRender = Symbol("noRender");
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
        console.log(name);
        Reflect.set(target, name, value);
        if (name != noRender) {
          this.#handler.debounce(() => view.render());
        }
        return true;
      },
    };
    this.#state.set(view, new Proxy(state, handler));
  }
  setState(newState, view, render) {
    this.#state.get(view).this.#handler.debounce(() => this.#head.render());
  }
}
