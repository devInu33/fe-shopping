import View from "./View.js";
import { stateObj } from "../util.js";

export class Store extends Map<string | symbol, Set<View>> {
  static #state: stateObj;
  state: stateObj;
  static #storageKey: string = Symbol().toString();
  static get storageKey(): string {
    return this.#storageKey;
  }

  constructor(state = {}) {
    super();
    Store.#state = this.observe(state);
    this.state = new Proxy(state, {
      get: (target, name) => Store.#state[name],
    });
  }

  addView(view: View) {
    Object.entries(view.initState()).forEach(([key, value]) => {
      Store.#state[key] = value;
      this.subscribe(key, view);
    });
  }

  subscribe(key: string | symbol, view: View) {
    super.has(key)
      ? // @ts-ignore
        super.get(key).add(view)
      : super.set(key, new Set<View>().add(view));
  }

  unsubscribe(key: string | symbol, view: View) {
    if (!super.has(key)) return;
    // @ts-ignore
    super.get(key).delete(view);
  }

  observe(state: stateObj) {
    // const isProxy = Symbol("isProxy");
    // if (name === isProxy) return true;
    // if (!prop.isProxy && typeof prop == "object")
    //   return new Proxy(prop, handler);
    const handler: ProxyHandler<any> = {
      get: (target, name, receiver) => {
        const prop = Reflect.get(target, name, receiver);
        if (typeof prop === "undefined") return;

        return prop;
      },
      set: (target, name, value) => {
        if (target[name] == value) return true;
        Reflect.set(target, name, value);
        if (super.has(name)) {
          // @ts-ignore
          super.get(name).forEach((view) => {
            view.render();
          });
        }
        return true;
      },
    };
    return new Proxy(state, handler);
  }

  setState(newState: stateObj) {
    for (const [key, value] of Object.entries(newState)) {
      if (!(key in Store.#state)) continue;
      Store.#state[key] = value;
    }
  }
}
