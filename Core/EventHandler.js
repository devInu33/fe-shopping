import { delay } from "../util.js";

export class EventHandle {
  callback = -1;
  fn;
  constructor(fn) {
    this.fn = fn;
  }
}


export class Debounce extends EventHandle {
  debounce() {
    cancelAnimationFrame(this.callback);
    this.callback = requestAnimationFrame(this.fn);
  }
}


export class EventHandler {
  #currentObserver = null;
  #throttle;
  #autoCallback = -1;
  #prev = performance.now();

  debounce(fn) {
    let currentCallback = -1;
    return (() => {
      cancelAnimationFrame(currentCallback);
      currentCallback = requestAnimationFrame(fn);
    })();
  }
  throttle(fn, time) {
    if (this.#throttle === true) return false;
    this.#throttle = true;
    fn();
    delay(time).then(() => (this.#throttle = false));
  }

  startAuto(fn, delay) {
    cancelAnimationFrame(this.#autoCallback);
    this.#autoCallback = requestAnimationFrame((time) =>
      this.auto(time, fn, delay)
    );
  }

  auto(time, fn, delay) {
    if (time - this.#prev >= delay) {
      this.#prev = time;
      fn();
    } else {
      cancelAnimationFrame(this.#autoCallback);
    }
    this.#autoCallback = requestAnimationFrame((time) =>
      this.auto(time, fn, delay)
    );
  }
}
