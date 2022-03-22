import {observable} from "./observer";

export const myFetch = async (key)=>{
    const url = `http://127.0.0.1:3000/${key}`
    try {
        return await (await fetch(url)).json();
    }catch(e){
        throw e;
    }
}
 const sources = await myFetch('sources');

export class Store{
    #state;
    #currentObserver;
    #currentCallback=-1;
    state;
    constructor(state={}, view) {
        this.#state = observable(state);
    }
    get state(){
        return this.#state;
    }
    debounce= (fn)=>{
        return()=>{
            cancelAnimationFrame(this.#currentCallback);
            this.#currentCallback=requestAnimationFrame(fn);
        }
    }
    observe(fn){
        this.#currentObserver = this.debounce(fn);
        fn();
        this.#currentObserver = null;
    }
    addView(view){
        this.#state = {...this.#state, ...view.initState()};
        this.observe(()=>{
            view.setEvent();
            view.render();
        })
    }
    setState(newState){
        this.#state = {...this.#state, ...newState};
    }
}
export const store = new Store({
    banners:sources.banners, sidebar:sources.sidebar, words:sources.words,
})