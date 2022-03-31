import { delay } from "../util.js";
import { EventHandler } from "./EventHandler.js";
import { Store } from "./Store.js";
import { ModelVisitor } from "./Visitor.js";

export default class View {
  #el;
  #handler = new EventHandler();
  store;
  #state;
  next = null;
  #head = null;
  prop;

  constructor(store, el, parent = undefined, prop = undefined) {
    this.store = store;
    this.store.addView(this);
    if (parent) parent.setChild(this);
    this.#el = el;
    this.#state = { ...this.initState() };

    requestAnimationFrame(() => {
      this.setEvent();
      this.render();
      this.mount();
    });
  }

  setState(newState) {
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
    if (this.next) this.next.render();
    if (this.#head) this.#head.render();
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
