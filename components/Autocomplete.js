import {store} from "../Core/Store.js";

export function Autocomplete(){
    this.reEsc = /[\\^$.*+?()[\]{}|]/g;
    this.reChar = /[가-힣]/;
    this.reJa = /[ㄱ-ㅎ]/, this.offset = 44032;
    this.con2syl = Object.fromEntries('ㄱ:가,ㄲ:까,ㄴ:나,ㄷ:다,ㄸ:따,ㄹ:라,ㅁ:마,ㅂ:바,ㅃ:빠,ㅅ:사'.split(",").map(v=>{
        const entry = v.split(":");
        entry[1] = entry[1].charCodeAt(0);
        return entry;
    }));
    this.words = store.state.words;
    Object.freeze(this);
}

Autocomplete.prototype.chToRegex=function(ch){
    let r;
    const reEsc=this.reEsc;
    const reChar=this.reChar,reJa=this.reJa, con2syl=this.con2syl, offset=this.offset;
    if(reJa.test(ch)){
        const begin = con2syl[ch] || ((ch.charCodeAt(0)-12613)*588 + con2syl['ㅅ']);
        const end = begin+587;
        r = `[${ch}\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
    }else if(reChar.test(ch)){
        const chCode = ch.charCodeAt(0)-offset;
        if(chCode%28>0)return ch;
        const begin = Math.floor(chCode / 28) * 28 + offset;
        const end = begin + 27;
        r = `[\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
    }else r = ch.replace(reEsc,'\\$&');
    return `(${r})`;
}
Autocomplete.prototype.createMatcher= function(input){
    const pattern = input.split('').map(word=>this.chToRegex(word)).map(word=>'('+word+')').join('.*?');
    return new RegExp(pattern);
}
Autocomplete.prototype.autocomplete = function(input, sTag, eTag){
    const regex = this.createMatcher(input);
    const tagLen = sTag.length+eTag.length
    return this.words.reduce((acc,curr)=>{
        const matches = regex.exec(curr);
        if(matches) acc.push(this.matcher(curr,matches,sTag,eTag,tagLen));
        return acc;
    },[]).map(word=>`<a class="auto">${word}</a>`).join('')

}
Autocomplete.prototype.matcher = (v, matches, sTag, eTag, tagLen)=>{
    let last = 0; //2-1. 변형 문자열 기준 마지막 위치
    let acc = v; //최종 문자열
    for(let i = 1, j = matches.length; i < j; i++){
        const curr = matches[i];
        last = acc.indexOf(curr, last); //2-2. 변형 문자열 기준 현재 문자열 일치 위치
        acc = `${acc.substring(0, last)}${sTag}${curr}${eTag}${acc.substr(last + 1)}`; //최종 문자열 갱신
        last += tagLen; //2-5. 태그를 포함한 다음 인덱스 시작 위치
    }
    return acc

}