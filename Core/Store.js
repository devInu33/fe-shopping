import {ModelVisitor} from "./Visitor.js";
import {App} from "../app.js";
import {EventHandler} from "./EventHandler.js   ";


export const myFetch = async (key)=>{
    const url = `http://127.0.0.1:3000/${key}`
    try {
        return await (await fetch(url)).json();
    }catch(e){
        throw e;
    }
}


export class Store{
    #state= new WeakMap ;
    #head;
    #visitor;
    #handler = new EventHandler();
    constructor( head,visitor) {
        this.#head = head;
        this.#visitor= visitor;
        this.addState();
    }
    getState(view){
        return this.#state.get(view);
    }
    throttle=(fn,time)=>this.#handler.throttle(fn,time);
    debounce= (fn)=>this.#handler.debounce(fn);
    startAuto=(fn,delay)=>this.#handler.startAuto(fn,delay);
    addState(){
        this.#visitor.visit((view)=>{
            this.#state.set(view, view.initState())
            // this.#state={...this.#state, ...view.initState()};
            view.store = this;
        }, this.#head);
        this.#head.render();
    }
    setState(newState, view){
        const oldstate =this.#state.get(view);
        this.#state.set(view, {...oldstate,...newState});
        this.#handler.debounce(()=>this.#head.render());
    }
}


// view를 데코레이터 패턴으로 연결.
// render() 호출 시, store에서 헤더에 view를 넘기고 연쇄 render()
// 이 때 render를 하냐 마냐는 자신에게 상태변화가 일어났느냐 안일어났느냐에 따라결정
// 인자로 this를 넘긴다? 좋지 않음. 전역 store를 언제 어디서 호출할지 모름.