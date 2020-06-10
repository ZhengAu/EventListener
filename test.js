import { eventListener } from './EventListener.js';
import { MessageType } from './MessageType.js';


let testFun1 = function () {
	console.log(`testFun1...`);
};

function testFun2() {
	console.log(`testFun2...`);
}

console.log(`======================监听信息模块=============================`);
eventListener.addEventListener(MessageType.TYPE_TEST_1, testFun1);
eventListener.addEventListener(MessageType.TYPE_TEST_1, testFun2);
eventListener.triggerEventListener(MessageType.TYPE_TEST_1);

// ========================================================

const testFun3 = function () {
	console.log(`testFun3...`);
};

function testFun4() {
	console.log(`testFun4...`);
}

function myFunc() {
	console.log(`myFunc...`);
}

function myFunc2() {
	console.log(`myFunc2...`);
}

console.log(`=======================监听函数1============================`);
eventListener.observe(testFun3, myFunc);
eventListener.observe(testFun4, myFunc);
eventListener.trigger(testFun3);
eventListener.trigger(testFun4);

console.log(`=======================监听函数2============================`);

// 调用函数的时候触发自身
function testFun5() {
	eventListener.trigger(testFun5);
}

eventListener.associate(myFunc2, testFun3, testFun4, testFun5);
eventListener.trigger(testFun3);//出发myFunc2
eventListener.trigger(testFun4);//出发myFunc2
testFun5();//出发myFunc2

console.log(`=======================event============================`);
console.log(eventListener.events);