import {ModelVisitor} from "./Visitor.js";
import {App} from "../app.js";
import {EventHandler} from "./EventHandler.js";

export class Store {
    #state = {};
    state;
    #subscriber = new Map;
    #handler = new EventHandler();

    //구독하면=> subscriber 추가
    //구독해지하면 subscriber 제거
    //this.state 변경하면=> subscriber 셋을 전부 setState
    constructor(state={}) {
        this.#state = this.observe(state);
        this.state = new Proxy(state, {get: (target, name) => this.#state[name]})
    }

    addView(view) {
        Object.entries(view.initState()).forEach(([key, value]) => {
            this.#state[key] = value;
            this.subscribe(key, view);
        })
        console.log(this.state);
    }

    subscribe(key, view) {
        if (this.#subscriber.has(key)) this.#subscriber.get(key).add(view)
        else {
            this.#subscriber.set(key, new Set().add(view))
        }
    }

    unsubscribe(key, view) {
        if (!this.#subscriber.has(key)) return;
        this.#subscriber.get(key).delete(view);
    }

    observe(state) {

        // const isProxy = Symbol("isProxy");
        const handler = {
            get: (target, name, receiver) => {
                // if (name === isProxy) return true;
                const prop = Reflect.get(target, name, receiver);
                if (typeof prop === "undefined") return;
                // if (!prop.isProxy && typeof prop == "object")
                //   return new Proxy(prop, handler);
                return prop;
            },
            set: (target, name, value) => {
                if (target[name] == value) return true;
                Reflect.set(target, name, value);
                if (this.#subscriber.has(name)) this.#subscriber.get(name).forEach(view => view.setState({[name]: target[name]}));
                return true;
            },
        };
        return new Proxy(state, handler);
    }

    setState(newState) {
        for (const [key, value] of Object.entries(newState)) {
            if (!this.#state[key]) return
            this.#state[key] = value
        }
    }
}
