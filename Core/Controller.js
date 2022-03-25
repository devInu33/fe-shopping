class Controller{

    #head
    constructor(views) {

    }
    setup(){
    }
    setRecentItem= (item)=>{
        const items = [,,,JSON.parse(localStorage.getItem(Controller.#storageKey))]
        items.unshift(item)
        localStorage.setItem(Controller.#storageKey,JSON.stringify(items))
    }
    deleteRecentItem=(idx)=>{
        const items = [,,,JSON.parse(localStorage.getItem(Controller.#storageKey))]
        items.splice(idx,1);
        localStorage.setItem(Controller.#storageKey,JSON.stringify(items))
    }
    getRecentItem=()=>{
        return localStorage.getItem(Controller.#storageKey)
    }
    changeBanner=(spans, imgs, prev,next)=> {
        spans[prev].classList.remove("selected");
        imgs[prev].classList.remove("selected");
        prev = next;
        spans[prev].classList.add("selected");
        imgs[prev].classList.add("selected");
    }
    autoComplete= (words,input)=> {
        return words
            .filter((word) => word.includes(input))
            .reduce((acc, cur) => {
                const [front, back] = cur.split(input.trim());
                acc += `<a class="auto">${front}<strong>${
                    input
                }</strong>${back}</a>`;
                return acc;
            }, "");
    }

}