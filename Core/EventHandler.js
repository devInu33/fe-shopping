import {delay} from "../util.js";

export class EventHandler{
    #throttle;
    #currentCallback=-1;
    #prev;
    debounce(fn, delay){
        return ()=>{
            cancelAnimationFrame(this.#currentCallback);
            this.#currentCallback = requestAnimationFrame(fn);
        }
    }
    throttle(fn,time){
        if(this.#throttle===true)return false;
        this.#throttle = true;
        delay(time).then(()=>this.#throttle=false)
        fn();
    }
    startAuto(fn,delay){
        cancelAnimationFrame(this.#currentCallback);
        this.#currentCallback = requestAnimationFrame(time=>this.auto(time,fn,delay))
    }
    auto= (time, fn,delay)=>{
        if(time-this.#prev>=delay){
            this.#prev=time;
            fn();
        }else{ cancelAnimationFrame(this.#currentCallback)}
        this.#currentCallback = requestAnimationFrame(time=>this.auto(time,fn,delay))
    }
}
// 자동이벤트->디바운스 딜레이가 잇음
// 쓰로틀에는->딜레이가 잇음