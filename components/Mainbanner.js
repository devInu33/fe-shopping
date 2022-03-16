import {addEvent} from "../app.js";

export class Mainbanner{
    #prev=performance.now();
    #index=0;
    #callback
    constructor() {
        this.setEvent();
    }
    setEvent() {
        const spans = document.querySelectorAll('.thumbnail span');
        const images = document.querySelectorAll('.main_bg');
        const notHover = spans[0].style.border;
        console.log(spans);
        const onHover = `2px solid #4285f4;`;
        addEvent(document.querySelector('.thumbnail'), 'mouseenter', 'span', (e) => {
            console.log(e.target);
            const children = [...spans];
            const index = children.indexOf(e.target);
            images[this.#index].style.display = 'none';
            spans[this.#index].style.border = notHover;
            this.#index = index;
            images[this.#index].style.display = 'block'
            spans[this.#index].style.border = onHover;
            cancelAnimationFrame(this.#callback);
            this.#callback = requestAnimationFrame(f);
        })

        const f = (time) => {
            if (time - this.#prev >= 3000) {
                this.#prev = time;
                images[this.#index].style.display = 'none';
                spans[this.#index].style.border = notHover;
                this.#index++;
                if (this.#index > images.length - 1) this.#index = 0;
                images[this.#index].style.display = 'block'
                spans[this.#index].style.border = onHover;
            } else {
                cancelAnimationFrame(this.#callback);
            }
            this.#callback = requestAnimationFrame(f);
        }
        this.#callback = requestAnimationFrame(f)
    }
}