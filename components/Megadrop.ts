import View from "../Core/View.js";
import { sources, stateObj } from "../util.js";

type Layer = Record<string, Record<string | any, string[] | any>> | string[];

export class Megadrop extends View {
  initState() {
    return {
      layers: sources["smartlayer"],
      layerSelected: false,
      firstIdx: -1,
      secondIdx: -1,
    };
  }

  recursiveLayer = (
    layer: any,
    idx: number = 1,
    stateIdx: number | undefined = this.state.firstIdx
  ): string => {
    return idx !== 3
      ? Object.entries(layer).reduce((str, [cat, sub], subindex) => {
          str += `<li data-idx=${subindex}><a class="layer ${
            idx == 1 ? "first" : "second"
          }">${cat}</a><div class="depth ${
            idx == 1 ? "second" : "third"
          }" style=${
            subindex == stateIdx ? "display:block" : "display:none"
          }><ul>${this.recursiveLayer(
            sub,
            idx + 1,
            this.state.secondIdx
          )}</ul></div></li>`;
          return str;
        }, "")
      : layer
          .map((cat: string) => `<li class="layer third"><a>${cat}</a>`)
          .join("");
  };

  template() {
    const { layers, layerSelected } = this.state;
    return `
        <h3></h3>
        <ul class="shopping-layer" style=${
          layerSelected ? "display:block" : "display:none"
        }>${this.recursiveLayer(layers)}
      </ul>
      `;
  }

  setEvent() {
    this.addEvent(
      "mouseenter",
      ".layer.first",
      ({ target }) => {
        const idx = Number(
          ((<HTMLElement>target).closest("li[data-idx]") as HTMLElement)
            ?.dataset.idx
        );
        this.throttle(() => this.setState({ firstIdx: idx }), 100);
      },
      true
    );
    this.addEvent(
      "mouseenter",
      ".layer.second",
      ({ target }) => {
        const idx = Number(
          ((<HTMLElement>target).closest("li[data-idx]") as HTMLElement)
            ?.dataset.idx
        );
        this.throttle(() => this.setState({ secondIdx: idx }), 100);
      },
      true
    );
    this.addEvent(
      "mouseleave",
      ".layer.first",
      ({ relatedTarget }) => {
        if ((<HTMLElement>relatedTarget).closest(".layer.first")) return;
        this.setState({ firstIdx: -1 });
      },
      true
    );
    this.addEvent(
      "mouseleave",
      ".layer.second",
      ({ relatedTarget }) => {
        if ((<HTMLElement>relatedTarget).closest(".layer.second")) return;
        this.setState({ secondIdx: -1 });
      },
      true
    );
  }
}
