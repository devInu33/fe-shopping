import { EventHandler } from "./EventHandler.js";

export default class Node extends EventHandler {
  private head: Node | null = null;
  private next: Node | null = null;

  constructor(public el: HTMLElement, private parent: Node | null = null) {
    super();
    if (parent) parent.setChild(this);
  }

  setChild(node: Node) {
    node.parent = this;
    if (!this.head) this.head = node;
    else this.head.setNext(node);
  }

  setNext(v: Node): void {
    let curr: Node = this;
    if (!curr.next) {
      curr.next = v;
    } else {
      while (curr.next) {
        curr = curr.next;
      }
      curr.next = v;
    }
  }

  render() {
    this.el.innerHTML = this.template();
    if (this.next) this.next.render();
    if (this.head) this.head.render();
  }

  template() {
    return ``;
  }

  select(selector: string): HTMLElement | null {
    return this.el.querySelector(selector);
  }

  selectAll(selector: string) {
    return this.el.querySelectorAll(selector);
  }
}
