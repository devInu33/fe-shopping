


import View from "../Core/View.js";

export class SearchPopup extends View {
    static #storageKey = Symbol.for('RECENT').toString()
    initState() {
        return {currentInput:"", recentItems:JSON.parse(localStorage.getItem(SearchPopup.#storageKey)) || []}
    }

    template() {
        const {currentInput, recentItems, inputFocus,words} = this.state;
        console.log(recentItems);
        return `
        <div id="popupWords" style=${inputFocus? "display:block":"display:none"}>
            <div id="autoComplete">
               ${currentInput? words.filter(word=>word.includes(currentInput)).reduce((acc, cur) => {
                const [front, back] = cur.split(currentInput.trim());
                acc += `<a class="auto">${front}<strong>${currentInput}</strong>${back}</a>`
                return acc;
            }, ""):
            `<h3>
                <span>최근 검색어</span>
            </h3>
        <ol>
        ${recentItems
        .map((item,idx) => `<li data-idx=${idx}><a>${item}</a><span class="delete">삭제</span></li>`)
        .join('')}
        </ol>`}
            </div>
        </div>
        <div class="historyBtns">
            <span class="deleteAll"></span>
            <span class="historyonOff"></span>
        </div>`;
    }

    setEvent() {
        const {recentItems, currentInput} = this.state;

        this.addEvent('keydown', '#searchKeyword', async e => {
        })
        this.addEvent('keyup', '#searchKeyword', e => {
            this.throttle(()=>this.setState({currentInput:e.target.value}), 500);
        })
        this.addEvent('submit', '#searchForm', e => {
            e.preventDefault();
            recentItems.unshift(currentInput);
            localStorage.setItem(SearchPopup.#storageKey, JSON.stringify(recentItems));
        });
        this.addEvent('click', '.delete', e=>{
            recentItems.splice(parseInt(e.target.dataset.idx), 1);
            localStorage.setItem(SearchPopup.#storageKey, JSON.stringify(recentItems));
        })
    }
}
