import {ModelVisitor} from "./Visitor.js";
import {App} from "../app.js";
import {EventHandler} from "./EventHandler.js   ";


// 렌더링하려면
// 1.store가 생성되어 있어함
// 2. 부모가 렌더링 되어 있어야함.
// 마운트를 해야하는 타이밍


export class Store{
    #state= new WeakMap ;
    #head;
    #visitor;
    #handler = new EventHandler();

    constructor(visitor) {
        this.#visitor= visitor;
    }
    getState(view){
        return this.#state.get(view);
    }
    addView(view){
        if(!this.#head)this.#head = view;
        if(this.#state.has(view))return
        this.#state.set(view, view.initState());
    }
    setState(newState, view){
        const oldstate =this.#state.get(view);
        this.#state.set(view, {...oldstate,...newState});
        this.#head.render()
    }
}


// view를 데코레이터 패턴으로 연결.
// render() 호출 시, store에서 헤더에 view를 넘기고 연쇄 render()
// 이 때 render를 하냐 마냐는 자신에게 상태변화가 일어났느냐 안일어났느냐에 따라결정
// 인자로 this를 넘긴다? 좋지 않음. 전역 store를 언제 어디서 호출할지 모름.