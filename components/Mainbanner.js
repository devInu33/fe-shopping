
import Component from "../Core/Component.js";
import {delay} from "../util.js";
import {store} from "../Core/Store.js";

export class Mainbanner extends Component{
    #prev=performance.now();
    #current;
    #throttle=false;
    #selected=0;
    template(){
        const {banner, sidebar} = store.state;
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
        const imgs = [...this.selectAll('.main_bg')];
        const spans = [...this.selectAll('.product_thumbnail')];
        imgs[this.#selected].style.display='none';
        spans[this.#selected].style.border = '1px solid #fff';
        this.#selected= index>=spans.length? 0: index;
        imgs[this.#selected].style.display='block';
        spans[this.#selected].style.border = '2px solid #4285f4';
    }
    setEvent() {
        this.handler.startAuto(()=>this.change(this.#selected+1), 3000);
        this.addEvent('mouseover', 'span',(e) => {
            this.handler.throttle(()=>this.change(parseInt(e.target.dataset.idx)),100);
            this.handler.startAuto(()=>this.change(this.#selected+1), 3000);
        }, 100);
    }
}