import { delay } from "../util.js";

export class EventHandler {
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
      this.autoInterrupt(time, fn, delay)
    );
  }

  autoInterrupt(time, fn, delay) {
    if (time - this.#prev >= delay) {
      this.#prev = time;
      fn();
    } else {
      cancelAnimationFrame(this.#autoCallback);
    }
    this.#autoCallback = requestAnimationFrame((time) =>
      this.autoInterrupt(time, fn, delay)
    );
  }
}
