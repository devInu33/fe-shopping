export const delay = (time) => new Promise((res) => setTimeout(res, time));

export const myFetch = async (key) => {
  const url = `./express-server/static/${key}.json`;
  try {
    return await (await fetch(url)).json();
  } catch (e) {
    throw e;
  }
};
export const sources = await myFetch("sources");

export const el = (el, attr = {}) =>
  Object.entries(attr).reduce(
    (acc, v) => {
      typeof acc[v[0]] == "function" ? acc[v[0]](v[1]) : (acc[v[0]] = v[1]);
      return acc;
    },
    el instanceof HTMLElement ? el : document.createElement(el)
  );
