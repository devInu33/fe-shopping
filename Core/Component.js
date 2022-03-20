
export default class Component{
    $target;
    $props;
    $state;
    constructor(target,props) {
        this.$target=target;
        this.$props=props;
        requestAnimationFrame(()=>{
            this.setup();
            this.setEvent();

        })
    }
    // render(){this.$target.innerHTML=this.template();}
    template(){return ``}
    setup(){}
    setEvent(){
    }
    // setState(newState){this.$state = {...this.$state, ...newState}; }
    addEvent(eventType,selector,callback, capture=false){
        const children = [...this.$target.querySelectorAll(selector)];
        const ok= (eventTarget)=>eventTarget.closest(selector)||children.includes(eventTarget);
        this.$target.addEventListener(eventType, (event)=>{
            if(!ok(event.target))return false;
            callback(event);
        }, capture)
    }
}