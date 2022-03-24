import View from "../Core/View.js";
import { sources } from "../util.js ";

export class SearchPopup extends View {
  static #storageKey = Symbol.for("RECENT").toString();

  initState() {
    return {
      currentInput: "",
      recentItems:
        JSON.parse(localStorage.getItem(SearchPopup.#storageKey)) || [],
      words: sources.words,
      inputFocus: false,
    };
  }

  template() {
    const { inputFocus, currentInput, recentItems, words } = this.state;
    return `
        <form id="searchForm">                   
           <fieldset>
                    <legend>상품검색</legend>
                    <div class="searchForm">
                        <div class="select-category">
                            <a class="select-category__button"></a>
                            <a class="select-category__current">전체</a>
                        </div>
                        <select id="searchCategories">
                        </select>
                        
                        <label htmlFor="searchKeyword"><input id="searchKeyword" placeholder="찾고 싶은 상품을 검색해보세요!"
                                                             autoComplete="off"/></label>
                        <a class="speech-mic"></a>
                    </div>
                    <a id="searchBtn"></a>
                </fieldset>
                <div id="popupWords" style=${
                  inputFocus ? "display:block" : "display:none"
                }>
              </form>    
            <div id="autoComplete">
               ${
                 currentInput.length
                   ? words
                       .filter((word) => word.includes(currentInput))
                       .reduce((acc, cur) => {
                         const [front, back] = cur.split(currentInput.trim());
                         acc += `<a class="auto">${front}<strong>${currentInput}</strong>${back}</a>`;
                         return acc;
                       }, "")
                   : `<h3>
                <span>최근 검색어</span>
            </h3>
        <ol>
        ${recentItems
          .map(
            (item, idx) =>
              `<li data-idx=${idx}><a>${item}</a><span class="delete">삭제</span></li>`
          )
          .join("")}
        </ol>`
               }
        </div>
      </div>
        <div class="historyBtns">
        <span class="deleteAll"></span>
        <span class="historyonOff"></span>
    </div>
   `;
  }

  setEvent() {
    this.select("#searchKeyword").addEventListener("focusout", (e) => {
      this.state.inputFocus = false;
    });
    // this.addEvent(
    //   "focusout",
    //   "#searchKeyword",
    //   (e) => {
    //     console.log(e.target.id);
    //     this.state.inputFocus = false;
    //   },
    //   true
    // );

    this.addEvent(
      "focusin",
      "#searchKeyword",
      (e) => {
        this.state.inputFocus = true;
      },
      true
    );

    this.addEvent("keydown", "#searchKeyword", () => {});

    this.addEvent("input", "#searchKeyword", (e) => {
      console.log(e.target.value);
      this.state.currentInput = e.target.value;
    });

    this.addEvent("submit", "#searchForm", (e) => {
      e.preventDefault();
      const { currentInput, recentItems } = this.state;
      const newItems = [...recentItems];
      newItems.unshift(currentInput);
      localStorage.setItem(SearchPopup.#storageKey);
      this.state.recentItems = newItems;
    });
    this.addEvent("click", ".delete", (e) => {
      const { recentItems } = this.state;
      const newItems = [...recentItems];
      newItems.splice(parseInt(e.target.dataset.idx), 1);
      localStorage.setItem(
        SearchPopup.#storageKey,
        JSON.stringify(recentItems)
      );
      this.state.recentItems = newItems;
    });
  }
}
