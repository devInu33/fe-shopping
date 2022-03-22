import View from "../Core/View.js";


class SearchInput extends View{
    initState() {
        return {inputFocus:false}
    }
    template(){
            return `<form id="searchForm">
                <fieldset>
                    <legend>상품검색</legend>
                    <div class="searchForm">
                        <div class="select-category">
                            <a class="select-category__button"></a>
                            <a class="select-category__current">전체</a>
                        </div>
                        <select id="searchCategories">
                        </select>
                        <label htmlFor="searchKeyword"><input id="searchKeyword" placeholder="찾고 싶은 상품을 검색해보세요!"
                                                              autoComplete="off"/></label>
                        <a class="speech-mic"></a>
                    </div>
                    <a id="searchBtn"></a>
                </fieldset>
            </form>`
        }
        setEvent() {
            this.addEvent('blur', '#searchKeyword', e => {
                this.setState({inputFocus:false})
            }, true)
            this.addEvent('focus', '#searchKeyword', (e) => {
                this.setState({inputFocus:true});
            }, true)
        }
}