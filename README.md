# EventListener

This EventListener can oberve the function by its name.

## Usage

### Usage1

In **MessageType.js** , your can add the unique key in it. Then get the instance of EventListener, use **addEventListener** to observe your function.

```js
// MessageType.js
export class MessageType {

	static TYPE_TEST_1 = 'TYPE_TEST_1';

}

// test.js
let testFun1 = function () {
	console.log(`testFun1...`);
};

function testFun2() {
	console.log(`testFun2...`);
}

eventListener.addEventListener(MessageType.TYPE_TEST_1, testFun1);
eventListener.addEventListener(MessageType.TYPE_TEST_1, testFun2);
eventListener.triggerEventListener(MessageType.TYPE_TEST_1);

```

### Usage2

You can observe a function which have listen to its special name. Use the **EventListener.observe** to observe a function, in this special function, it will get the function name from **GlobalFunc.getQualifiedFunctionName**, and the observe it. Lastly, use **EventListener.trigger** to trigger the function.

```js
// GlobalFunc.js
class GlobalFunc {

	getQualifiedFunctionName(func) {
		if (!func || typeof func !== 'function') {
			console.error(`传入参数不对 --- ${func}`);
			return typeof func;
		}
		if (func.name) {
			return func.name;
		}

		let prototype = func.prototype ? func.prototype : Object.getPrototypeOf(func);
		if (prototype && prototype.constructor.name) {
			return prototype.constructor.name;
		}

		let constructorString = prototype.constructor.toString().trim();
		let index = constructorString.indexOf('(');
		let className = constructorString.substring(9, index);

		Object.defineProperty(prototype, '__class__', {
			value: className,
			enumerable: false,
			writable: true,
		});
		return className ? className : 'anonymous';
	}

}

export const globalFunc = new GlobalFunc();

// test.js
function myFunc() {
	console.log(`myFunc...`);
}

function myFunc2() {
	console.log(`myFunc2...`);
}

eventListener.observe(myFunc2, myFunc);
eventListener.trigger(myFunc2);//trigger this function

function testFunc1() {
    eventListener.trigger(testFunc1);//trigger this function when call the function 
}
eventListener.observe(testFunc1, myFunc);
testFunc1();

```

## Other

I hope this can help.
