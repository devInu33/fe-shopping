import { ModelVisitor } from "./Visitor.js";
import { App } from "../app.js";
import { EventHandler } from "./EventHandler.js";

export class Store {
  #state = {};
  state;
  #subscriber = new Map();

  constructor(state = {}) {
    this.#state = this.observe(state);
    this.state = new Proxy(state, { get: (target, name) => this.#state[name] });
  }

  addView(view) {
    Object.entries(view.initState()).forEach(([key, value]) => {
      this.#state[key] = value;
      this.subscribe(key, view);
    });
  }

  subscribe(key, view, bool) {
    if (bool)
      this.#subscriber.has(key)
        ? bool
          ? this.#subscriber.get(key).add(view)
          : this.#subscriber.get(key).delete(view)
        : bool
        ? this.#subscriber.set(key, new Set().add(view))
        : null;
  }

  unsubscribe(key, view) {
    if (!this.#subscriber.has(key)) return;
    this.#subscriber.get(key).delete(view);
  }

  observe(state) {
    // const isProxy = Symbol("isProxy");
    // if (name === isProxy) return true;
    // if (!prop.isProxy && typeof prop == "object")
    //   return new Proxy(prop, handler);
    const handler = {
      get: (target, name, receiver) => {
        const prop = Reflect.get(target, name, receiver);
        if (typeof prop === "undefined") return;

        return prop;
      },
      set: (target, name, value) => {
        if (target[name] == value) return true;
        Reflect.set(target, name, value);
        if (this.#subscriber.has[name])
          this.#subscriber.get[name].forEach((view) =>
            view.setState({ [name]: target[name] })
          );

        return true;
      },
    };
    return new Proxy(state, handler);
  }

  setState(newState) {
    for (const [key, value] of Object.entries(newState)) {
      if (!key in this.#state) continue;
      this.#state[key] = value;
    }
  }
}
