
class Visitor {
    visit(action, target) {
        throw "Override";
    }
}

export class ModelVisitor extends Visitor {
    visit(action, target) {
        action(target);
        const stack= [];
        let curr = target.child;
        if(!curr)return;
        do{
            action(curr);
            if(curr.child) stack.push(curr.child);
            if(curr.next)stack.push(curr.next);
        }while((curr=stack.pop()));
    }
}