
import Component from "../Core/Component.js";
import {delay} from "../util.js";
import {store} from "../Core/Store.js";

export class Mainbanner extends Component{
    #prev=performance.now();
    #current;
    #inited=false;
    #selected=0;
    render(){this.$target.innerHTML=this.template();}
    constructor(target,props) {
        super(target,props);
        requestAnimationFrame(()=>this.render())
    }
    template(){
        const {banner, sidebar} = store.state //json()
        const selected = this.#selected;
        return ` ${banner.map((img,idx)=>`<img class="main_bg ${idx===selected? "selected":""}" src="${img}" >`).join('')}     
        <div class="selected-product">
            <div class="image-container">
                <a></a>
                <a></a>
                <a></a>
                <a></a>
            </div>
            <ul class="thumbnail">
            ${sidebar.map((img,idx)=>`<li><a><img  src="${img}"/><span class="product_thumbnail ${idx===selected?"selected":""}" data-idx=${idx}  ></span></a></li>`).join('')}
            </ul>
        </div>
        `
    }
    change(index){
        const imgs = [...this.$target.querySelectorAll('.main_bg')];
        const spans = [...this.$target.querySelectorAll('.product_thumbnail')];
        imgs[this.#selected].style.display='none';
        spans[this.#selected].style.border = '1px solid #fff';
        this.#selected= index;
        imgs[this.#selected].style.display='block';
        spans[this.#selected].style.border = '2px solid #4285f4';
    }
    setEvent() {
        this.addEvent('mouseover', 'span',(e) => {
            if(this.#inited===true)return false;
            this.#inited = true;
            this.change(parseInt(e.target.dataset.idx));
            cancelAnimationFrame(this.#current);
            this.#current = requestAnimationFrame(f);
            delay(100).then(()=>this.#inited=false)
        });
        const f = (time) => {
            const spans = [...this.$target.querySelectorAll('.product_thumbnail')];
            if (time - this.#prev >= 3000) {
                this.#prev = time;
                this.change(this.#selected===spans.length-1? 0 :this.#selected+1);
            } else {
                cancelAnimationFrame(this.#current);
            }
            this.#current = requestAnimationFrame(f);
        }
        this.#current = requestAnimationFrame(f)
    }
}