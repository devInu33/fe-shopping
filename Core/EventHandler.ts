import { delay } from "../util.js";

export class EventHandler {
  #throttle: boolean = false;
  #autoCallback = -1;
  #prev = performance.now();

  debounce(fn: () => void) {
    let currentCallback = -1;
    return (() => {
      cancelAnimationFrame(currentCallback);
      currentCallback = requestAnimationFrame(fn);
    })();
  }

  throttle(fn: () => void, time: number) {
    if (this.#throttle) return false;
    this.#throttle = true;
    fn();
    delay(time).then(() => (this.#throttle = false));
  }

  startAuto(fn: () => void, delay: number) {
    cancelAnimationFrame(this.#autoCallback);
    this.#autoCallback = requestAnimationFrame((time) =>
      this.autoInterrupt(time, fn, delay)
    );
  }

  autoInterrupt(time: number, fn: () => void, delay: number) {
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
