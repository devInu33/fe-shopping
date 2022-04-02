import View from "./View.js";
import { stateObj } from "../util.js";

export class Store extends Map<string | symbol, Set<View>> {
  #state: stateObj;
  state: stateObj;
  private static _storageKey: string = Symbol().toString();
  static get storageKey(): string {
    return this._storageKey;
  }

  constructor(state = {}) {
    super();
    this.#state = this.observe(state);
    this.state = new Proxy(state, {
      get: (target, name) => this.#state[name],
    });
  }

  addView(view: View) {
    Object.entries(view.initState()).forEach(([key, value]) => {
      this.#state[key] = value;
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
    const handler: ProxyHandler<stateObj> = {
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
      if (!(key in this.state)) continue;
      this.#state[key] = value;
    }
  }
}
