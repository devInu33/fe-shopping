import View from "../Core/View.js";

import {SearchPopup} from "./SearchPopup.js";

export class SearchForm extends View {
  static #storageKey = Symbol().toString();


  #popupWords = () => this.select("#popupWords");
  #autoComplete = () => this.select("#autoComplete");
  #recentItems = () => [
    ...JSON.parse(localStorage.getItem(SearchForm.#storageKey)),
  ];

  template() {
    const { inputFocus, currentInput, recentItems, words } = this.store.state;
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
                
              </form>    
            </div>
      </div>
        <div class="historyBtns">
        <span class="deleteAll"></span>
        <span class="historyonOff"></span>
    </div>
   `;
  }
  mount(){
    new SearchPopup(this.store, this.select('#popupWords'), this)
  }


  setEvent() {
    this.addEvent("focusout", "#searchKeyword", (e) => {

      this.#popupWords().style.display = "none";
    });

    this.addEvent("focusin", "#searchKeyword", (e) => {
      this.#popupWords().style.display = "block";
    });

    this.addEvent("keydown", "#searchKeyword", () => {});

    this.addEvent("input", "#searchKeyword", ({target:{value}}) => {
      const autoComplete = this.#autoComplete();
      this.store.setState({currentInput:value});
      autoComplete.className = value.length ? "auto" : null;
    });

    this.addEvent("submit", "#searchForm", (e) => {
      const {recentItems, currentInput} = this.store.state;
      const newItems = [...recentItems];
      newItems.unshift(currentInput);
      this.store.setState({recentItems:newItems})
      localStorage.setItem(SearchForm.#storageKey, JSON.stringify(newItems));
    });
    this.addEvent("click", ".delete", (e) => {
      console.log("hello");
      const {recentItems, currentInput} = this.store.state;
      const newItems = [...recentItems];
      newItems.splice(parseInt(e.target.dataset.idx), 1);
      this.store.setState({recentItems:newItems})
      localStorage.setItem(SearchForm.#storageKey, JSON.stringify(newItmes));
    });
  }
}

// 이벤트를 단다-> 타겟에 뭔가를 단다
