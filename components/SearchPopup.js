import View from "../Core/View.js";

export class SearchPopup extends View {
  initState() {
    return {
      recentItems: JSON.parse(localStorage.getItem("RECENT")) || [],
      currentInput: "",
      selected: -1,
    };
  }

  *unsubscribe(key) {
    yield this.store.unsubscribe(key);
  }

  template() {
    const { currentInput, recentItems, words, selected } = this.store.state;
    return `
                <div id="autoComplete">
                ${
                  currentInput.length
                    ? words
                        .filter((word) => word.includes(currentInput))
                        .reduce((acc, cur, idx) => {
                          const [front, back] = cur.split(currentInput.trim());
                          acc += `<a data-idx=${idx} class="auto ${
                            idx === selected ? "selected" : ""
                          }">${front}<strong>${currentInput}</strong>${back}</a>`;
                          return acc;
                        }, "")
                    : `<h3>
                <span>최근 검색어</span>
            </h3>
        <ol>${recentItems
          .map(
            (item, idx) =>
              `<li ><a data-idx=${idx} class=${
                idx === selected ? "selected" : ""
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
      localStorage.setItem("RECENT", JSON.stringify(newItems));
    });
  }
}
