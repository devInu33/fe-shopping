export const myFetch = async (key)=>{
    const url = `http://127.0.0.1:3000/${key}`
    try {
        return await (await fetch(url)).json();
    }catch(e){
        throw e;
    }
}
 const sources = await myFetch('sources');
console.log(sources);
export const store= {
    state:sources
}