import { delay } from "../util.js";

export class EventHandler {
  #currentObserver = null;
  #throttle;
  #autoCallback = -1;
  #prev = performance.now();

  debounce(fn) {
    //dbounce요청은 debounce 요청끼리만 debounce 되도록 람다로
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
