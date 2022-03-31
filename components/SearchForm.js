import View from "../Core/View.js";

import { SearchPopup } from "./SearchPopup.js";
import { SearchCategory } from "./SearchCategory.js";
import { Store } from "../Core/Store";

export class SearchForm extends View {
  #popupWords = () => this.select("#popupWords"); //필드 바인딩 문제 때문에 람다로 사용했습니다.
  #autoComplete = () => this.select("#autoComplete");

  template() {
    return `
        <form id="searchForm">                   
           <fieldset>
                    <legend>상품검색</legend>
                    <div class="searchForm">  
                        <div class="select-category">
                        </div>
                        <label for="searchKeyword"><input id="searchKeyword" placeholder="찾고 싶은 상품을 검색해보세요!" autoComplete="off"/></label>
                        <a class="speech-mic"></a>
                    </div>
                    <a id="searchBtn"></a>
                </fieldset>
                <div id="popupWords" style="display:none">
                </div>
              </form>    
            </div>
      </div>
        <div class="historyBtns">
        <span class="deleteAll"></span>
        <span class="historyonOff"></span>
    </div>
   `;
  }

  mount() {
    new SearchPopup(this.store, this.select("#popupWords"), this);
    new SearchCategory(this.store, this.select(".select-category"), this);
  }

  setEvent() {
    this.addEvent(
      "focus",
      "#searchKeyword",
      (e) => {
        this.#popupWords().style.display = "block";
      },
      true
    );
    this.addEvent("click", ".select-category", (e) => {
      const { isOpened } = this.store.state;
      this.store.setState({ isOpened: !isOpened });
    });
    this.addEvent("keyup", "#searchKeyword", (e) => {
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return false;
      const { selected } = this.store.state;
      const items = [...this.selectAll("a[data-idx]")];
      this.store.setState({ isArrowKey: true });
      return e.key === "ArrowUp"
        ? selected === -1
          ? false
          : ((e.target.value = items[selected - 1].textContent),
            this.store.setState({ selected: selected - 1, isArrowKey: false }))
        : selected === items.length - 1
        ? false
        : ((e.target.value = items[selected + 1].textContent),
          this.store.setState({ selected: selected + 1, isArrowKey: false }));
    });

    this.addEvent("input", "#searchKeyword", ({ target: { value } }) => {
      const autoComplete = this.#autoComplete();
      this.store.setState({ currentInput: value });
      autoComplete.className = value.length ? "auto" : null;
    });

    this.addEvent("submit", "#searchForm", (e) => {
      e.preventDefault();
      const { recentItems, currentInput } = this.store.state;
      if (!currentInput) return false;
      const newItems = [...recentItems];
      newItems.unshift(currentInput);
      this.store.setState({ recentItems: newItems });
      localStorage.setItem(Store.storageKey, JSON.stringify(newItems));
    });
  }
}

// 이벤트를 단다-> 타겟에 뭔가를 단다
