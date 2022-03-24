import View from "../Core/View.js";
import { el, sources } from "../util.js ";

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

  #popupWords = () => this.select("#popupWords");
  #autoComplete = () => this.select("#autoComplete");
  #recentItems = () => [
    ...JSON.parse(localStorage.getItem(SearchPopup.#storageKey)),
  ];
  #currentInput;
  #noword = () => `     <h3>
                <span>최근 검색어</span>
            </h3>
        <ol>
        ${this.#recentItems()
          .map(
            (item, idx) =>
              `<li data-idx=${idx}><a>${item}</a><span class="delete">삭제</span></li>`
          )
          .join("")}
        </ol>`;

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
                        
                        <label for="searchKeyword"><input id="searchKeyword" placeholder="찾고 싶은 상품을 검색해보세요!"
                                                            autoComplete="off"/></label>
                        <a class="speech-mic"></a>
                    </div>
                    <a id="searchBtn"></a>
                </fieldset>
                <div id="popupWords" style="display:none">
                <div id="autoComplete">
                           <h3>
                <span>최근 검색어</span>
            </h3>
        <ol>
        ${recentItems
          .map(
            (item, idx) =>
              `<li data-idx=${idx}><a>${item}</a><span class="delete">삭제</span></li>`
          )
          .join("")}
        </ol>
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

  autoComplete(input) {
    const { words } = this.state;
    return words
      .filter((word) => word.includes(this.#currentInput))
      .reduce((acc, cur) => {
        const [front, back] = cur.split(this.#currentInput.trim());
        acc += `<a class="auto">${front}<strong>${
          this.#currentInput
        }</strong>${back}</a>`;
        return acc;
      }, "");
  }

  setEvent() {
    this.addEvent("focusout", "#searchKeyword", (e) => {
      this.#popupWords().style.display = "none";
    });

    this.addEvent("focusin", "#searchKeyword", (e) => {
      this.#popupWords().style.display = "block";
    });

    this.addEvent("keydown", "#searchKeyword", () => {});

    this.addEvent("input", "#searchKeyword", (e) => {
      this.#currentInput = e.target.value;
      const autoComplete = this.#autoComplete();
      console.log(autoComplete);
      autoComplete.innerHTML = this.#currentInput.length
        ? this.autoComplete(this.#currentInput)
        : this.#noword();
      autoComplete.className = this.#currentInput.length ? "auto" : null;
    });

    this.addEvent("submit", "#searchForm", (e) => {
      e.preventDefault();
      const newItems = [...this.#recentItems()];
      newItems.unshift(this.#currentInput);
      localStorage.setItem(SearchPopup.#storageKey, JSON.stringify(newItems));
    });
    this.addEvent("click", ".delete", (e) => {
      console.log("hello");
      const newItmes = [...this.#recentItems()];
      newItmes.splice(parseInt(e.target.dataset.idx), 1);
      localStorage.setItem(SearchPopup.#storageKey, JSON.stringify(newItmes));
    });
  }
}

// 이벤트를 단다-> 타겟에 뭔가를 단다
