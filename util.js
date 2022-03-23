export const delay = time=>new Promise(res=>setTimeout(res, time));

export const myFetch = async (key)=>{
    const url = `http://127.0.0.1:3000/${key}`
    try {
        return await (await fetch(url)).json();
    }catch(e){
        throw e;
    }
}
export const sources = await myFetch('sources');