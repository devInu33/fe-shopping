import {store} from "../Core/Store.js";

export class Autocomplete{
    #words=store.state['words'];
    constructor() {
        Object.freeze(this);
    }
    autocomplete(input){
        const result =this.#words.filter(word=>word.includes(input));
        return result.length? `<h3>검색 결과가 없습니다.</h3>`: result.reduce((acc,cur)=>{
        const [front, back]=cur.split(input.trim());
            acc+=`<a class="auto">${front}<strong>${input}</strong>${back}</a>`
            return acc;
        }, "");
    }
}
