import View from "../Core/View.js";
import { sources } from "../util.js";

export class Mainbanner extends View {
  initState() {
    return {
      selected: 0,
      banner: sources.banner,
      sidebar: sources.sidebar,
      words: sources.words,
    };
  }
  #spans = () => [...this.selectAll(".product_thumbnail")];
  #images = () => [...this.selectAll(".main_bg")];
  #idx = 0;

  template() {
    const { banner, sidebar, selected } = this.state;
    return ` ${banner
      .map(
        (img, idx) =>
          `<img class="main_bg ${
            idx === selected ? "selected" : ""
          }" src="${img}" >`
      )
      .join("")}     
        <div class="selected-product">
            <div class="image-container">
                <a></a>
                <a></a>
                <a></a>
                <a></a>
            </div>
            <ul class="thumbnail">
            ${sidebar
              .map(
                (img, idx) =>
                  `<li><a><img  src="${img}"/><span class="product_thumbnail ${
                    idx === selected ? "selected" : ""
                  }" data-idx=${idx}  ></span></a></li>`
              )
              .join("")}
            </ul>
        </div>
        `;
  }
  change(index) {
    const spans = this.#spans();
    const imgs = this.#images();
    spans[this.#idx].classList.remove("selected");
    imgs[this.#idx].classList.remove("selected");
    this.#idx = index;
    spans[this.#idx].classList.add("selected");
    imgs[this.#idx].classList.add("selected");
  }
  setEvent() {
    const auto = () =>
      this.#idx === 5 ? this.change(0) : this.change(this.#idx + 1);

    this.startAuto(auto, 3000);
    this.addEvent(
      "mouseover",
      "span",
      (e) => {
        this.throttle(() => this.change(parseInt(e.target.dataset.idx)), 100);
        this.startAuto(auto, 3000);
      },
      100
    );
  }
}
