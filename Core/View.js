
import {delay} from "../util.js";
import {EventHandler} from "./EventHandler.js";
import {Store} from "./Store.js";
import {ModelVisitor} from "./Visitor.js";

export default class View{
    #el;
    #handler= new EventHandler();
    #store =null;
    #willRender=true;
    parent=null;
    next=null;
    child=null;
    constructor(el, parent=undefined ) {
        this.#el=el;
        // console.log(this.#el);
        parent? parent.setChild(this):this.store = new Store(this,new ModelVisitor())
        this.#store.addState(this);
    }
    initStore(){
        this.#store.addState()
    }
    setChild(view){
        this.child?this.child.setNext(view):this.child=view
        view.parent = this;
        view.store = this.#store;
        return this;
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
    set store(v){
        this.#store = v;

    }
    get state(){
        return this.#store.getState(this);
    }
    throttle=(fn,time)=>this.#handler.throttle(fn,time);
    debounce= (fn)=>this.#handler.debounce(fn);
    startAuto=(fn,delay)=>this.#handler.startAuto(fn,delay);
    initState(){return {}}
    mount(){}
    render(){
        if(this.#willRender) {
            this.#handler.debounce(()=>{
                this.#el.innerHTML = this.template()
            });
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
    select(selector){return selector?this.#el.querySelector(selector):this.#el;}
    selectAll(selector){return this.#el.querySelectorAll(selector);}
}



