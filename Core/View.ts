import { delay } from "../util.js";
import { EventHandler } from "./EventHandler.js";
import { Store } from "./Store.js";
import { ModelVisitor, Visitor } from "./Visitor.js";

interface Node<T> {
  head: T | null;
  next: T | null;
  parent: T | null;
  visitor: Visitor;

  setChild(node: T): void;
}

export default class View extends Store implements Node<View> {
  private readonly handler = new EventHandler();

  head: View | null = null;

  constructor(
    private el: HTMLElement,
    public parent: View | null = null,
    public visitor: Visitor = new ModelVisitor(),
    state = {}
  ) {
    super(state);
    super.addView(this);
    if (parent) parent.setChild(this);
    requestAnimationFrame(() => {
      this.setEvent();
      this.render();
      this.mount();
    });
  }

  setChild(view: View) {
    view.parent = this;
    if (!this.head) this.head = view;
    else this.head.next = view;
  }

  set next(v: View) {
    let curr: View = this;
    if (!curr.next) {
      curr.next = v;
    } else {
      while (curr.next) curr = curr.next;
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

  render() {
    this.el.innerHTML = this.template();
    if (this.next) this.next.render();
    if (this.head) this.head.render();
  }

  template() {
    return ``;
  }

  setEvent() {}

  addEvent<T extends keyof GlobalEventHandlersEventMap>(
    eventType: T,
    selector: string,
    callback: (e: GlobalEventHandlersEventMap[T]) => void,
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
        if (!isTarget(e.target as HTMLElement)) return false;
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
