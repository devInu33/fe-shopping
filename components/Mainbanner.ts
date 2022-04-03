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
    const { banner, sidebar } = this.state;
    console.log(banner, sidebar);
    return ` ${banner
      .map(
        (img: string, idx: number) =>
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
                (img: string, idx: number) =>
                  `<li><a><img  src="${img}"/><span class="product_thumbnail ${
                    idx === this.#idx ? "selected" : ""
                  }" data-idx=${idx}  ></span></a></li>`
              )
              .join("")}
            </ul>
        </div>
        `;
  }

  changeBanner = (next: number) => {
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

    this.addEvent("mouseover", "span", ({ target }) => {
      this.throttle(
        () => this.changeBanner(Number((<HTMLElement>target).dataset.idx)),

        100
      );
    });
  }
}
