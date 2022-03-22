
import {delay} from "../util.js";
import {EventHandler} from "./EventHandler.js";
import {Store} from "./Store.js";

export default class View{
    #el;
    #handler= new EventHandler();
    #store =null;
    #willrender=true;
    parent;
    next=null;
    child=null;
    constructor(el, parent=undefined, ) {
        this.#el=el;
        if(parent){
            parent.setChild(this)
        }
        this.render();
    }
    set store(v){
        this.#store = v;
    }
    get state(){
        return this.#store.state;
    }
    setChild(view){
        if(this.child)this.child.setNext(view)
        else{this.child=view}
        view.parent = this;
        return this;
    }
    setNext(view){
        let curr= this;
        while(curr.next){curr = curr.next;}
        curr.next = view;
    }
    setState(newState){
        this.#willrender=true;
        this.#store.setState(newState)
    }

    throttle=(fn,time)=>this.#handler.throttle(fn,time);
    debounce= (fn)=>this.#handler.debounce(fn);
    startAuto=(fn,delay)=>this.#handler.startAuto(fn,delay());
    initState(){return {}}
    render(){

        if(this.#willrender) {
            this.debounce(() => this.#el.innerHTML = this.template());
            this.#willrender=false;
        }
        if(this.next)this.next.render();
        if(this.child)this.child.render();
    }

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
    select(selector){return selector?this.#el.querySelector(selector):this.#el;}
    selectAll(selector){return this.#el.querySelectorAll(selector);}
}



