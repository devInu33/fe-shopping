
const data = await fetch('/sources.json').then(res=>res.json())

const images = document.querySelectorAll('.banner .main_bg')

const banner = document.querySelector('.banner')
let curr =banner.firstElementChild;
data['banner'].map(url=>{curr.src=url;curr=curr.nextElementSibling;})
const imgs = document.querySelectorAll('.thumbnail img');
imgs.forEach((img,idx)=>img.src=data['sidebar'][idx]);

const addEvent = (target,eventType,selector,callback)=>{
    const children = target.querySelectorAll(selector);
    const ok= (eventTarget)=>children.includes(eventTarget)||eventTarget.closest(selector);
    target.addEventListener(eventType, (eventTarget)=>{
        if(!ok)return false;
        callback(eventTarget);
    })
}

const spans = document.querySelectorAll('.thumbnail span');
const notHover = spans[0].style.border;
console.log(spans);
const onHover= `2px solid #4285f4;`;
let callback;
let i=0;
let prev = performance.now();
const animation = ()=>{
    const f = (time)=>{
        if(time-prev>=3000) {
            prev = time;
            const images = banner.querySelectorAll('.main_bg');
            images[i].style.display = 'none';
            spans[i].style.border = notHover;
            i++;
            if (i > images.length - 1) i = 0;
            images[i].style.display = 'block'
            spans[i].style.border= onHover;
        }else{
            cancelAnimationFrame(callback);
        }
        callback = requestAnimationFrame(f);
    }
    callback = requestAnimationFrame(f)
}
animation();

