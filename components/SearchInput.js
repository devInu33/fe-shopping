import Component from "../Core/Component.js";
import {store} from "../Core/Store.js";
import {Autocomplete} from "./Autocomplete.js";

export class SearchInput extends Component {
    static #storageKey = Symbol.for('RECENT').toString()
    static #recentItems = JSON.parse(localStorage.getItem(SearchInput.#storageKey)) || [];

    #visitor = new Autocomplete();
    #currentInput = "";
    #recentTemplate=`<h3>
               <span>최근 검색어</span>
            </h3>
            <ol>
            ${SearchInput.#recentItems
        .map((item,idx) => `<li data-idx=${idx}><a>${item}</a><span class="delete">삭제</span></li>`)
        .join('')}
            </ol>`;
    setup(){}
    constructor(el, input) {
        super(el, input);
        this.#currentInput = input;
    }
    template() {
        return `<form id="searchForm">
            <fieldset>
                <legend>상품검색</legend>
                <div class="searchForm">
                    <div class="select-category">
                        <a class="select-category__button"></a>
                        <a class="select-category__current">전체</a>
                    </div>
                    <select id="searchCategories">
                    </select>
                    <label htmlFor="searchKeyword"><input id="searchKeyword" placeholder="찾고 싶은 상품을 검색해보세요!" autocomplete="off"/></label>
                    <a class="speech-mic"></a>
                </div>
                <a id="searchBtn"></a>
            </fieldset>
        </form>
        <div id="popupWords">
            <div id="autoComplete">
               ${this.#recentTemplate}
            </div>
        </div>
        <div class="historyBtns">
            <span class="deleteAll"></span>
            <span class="historyonOff"></span>
        </div>`;
    }

    setEvent() {
        this.addEvent('blur', '#searchKeyword', e => {
            this.select('#popupWords').style.display = 'none';
        }, true)
        this.addEvent('focus', '#searchKeyword', (e) => {
            this.select('#popupWords').style.display = 'block';
        }, true)
        this.addEvent('keydown', '#searchKeyword', async e => {
            if ([38, 40].includes(e.keyCode)) {

            }
            const keyword = e.target.value;
        })
        this.addEvent('keyup', '#searchKeyword', e => {
            this.#currentInput = e.target.value;
            const result = this.#visitor.autocomplete(this.#currentInput);
            this.select('#autoComplete').innerHTML = result? result.reduce((acc, cur) => {
                const [front, back] = cur.split(this.#currentInput.trim());
                acc += `<a class="auto">${front}<strong>${this.#currentInput}</strong>${back}</a>`
                return acc;
            }, ""):this.#recentTemplate;
        })
        this.addEvent('submit', '#searchForm', e => {
            e.preventDefault();
            SearchInput.#recentItems.unshift(this.#currentInput);
            localStorage.setItem(SearchInput.#storageKey, JSON.stringify(SearchInput.#recentItems));
        });
        this.addEvent('click', '.delete', e=>{
            SearchInput.#recentItems.splice(parseInt(e.target.dataset.idx), 1);
            localStorage.setItem(SearchInput.#storageKey, JSON.stringify(SearchInput.#recentItems));
        })
    }
}
