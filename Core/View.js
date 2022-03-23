
import {delay} from "../util.js";
import {EventHandler} from "./EventHandler.js";
import {Store} from "./Store.js";
import {ModelVisitor} from "./Visitor.js";

export default class View{
    #el;
    #handler= new EventHandler();
    #store =null;
    #willRender=true;
    parent;
    next=null;
    child=null;
    constructor( store=undefined, selector=undefined ,parent=undefined,) {
        if(store){
            this.#store = store;
            this.#store.addView(this)
        }
        if(parent) {
            parent.setChild(this)
        }
        this.#el = parent? parent.select(selector):document.querySelector(selector);
        this.setEvent();
        this.render();

    }
    setChild(view){
        this.child?this.child.setNext(view):this.child=view
        view.parent = this;
    }
    setNext(view){
        let curr= this;
        while(curr.next){curr = curr.next;}
        curr.next = view;
    }
    setState(newState){
        this.#willRender=true;
        this.#store.setState(newState, this)
    }
    get state(){
        return this.#store.getState(this);
    }

    throttle(fn,time){this.#handler.throttle(fn,time)}
    debounce(fn){this.#handler.debounce(fn);}
    startAuto(fn,delay){this.#handler.startAuto(fn,delay);}
    initState(){return {}}
    render(){
        if(this.#willRender) {
            this.#el.innerHTML = this.template()
            this.#willRender=false;
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
    select(selector){return this.#el.querySelector(selector)}
    selectAll(selector){return this.#el.querySelectorAll(selector);}
}



