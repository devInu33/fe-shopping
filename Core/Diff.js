function updateElement(parent,newNode, oldNode){
    if(oldNode && !newNode){return oldNode.remove();}
    if(!oldNode && newNode){return parent.appendChild(newNode)}
    if(newNode instanceof Text && oldNode instanceof Text){
        if(oldNode.value===newNode.value) return;
        oldNode.value=newNode.value;
        return;
    }
    if (newNode.nodeName !== oldNode.nodeName) {
        return(parent.insertBefore(newNode, oldNode), oldNode.remove())
    }
    updateAttributes(oldNode,newNode);
    const newChildren = [...newNode.children];
    const oldChildren= [...oldNode.children];
    const max = Math.max(newChildren.length, oldChildren.length);
    //태그 이름이 같을경우 oldNode는 교체하지 않고 자식만 재귀
    for(let i=0; i<max; i++){updateElement(oldNode, newNode[i], oldNode[i])}
}

function updateAttributes(oldNode, newNode) {
    const oldProps = [ ...oldNode.attributes ];
    const newProps = [ ...newNode.attributes ];
    for (const {name, value} of newProps) {
        if (value === oldNode.getAttribute(name)) continue;
        oldNode.setAttribute(name, value);
    }
    for (const {name} of oldProps) {
        if (newNode.hasAttribute(name)) continue;
        oldNode.removeAttribute(name);
    }
}