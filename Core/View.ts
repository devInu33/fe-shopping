import { Store } from "./Store.js";
import { EventHandler } from "./EventHandler.js";
import { stateObj } from "../util.js";
import Node from "./Node.js";

export default class View extends Node<HTMLElement> {
  state;

  constructor(
    protected store: Store,
    el: HTMLElement,
    parent: View | null = null,
    state = {}
  ) {
    super(el, parent);
    store.addView(this);
    this.state = this.store.state;

    requestAnimationFrame(() => {
      this.setEvent();
      this.render();
      this.mount();
    });
  }

  _render() {
    this.el.innerHTML = this.template();
  }

  setEvent() {}

  addEvent<T extends keyof HTMLElementEventMap>(
    eventType: T,
    selector: string,
    callback: (e: HTMLElementEventMap[T]) => void,
    capture = false
  ) {
    const children = [...this.el.querySelectorAll(selector)];
    const isTarget = (target: HTMLElement | null): boolean => {
      if (!target) return false;
      return Boolean(target.closest(selector)) || children.includes(target);
    };
    this.el.addEventListener(
      eventType,
      (e) => {
        if (!isTarget(<HTMLElement>e.target)) return;
        callback(e);
      },
      capture
    );
  }

  initState() {
    return {};
  }

  mount(): void {}

  setState(newState: stateObj): void {
    this.store.setState(newState);
  }

  select(selector: string): HTMLElement | null {
    return this.el.querySelector(selector);
  }

  selectAll(selector: string): any {
    return this.el.querySelectorAll(selector);
  }
}
