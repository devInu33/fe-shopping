import Component from "../Core/Component";

class SearchInput extends Component {
    static #recentItems = new Set;
    items = new Set;
    el;
    currentInput = this.el.value;

    setup() {
        this.$state = {
            currentInput: this.$target.querySelector('#searchKeyword').value,
            recentItems: JSON.parse(localStorage.getItem('RECENT')),
        }
    }

    constructor() {
        super();
        SearchInput.#recentItems = [...JSON.parse(localStorage.getItem('RECENT'))]
        this.items = new Set;
    }

    search() {
    }

    template() {
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
                            ${store.categories.map(category => `
                                <option></option>   
                            `)}
                        </select>
                        <label for="searchKeyword"><input id="searchKeyword" placeholder="찾고 싶은 상품을 검색해보세요!"/></label>
                        <a class="speech-mic"></a>
                    </div>
                    <a id="searchBtn" ></a>
                </fieldset>
            </form>
            <div id="popupWords">
                <div id="autoComplete">
                    ${this.$state.currentInput?
            store.words.filter((word) => {
                return word.match(new RegExp("^" + this.currentInput, "i"));
            }).slice(20).map(word=>`<a>${word}</a>`):
                    `<h3>
                        <span>최근 검색어</span>
                    </h3>
                    <ol>
                        ${this.$state.recentItems.map(
                            item=> `<li><a></a><span>삭제</span></li>`   
                        )}
                    </ol>`
            }
                </div>
            </div>
            <div class="historyBtns">
                <span class="deleteAll"></span>
                <span class="historyonOff"></span>
            </div>
        `
    }


    setEvent() {
        this.addEvent('blur', 'input', e => {

        })
        this.addEvent('focus', 'input', (e) => {

        })
        this.addEvent('keydown', 'input', async e => {
            if ([38, 40].includes(e.keyCode)) {

            }
            const keyword = e.target.value;
            const words = await (await fetch('../sources.json')).json();
            this.items.clear();
            this.items = new Set(words.filter((word) => {
                return word.match(new RegExp("^" + this.currentInput, "i"));
            }).slice(20))
        })
    }
}