import {Mainbanner} from "./components/Mainbanner.js";

const data = await fetch('/sources.json').then(res=>res.json())



const banner = document.querySelector('.banner')
let curr =banner.firstElementChild;
data['banner'].map(url=>{curr.src=url;curr=curr.nextElementSibling;})
const imgs = document.querySelectorAll('.thumbnail img');
imgs.forEach((img,idx)=>img.src=data['sidebar'][idx]);

export const addEvent = (target,eventType,selector,callback)=>{
    const children = [...target.querySelectorAll(selector)];
    const ok= (eventTarget)=>children.includes(eventTarget)||eventTarget.closest(selector);
    target.addEventListener(eventType, (event)=>{
        if(!ok(event.target))return false;
        callback(event);
    })
}
new Mainbanner();


