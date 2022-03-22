
export const observable = function (obj, currentObserver) {
        const symbolMap = new Map;
        let id;
        const observeMap = Object.keys(obj).reduce((map, key)=>{
            map[key] = obj[key];
            return map
        }, {})
        const isProxy = Symbol("isProxy")
        const handler = {
            get(target, name) {
                if(name===isProxy)return true;
                const prop = target[name];
                if (typeof prop == 'undefined') return;
                observeMap[name] = observeMap[name] || new Set();
                if (currentObserver) observeMap[name].add(currentObserver)
                if (!prop.isProxy && typeof prop == 'object') target[name] = new Proxy(prop, handler)
                return target[name];
            },
            set(target, name, value) {
                if(target[name] === value)return true;
                target[name] = value
                const symbol = Symbol.for(name)
                if(!observeMap[name]) {
                    observeMap[name] = new Set()
                    return true;
                }
                observeMap[name].forEach(fn=>fn());
                return true;
            }
        }
        return new Proxy(obj, handler);
}

