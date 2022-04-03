import View from "./View";

export class Visitor<T> {
  visit(action: any, target: T) {
    throw "Override";
  }
}

// export class ModelVisitor extends Visitor<View> {
//   visit(action: any, target: View) {
//     action(target);
//     const stack = [];
//     let curr = target.head;
//     if (curr == View.EMPTY) return;
//     do {
//       action(curr);
//       if (curr.head) stack.push(curr.head);
//       if (curr.next) stack.push(curr.next);
//     } while ((curr = stack.pop())!=View.EMPTY);
//   }
// }
