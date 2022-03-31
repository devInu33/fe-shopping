import View from "../Core/View.js";
import { Store } from "../Core/Store";

export class SearchPopup extends View {
  static #storageKey = "RECENT";

  initState() {
    return {
      recentItems: JSON.parse(localStorage.getItem(Store.storageKey)) || [],
      currentInput: "",
      selected: -1,
      isArrowKey: false,
    };
  }

  template() {
    const { currentInput, recentItems, words, selected, isArrowKey } =
      this.store.state;
    isArrowKey
      ? this.store.unsubscribe("currentInput", this)
      : this.store.subscribe("currentInput", this);
    return `
                <div id="autoComplete">
                ${
                  currentInput.length
                    ? words
                        .filter((word) => word.includes(currentInput))
                        .reduce((acc, cur, idx) => {
                          const [front, back] = cur.split(currentInput.trim());
                          acc += `<a data-idx=${idx} class="auto" style=${
                            idx === selected ? "text-decoration:underline" : ""
                          }>${front}<strong>${currentInput}</strong>${back}</a>`;
                          return acc;
                        }, "")
                    : `<h3>
                <span>최근 검색어</span>
            </h3>
        <ol>${recentItems
          .map(
            (item, idx) =>
              `<li ><a data-idx=${idx} style=${
                idx === selected ? "text-decoration:underline" : ""
              }>${item}</a><span class="delete">삭제</span></li>`
          )
          .join("")}
        </ol> `
                }</div>`;
  }

  setEvent() {
    this.addEvent("click", ".delete", (e) => {
      const { recentItems, currentInput } = this.store.state;
      const newItems = [...recentItems];
      newItems.splice(parseInt(e.target.dataset.idx), 1);
      this.store.setState({ recentItems: newItems });
      localStorage.setItem(Store.storageKey, JSON.stringify(newItems));
    });
  }
}
