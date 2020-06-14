import { globalFunc } from './GlobalFunc.js';
import { eventListener } from './EventListener.js';

class Test {
	postFunc() {
		//只能传入 Test，传入 this 暂时无效
		eventListener.newTrigger(this.postFunc, Test);
	}
	print() {

	}
}

function MyClass() {

}

function testFunc1() {
	console.log(`testFunc1...`);
}

// console.log(globalFunc.getQualifiedClassName(MyClass));	//MyClass
// console.log(globalFunc.getQualifiedClassName(Test));		//Test

// console.log(globalFunc.getQualifiedFunctionName2(testFunc1, MyClass));	//MyClass.testFunc1
// console.log(globalFunc.getQualifiedFunctionName2(testFunc1, Test));		//Test.testFunc1
// console.log(globalFunc.getQualifiedFunctionName2(testFunc1, this));		//testFunc1		this为undefined

console.log(`====================================`);

let t = new Test();
console.log(globalFunc.getQualifiedFunctionName2(t.postFunc, Test));
eventListener.newObserve(t.postFunc, Test, testFunc1);
t.postFunc();