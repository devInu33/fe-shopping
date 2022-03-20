import Component from "../Core/Component.js";
import {store} from "../Core/Store.js";
import {Autocomplete} from "./Autocomplete.js";

export class SearchInput extends Component {
    static #recentItems = JSON.parse(localStorage.getItem('RECENT')) || [];
    #visitor = new Autocomplete();
    #keywordInput;
    #popup;
    #categories;
    #currentInput = "";

    constructor(target, props) {
        super(target, props);
        console.log(this.#visitor);
        this.#keywordInput = document.querySelector('input#searchKeyword');
        this.#popup = document.querySelector('#popupWords');
        this.#categories = document.querySelector('#searchCategories');
    }
    emptyresult(result) {
        result.innerHTML = `<h3>
                        <span>최근 검색어</span>
                    </h3>
                    <ol>
                        ${SearchInput.#recentItems.map(
            item => `<li><a>${item}</a><span>삭제</span></li>`
        ).join('')}
                    </ol>`
    }

    setEvent() {
        this.addEvent('blur', '#searchKeyword', e => {
            this.#popup.style.display = 'none';
        }, true)
        this.addEvent('focus', '#searchKeyword', (e) => {
            this.#popup.style.display = 'block';
        }, true)
        this.addEvent('keydown', '#searchKeyword', async e => {
            if ([38, 40].includes(e.keyCode)) {

            }
            const keyword = e.target.value;
        })
        this.addEvent('keyup', '#searchKeyword', e => {
            this.#currentInput = e.target.value;
            const autocomplete = document.querySelector('#autoComplete');
            if(!this.#currentInput)return this.emptyresult(autocomplete);
            const result =this.#visitor.autocomplete(this.#currentInput, `<strong>`, `</strong>`);
            console.log(result);
            autocomplete.innerHTML = result;
        })
        this.addEvent('submit', '#searchForm', e => {
            e.preventDefault();
            SearchInput.#recentItems.push(e.target.value);
            localStorage.setItem('RECENT', JSON.stringify(SearchInput.#recentItems));
        })
    }
}
