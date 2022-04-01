import View from "../Core/View.js";
import {sources, stateObj} from "../util.js";

type Layer = Record<string, Record<string, string[]> | string[]>;

export class Megadrop extends View {
    initState() {
        return {
            layers: sources["smartlayer"],
            layerSelected: false,
            firstIdx: -1,
            secondIdx: -1,
        };
    }

    //3단 객체
    //
    template() {
        const {layers, layerSelected, firstIdx, secondIdx} = this.state;
        return `
        <h3></h3>
        <ul class="shopping-layer" style=${
            layerSelected ? "display:block" : "display:none"
        }>
        ${Object.entries(layers as Layer)
            .map(
                ([cat, sub], idx1) =>
                    `<li  data-idx=${idx1} ><a class="layer first">${cat}</a><div class="depth second" style=${
                        idx1 === firstIdx ? "display:block" : "display:none"
                    }><div><ul>${Object.entries(sub)
                        .map(
                            ([cat, sub], idx2) =>
                                `<li  data-idx=${idx2}><a class="layer second">${cat}</a><div class="depth third" style=${
                                    idx2 === secondIdx ? "display:block" : "display:none"
                                }><ul>${sub
                                    .map(
                                        (cat: string) => `<li class="layer third"><a>${cat}</a>`
                                    )
                                    .join("")}</ul></div></li>`
                        )
                        .join("")}</ul></div></div></li>`
            )
            .join("")}
      </ul>
      `;
    }

    setEvent() {
        this.addEvent(
            "mouseenter",
            ".layer.first",
            ({target}) => {
                const idx = Number(
                    ((target as HTMLElement).closest("li[data-idx]") as HTMLElement)
                        ?.dataset.idx
                );
                this.throttle(() => this.setState({firstIdx: idx}), 100);
            },
            true
        );
        this.addEvent(
            "mouseenter",
            ".layer.second",
            ({target}) => {
                const idx = Number(
                    ((target as HTMLElement).closest("li[data-idx]") as HTMLElement)
                        ?.dataset.idx
                );
                this.throttle(() => this.setState({secondIdx: idx}), 100);
            },
            true
        );
        this.addEvent(
            "mouseleave",
            ".layer.first",
            ({relatedTarget}) => {
                if ((<HTMLElement>relatedTarget).closest(".layer.first")) return false;
                this.setState({firstIdx: -1});
            },
            true
        );
        this.addEvent(
            "mouseleave",
            ".layer.second",
            ({relatedTarget}) => {
                if ((<HTMLElement>relatedTarget).closest(".layer.second")) return false;
                this.setState({secondIdx: -1});
            },
            true
        );
    }
}
