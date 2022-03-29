import { delay } from "../util.js";
import { EventHandler } from "./EventHandler.js";
import { Store } from "./Store.js";
import { ModelVisitor } from "./Visitor.js";

export default class View {
  #el;
  #handler = new EventHandler();
  store;
  #state;
  parent;
  // next = null;
  #head = null;
  subscribeKeys;

  constructor(store, el, parent = undefined) {
    this.store = store;
    this.store.addView(this);
    if (parent) parent.setChild(this);
    this.#el = el;
    requestAnimationFrame(() => {
      this.setEvent();
      this.render();
    });
    this.subscribeKeys = Object.entries(this.initState()).map(
      ([key, value]) => ({
        [key]: true,
      })
    );
  }

  setState(newState) {
    if (
      Object.entries(newState).every(([key, value]) => {
        return this.#state[key] && this.#state[key] === value;
      })
    )
      return;
    this.#state = { ...this.#state, ...newState };
    this.render();
  }

  setChild(view) {
    view.parent = this;
    if (!this.#head) this.#head = view;
    else this.#head.next = view;
  }

  set next(v) {
    let curr = this;
    if (!curr.next) {
      curr.next = v;
    } else {
      while (curr.next) curr = curr.next;
      curr.next = v;
    }
  }

  unsubscribe(key) {
    this.subscribeKeys[key] = false;
  }

  *subscribe(key) {
    if (!key in this.subscribeKeys) return;
    this.subscribeKeys[key] = true;
    yield { view: this, key, bool: true };
  }

  initState() {
    return {};
  }

  setup() {}

  mount() {}

  throttle(fn, time) {
    this.#handler.throttle(fn, time);
  }

  debounce(fn) {
    this.#handler.debounce(fn);
  }

  startAuto(fn, delay) {
    this.#handler.startAuto(fn, delay);
  }

  render() {
    this.#el.innerHTML = this.template();
    this.mount();
  }

  template() {
    return ``;
  }

  setEvent() {}

  addEvent(eventType, selector, callback, capture = false) {
    const children = [...this.#el.querySelectorAll(selector)];
    const isTarget = (target) =>
      target.closest(selector) || children.includes(target);
    this.#el.addEventListener(
      eventType,
      (e) => {
        if (!isTarget(e.target)) return false;
        callback(e);
      },
      capture
    );
  }

  select(selector) {
    return this.#el.querySelector(selector);
  }

  selectAll(selector) {
    return this.#el.querySelectorAll(selector);
  }
}
