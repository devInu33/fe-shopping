import { Mainbanner } from "./components/Mainbanner.js";

import View from "./Core/View.js";
import { Store } from "./Core/Store.js";

import { SearchForm } from "./components/SearchForm.js";

import { Megadrop } from "./components/Megadrop.js";

export class App extends View {
  template() {
    return `<div class="header">
            <article class="top-bar">
                <section>
                    <menu id="subscriberMenu">
                        <li id="fav">즐겨찾기</li>
                        <li id="vender-join">입점신청</li>
                    </menu>
                    <menu id="headerMenu">
                        <li id="login">로그인</li>
                        <li id="join">회원가입</li>
                        <li id="cs-center">고객센터</li>
                    </menu>
                </section>
            </article>
            <header id="header">
                <section>
                    <div class="headerBar">
                        <h1>
                            <img src="https://image7.coupangcdn.com/image/coupang/common/logo_coupang_w350.png"/>
                        </h1>
                        <div class="product-search">         
                        </div>
                        <ul class="icon-menus">
                            <li class="my-coupang more">
                                <span class="my-coupang-icon">&nbsp;</span>
                                <span class="my-coupang-title">마이쿠팡</span>
                            </li>
                            <li class="cart">
                                <span class="cart-icon">&nbsp;</span>
                                <span class="cart-title">장바구니</span>
                                <em id="headerCartCount">0</em>
                            </li>
                        </ul>
                    </div>
                    <ul class="gnbMenu">
                        <li class="rocket-delivery"><a>로켓배송</a></li>
                        <li class="rocket-fresh"><a>로켓프레시</a><i></i></li>
                        <li class="business-mall-landing"><a>쿠팡비즈</a><i></i></li>
                        <li class="coupang-global"><a>로켓직구</a></li>
                        <li><a>골드박스</a></li>
                        <li><a>와우회원할인</a></li>
                        <li><a>이벤트/쿠폰</a></li>
                        <li><a>기획전</a></li>
                        <li><a>여행/티켓</a></li>
                    </ul>
                </section>
                <div class="categoryBtn">
                    <a>카테고리</a>
                    <div class="category-layer"></div>
                </div>
            </header>
        </div>
        <section class="banner">
        </section>
        <section>
            <section></section>
            <article></article>
        </section>`;
  }

  mount() {
    new Mainbanner(this.store, <HTMLElement>this.select(".banner"), this);
    new SearchForm(
      this.store,
      <HTMLElement>this.select(".product-search"),
      this
    );
    new Megadrop(this.store, <HTMLElement>this.select(".category-layer"), this);
  }

  setEvent() {
    this.addEvent("click", "body", ({ target }) => {
      if (
        (<HTMLElement>target).closest(".product-search") ||
        (<HTMLElement>target).closest(".select-category")
      )
        return;
      else (<HTMLElement>this.select("#popupWords")).style.display = "none";
    });
    this.addEvent(
      "mouseenter",
      ".categoryBtn",
      (e) => {
        this.setState({ layerSelected: true });
      },
      true
    );
    this.addEvent(
      "mouseleave",
      ".categoryBtn",
      ({ relatedTarget }) => {
        if ((<HTMLElement>relatedTarget).closest(".categoryBtn")) return;
        this.setState({ layerSelected: false });
      },
      true
    );
  }
}

const store = new Store();
const app = new App(store, document.body);
