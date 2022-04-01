import { Store } from "./Store.js";
import { EventHandler } from "./EventHandler.js";
import { stateObj } from "../util";

interface Node<T> {
  head: T | null;
  next: T | null;
  parent: T | null;

  setChild(node: T): void;

  setNext(node: T): void;
}

export default class View implements Node<View> {
  private readonly handler = new EventHandler();
  // public static readonly EMPTY: View = new View(document.createElement("null")); //el는 널이 될 수 없음.
  head: View | null = null;
  next: View | null = null;
  state;

  constructor(
    protected store: Store,
    private el: HTMLElement,
    public parent: View | null = null,
    state = {}
  ) {
    store.addView(this);
    this.state = this.store.state;
    if (parent) parent.setChild(this);
    requestAnimationFrame(() => {
      this.setEvent();
      this.render();
      this.mount();
    });
  }

  setChild(node: View) {
    node.parent = this;
    if (!this.head) this.head = node;
    else this.head.setNext(node);
  }

  setNext(v: View | null): void {
    let curr: View = this;
    if (!curr.next) {
      curr.next = v;
    } else {
      while (curr.next) {
        curr = curr.next;
      }
      curr.next = v;
    }
  }

  throttle(fn: () => void, time: number) {
    this.handler.throttle(fn, time);
  }

  debounce(fn: () => void) {
    this.handler.debounce(fn);
  }

  startAuto(fn: () => void, delay: number) {
    this.handler.startAuto(fn, delay);
  }

  initState() {
    return {};
  }

  setup() {}

  mount(): void {}

  setState(newState: stateObj): void {
    this.store.setState(newState);
  }

  render() {
    this.el.innerHTML = this.template();
    if (this.next) this.next.render();
    if (this.head) this.head.render();
  }

  template() {
    return ``;
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
        if (!isTarget(<HTMLElement>e.target)) return false;
        callback(e);
      },
      capture
    );
  }

  select(selector: string): HTMLElement | null {
    return this.el.querySelector(selector);
  }

  selectAll(selector: string) {
    return this.el.querySelectorAll(selector);
  }
}
