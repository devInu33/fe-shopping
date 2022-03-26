import { delay } from "../util.js";
import { EventHandler } from "./EventHandler.js";
import { Store } from "./Store.js";
import { ModelVisitor } from "./Visitor.js";

export default class View {
  #el;
  #handler = new EventHandler();
  store;
  #state;
  // parent;
  // next = null;
  // child = null;

  constructor(store, el, parent = undefined) {

    this.store = store;
    this.store.addView(this);
    this.#el = el
    requestAnimationFrame(()=>{
      this.setEvent();
      this.render();
    })
  }
  s

  setState(newState) {
    this.#state = {...this.#state, ...newState};
    this.render();
  }
  initState(){
    return{}
  }
  setup(){}
  mount(){}
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
    this.mount()
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
