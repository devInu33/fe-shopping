import View from "../Core/View.js";
import { sources } from "../util.js";

export class Mainbanner extends View {
  #spans = () => [...this.selectAll(".product_thumbnail")];
  #images = () => [...this.selectAll(".main_bg")];
  #idx = 0;

  initState() {
    return {
      banner: sources.banner,
      words: sources.words,
      sidebar: sources.sidebar,
    };
  }

  template() {
    const { banner, sidebar } = this.store.state;
    return ` ${banner
      .map(
        (img, idx) =>
          `<img class="main_bg ${
            idx === this.#idx ? "selected" : ""
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
                    idx === this.#idx ? "selected" : ""
                  }" data-idx=${idx}  ></span></a></li>`
              )
              .join("")}
            </ul>
        </div>
        `;
  }

  changeBanner = (next) => {
    const spans = this.#spans(),
      imgs = this.#images();
    spans[this.#idx].classList.remove("selected");
    imgs[this.#idx].classList.remove("selected");
    this.#idx = next;
    spans[this.#idx].classList.add("selected");
    imgs[this.#idx].classList.add("selected");
  };

  setEvent() {
    const auto = () =>
      this.#idx === 5 ? this.changeBanner(0) : this.changeBanner(this.#idx + 1);

    this.startAuto(auto, 3000);
    this.addEvent("mouseover", "span", (e) => {
      this.throttle(
        () => this.changeBanner(parseInt(e.target.dataset.idx)),
        100
      );
    });
  }
}
