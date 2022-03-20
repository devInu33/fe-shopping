
export default class Component{
    #el;
    constructor(el) {
        this.#el = el;
        requestAnimationFrame(()=>{
            this.setEvent();
            this.render();
        })
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