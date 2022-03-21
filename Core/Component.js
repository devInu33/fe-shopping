import {observable} from "./observer.js";
import {delay} from "../util.js";
import {EventHandler} from "./EventHandler";

export default class Component{
    #el;
    #state;
    handler = new EventHandler();
    #currentInput;
    constructor( el, input) {
        this.#el=el;
        requestAnimationFrame(()=>{
            this.setup()
            this.setEvent();
            this.render();
        })

    }
    setup(props){
        Object.entries(props).forEach(([key,value])=>this.#state[key]=value)
    }
    render(){this.#el.innerHTML=this.template();}
    template(){return ``}
    setEvent(){
    }
    select(selector){return this.#el.querySelector(selector);}
    selectAll(selector){return this.#el.querySelectorAll(selector);}
    addEvent(eventType,selector,callback, capture=false){
        const children = [...this.#el.querySelectorAll(selector)];
        const ok= (eventTarget)=>eventTarget.closest(selector)||children.includes(eventTarget);
        this.#el.addEventListener(eventType, (event)=>{
            if(!ok(event.target))return false;
            callback(event);
        }, capture)
    }
}


class Scanner{
    #currentObserver;

    observe(callback){
        this.#currentObserver = this.debounce(callback);
    }
}


