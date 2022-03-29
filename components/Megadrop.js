import View from "../Core/View.js";
import { sources } from "../util.js";

export class Megadrop extends View {
  initState() {
    return {
      layers: sources.smartlayer,
      layerSelected: false,
      firstlayer: -1,
      secondlayer: -1,
    };
  }

  //3단 객체
  //
  template() {
    const { layers, layerSelected, firstlayer, secondlayer } = this.store.state;
    console.log(layerSelected);
    return `
        <h3></h3>
        <ul class="shopping-list" style=${
          layerSelected ? "display:block" : "display:none"
        }>
        ${Object.entries(layers)
          .map(
            ([cat, sub], idx2) =>
              `<li data-idx=${idx2} ><a class="firstlayer">${cat}</a></li><div class="depth-2">${
                idx2 === firstlayer
                  ? Object.entries(sub)
                      .map(
                        ([cat, sub], idx3) =>
                          `<li data-idx=${idx3}><a class="secondlayer">${cat}</a><div class="depth-3" >${
                            idx3 === secondlayer
                              ? sub
                                  .map(
                                    (cat) =>
                                      `<li><a class="thirdlayer">${cat}</a>`
                                  )
                                  .join("")
                              : ""
                          }</div>`
                      )
                      .join("")
                  : ""
              }</div>`
          )
          .join("")}
      </ul>
      `;
  }

  setEvent() {
    this.addEvent(
      "mouseenter",
      ".firstlayer",
      ({ target }) => {
        const idx = target.closest("li[data-idx]").dataset.idx;
        this.store.setState({ firstlayer: idx });
      },
      true
    );
    this.addEvent(
      "mouseenter",
      ".secondlayer",
      ({ target }) => {
        const idx = target.closest("li[data-idx]").dataset.idx;
        this.store.setState({ secondlayer: idx });
      },
      true
    );
  }
}
