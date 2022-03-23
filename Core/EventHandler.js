import { delay } from "../util.js";

export class EventHandler {
  #throttle;
  #currentCallback = -1;
  #prev = performance.now();

  debounce(fn) {
    cancelAnimationFrame(this.#currentCallback);
    this.#currentCallback = requestAnimationFrame(fn);
  }

  throttle(fn, time) {
    if (this.#throttle === true) return false;
    this.#throttle = true;
    fn();
    delay(time).then(() => (this.#throttle = false));
  }

  startAuto(fn, delay) {
    cancelAnimationFrame(this.#currentCallback);
    this.#currentCallback = requestAnimationFrame((time) =>
      this.auto(time, fn, delay)
    );
  }

  auto = (time, fn, delay) => {
    if (time - this.#prev >= delay) {
      this.#prev = time;
      fn();
    }
    this.#currentCallback = requestAnimationFrame((time) =>
      this.auto(time, fn, delay)
    );
  };
}
