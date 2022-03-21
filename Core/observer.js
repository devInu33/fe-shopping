
export const observable = function (obj, currentObserver) {
        const symbolMap = new Map;
        let id;
        const observeMap = Object.keys(obj).reduce((map, key)=>{
            return map.set(key, new Set())
        }, new Map())
        const isProxy = Symbol("isProxy")
        const handler = {
            get(target, name) {
                if(name===isProxy)return true;
                const prop = target[name];
                if (typeof prop == 'undefined') return
                if(!observeMap.has(name)) observeMap.set(name,new Set());
                if (currentObserver) observeMap.get(name).add(currentObserver)
                if (!prop.isProxy && typeof prop == 'object') target[name] = new Proxy(prop, handler)
                return target[name];
            },
            set(target, name, value) {
                if(target[name] === value)return true;
                target[name] = value
                const symbol = Symbol.for(name)
                if(!observeMap.has(symbol)) observeMap.set(name,new Set());
                observeMap.get(name).forEach(fn=>fn());
                return true;
            }
        }
        return new Proxy(obj, handler);
}

