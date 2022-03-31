import {ModelVisitor} from "./Visitor.js";
import {App} from "../app.js";
import {EventHandler} from "./EventHandler.js";

export class Store extends Map {
  #state = {};
  state;
  static #storageKey = Symbol().toString()
  static get storageKey() {
    return this.#storageKey;
  }

  constructor(state = {}) {
    super();
    this.#state = this.observe(this.#state);
    this.state = new Proxy(state, {get: (target, name) => this.#state[name]});
  }

  addView(view) {
    Object.entries(view.initState()).forEach(([key, value]) => {
      this.#state[key] = value;
      this.subscribe(key, view);
    });
  }

  subscribe(key, view) {
    super.has(key)
        ? super.get(key).add(view)
        : super.set(key, new Set().add(view));
  }

  unsubscribe(key, view) {
    if (!super.has(key)) return;
    super.get(key).delete(view);
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
        if (super.has(name))
          super.get(name).forEach((view) => {
            view.setState({[name]: target[name]});
          });
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
