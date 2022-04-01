export const delay = (time: number) =>
  new Promise((res) => setTimeout(res, time));

export const myFetch = async (key: string) => {
  const url = `http://127.0.0.1:3000/${key}`;
  try {
    return await (await fetch(url)).json();
  } catch (e) {
    throw e;
  }
};
export const sources = await myFetch("sources");

export type stateObj = Record<string | symbol, any>;
