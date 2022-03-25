import View from "../Core/View.js";

export class SearchPopup extends View {
    #storageKey = ()=>Symbol.for('RECENT').toString()

    initState() {
        return {recentItems: JSON.parse(localStorage.getItem('RECENT')) || [], currentInput: ""}
    }

    template() {
        const {currentInput, recentItems, words} = this.store.state
        return `
                <div id="autoComplete">
                ${currentInput.length ? words
                    .filter((word) => word.includes(currentInput))
                    .reduce((acc, cur) => {
                        const [front, back] = cur.split(currentInput.trim());
                        acc += `<a class="auto">${front}<strong>${
                            currentInput
                        }</strong>${back}</a>`;
                        return acc;
                    }, "") :
                `<h3>
                <span>최근 검색어</span>
            </h3>
        <ol>${recentItems
                    .map(
                        (item, idx) =>
                            `<li data-idx=${idx}><a>${item}</a><span class="delete">삭제</span></li>`
                    )
                    .join("")}
        </ol> `}
            < /div>`

    }

    setEvent() {
        this.addEvent("click", ".delete", (e) => {
            console.log("hello");
            const {recentItems, currentInput} = this.store.state;
            const newItems = [...recentItems];
            newItems.splice(parseInt(e.target.dataset.idx), 1);
            this.store.setState({recentItems: newItems})
            localStorage.setItem('RECENT', JSON.stringify(newItems));
        });
    }
}