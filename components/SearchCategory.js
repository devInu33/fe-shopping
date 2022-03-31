import View from "../Core/View.js";
import { sources } from "../util.js";

export class SearchCategory extends View {
  initState() {
    return {
      selectedCategory: sources.categories[0],
      categories: sources.categories,
      isOpened: false,
    };
  }

  template() {
    const { selectedCategory, categories, isOpened } = this.store.state;
    return `
            <a class="select-category__button"></a>
            <a class="select-category__current">${selectedCategory}</a>     
            <ul class="shopping-list" style=${
              isOpened ? "display:block" : "display:none"
            }>
            ${categories
              .map(
                (cat) =>
                  `<li class="cat-item">
                <a>${cat}</a>
              </li>`
              )
              .join("")}
            </ul> 
        `;
  }

  setEvent() {
    this.addEvent("click", ".cat-item", (e) => {
      this.store.setState({
        selectedCategory: e.target.textContent,
        isOpened: false,
      });
    });
  }
}
