import {observable} from "./observer.js";
import {delay} from "../util.js";
import {EventHandler} from "./EventHandler.js";
import {Store, store} from "./Store";

export default class View{
    #el;
    #handler= new EventHandler();
    #model;
    #events;
    constructor( el) {
        this.#el=el;
        store.addView(this);
    }
    throttle(fn,time){this.#handler.throttle(fn,time);}
    debounce(fn,delay){this.#handler.debounce(fn,delay);}
    startAuto(fn,delay){this.#handler.startAuto(fn,delay())}
    initState(){}
    render(){this.#el.innerHTML=this.template();}
    template(){return ``}
    setEvent(){}

    addEvent (eventType,selector,callback, capture=false){
        const children = [...this.#el.querySelectorAll(selector)];
        const ok= (eventTarget)=>eventTarget.closest(selector)||children.includes(eventTarget);
        this.#el.addEventListener(eventType, (event)=>{
            if(!ok(event.target))return false;
            callback(event);
        }, capture)
    }
    select(selector){return this.#el.querySelector(selector);}
    selectAll(selector){return this.#el.querySelectorAll(selector);}

}



