import View from "../Core/View.js";

export class SearchCategory extends View {

    template() {
        return `
            <a class="select-category__button"></a>
            <a class="select-category__current">전체</a>        
        `
    }

}