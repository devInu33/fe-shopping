



import View from "../Core/View.js";




export class Mainbanner extends View{
    initState() {
        return {selected:0}
    }
    template(){
        const {banner, sidebar,selected} = store.state;
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
    setEvent() {
        const {selected} = this.state;
        const spans = [...this.selectAll('.product_thumbnail')];
        const auto = ()=>this.setState({selected:selected===spans.length-1? 0:selected+1})
        this.startAuto(auto, 3000);
        this.addEvent('mouseover', 'span',(e) => {
            this.throttle(()=>this.setState({selected:parseInt(e.target.dataset.idx)}),100);
            this.startAuto(auto, 3000);
        }, 100);
    }
}
