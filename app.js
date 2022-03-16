import {Mainbanner} from "./components/Mainbanner.js";


const banner = document.querySelector('.banner')
let curr =banner.firstElementChild;
data['banner'].map(url=>{curr.src=url;curr=curr.nextElementSibling;})
const imgs = document.querySelectorAll('.thumbnail img');
imgs.forEach((img,idx)=>img.src=data['sidebar'][idx]);


new Mainbanner();


