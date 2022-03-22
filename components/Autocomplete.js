import {store} from "../Core/Store.js";

class Visitor{

}

export  class Autocomplete{
    #words=store.state['words'];
    constructor() {
        Object.freeze(this);
    }
    autocomplete(input){
        if(!input) return;
        else return this.#words.filter(word=>word.includes(input));
    }
}
