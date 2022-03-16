
export default class Component{
    $target;
    $props;
    $state;
    constructor(target,props) {
        this.$target=target;
        this.$props=props;
        this.setup();
        this.setEvent();
        this.render();
    }
    render(){this.$target.innerHTML=this.template();}
    template(){return ``}
    setup(){}
    setEvent(){
    }
    setState(newState){this.$state = {...this.$state, newState}; this.render();}
    addEvent(target,eventType,selector,callback){
        const children = [...target.querySelectorAll(selector)];
        const ok= (eventTarget)=>children.includes(eventTarget)||eventTarget.closest(selector);
        target.addEventListener(eventType, (event)=>{
            if(!ok(event.target))return false;
            callback(event);
        })
    }
}