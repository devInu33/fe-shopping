import Component from "../Core/Component";

class SearchInput{
    static #recentItems = new Set;
    items = new Set;
    currentInput = this.el.value;
    el;
    constructor(){
        SearchInput.#recentItems = [...JSON.parse(localStorage.getItem('RECENT'))]
        this.items = new Set;
    }
    search(){

    }
    setEvent(){

    }
}