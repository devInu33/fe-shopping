import {Mainbanner} from "./components/Mainbanner.js";
import {SearchPopup} from "./components/SearchPopup.js";
import View from "./Core/View.js";
import {myFetch, Store} from "./Core/Store.js";
import {ModelVisitor} from "./Core/Visitor.js";



export class App extends View{
    template() {
       return `<div className="header">
            <article className="top-bar">
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
                    <div className="headerBar">
                        <h1>
                            <img src="https://image7.coupangcdn.com/image/coupang/common/logo_coupang_w350.png"/>
                        </h1>
                        <div className="product-search">
                        </div>
                        <ul className="icon-menus">
                            <li className="my-coupang more">
                                <span className="my-coupang-icon">&nbsp;</span>
                                <span className="my-coupang-title">마이쿠팡</span>
                            </li>
                            <li className="cart">
                                <span className="cart-icon">&nbsp;</span>
                                <span className="cart-title">장바구니</span>
                                <em id="headerCartCount">0</em>
                            </li>
                        </ul>
                    </div>
                    <ul className="gnbMenu">
                        <li className="rocket-delivery"><a>로켓배송</a></li>
                        <li className="rocket-fresh"><a>로켓프레시</a><i></i></li>
                        <li className="business-mall-landing"><a>쿠팡비즈</a><i></i></li>
                        <li className="coupang-global"><a>로켓직구</a></li>
                        <li><a>골드박스</a></li>
                        <li><a>와우회원할인</a></li>
                        <li><a>이벤트/쿠폰</a></li>
                        <li><a>기획전</a></li>
                        <li><a>여행/티켓</a></li>
                    </ul>
                </section>
                <div className="categoryBtn">
                    <a>카테고리</a>
                </div>
            </header>
        </div>
        <section className="banner">
        </section>
        <section>
            <section></section>
            <article></article>
        </section>`
    }
}

const app = new App(document.body)



export const store = new Store( app, new ModelVisitor());



