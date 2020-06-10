import { globalFunc } from './GlobalFunc.js';

class EventListener {
	constructor() {
		this.events = {};
	}

	addEventListener(key, func, thisObj) {
		if (!this.events[key]) {
			this.events[key] = [];
		}
		let funs = this.events[key];
		for (let i = 0; i < funs.length; i++) {
			if (funs[i] == func) {
				return;
			}
		}
		this.events[key].push(func);
	}

	triggerEventListener(key, ...params) {
		let funs = this.events[key];
		if (!funs || !funs.length) {
			return;
		}
		for (let i = 0; i < funs.length; i++) {
			let item = funs[i];
			if (!item) {
				funs.splice(i, 1);
				i--;
				continue;
			}
			item.apply(this, params);
		}
	}

	removeEventListener(key, func) {
		let funs = this.events[key];
		if (!funs || !funs.length) {
			return;
		}
		for (let i = 0; i < funs.length; i++) {
			let item = funs[i];
			if (item == func) {
				//防止数组坍塌，先置空；在触发的时候再删除
				funs[i] = null;
				break;
			}
		}
	}

	removeEventListeners(key) {
		let funs = this.events[key];
		if (!funs) {
			return;
		}
		for (let fun of funs) {
			this.removeEventListener(key, fun);
		}
		delete this.events[key];
	}

	removeAllEventListener() {
		let keys = Object.keys(this.events);
		for (let key of keys) {
			this.removeEventListeners(key);
			delete this.events[key];
		}
		this.events = {};
	}

	/**
	 * @param {Function} func 监听的函数
	 * @param {Function} myFunc 自定义函数
	 */
	observe(func, myFunc) {
		let type = typeof func;
		if (type != 'function') {
			console.log(`observe 第一个参数不是 Function。`);
			return;
		}
		let funcFullName = globalFunc.getQualifiedFunctionName(func);
		this.addEventListener(funcFullName, myFunc, this);
	}

	/**
	 * @param {Function} myFunc 自定义函数
	 * @param  {...any} params 监听的函数数组
	 */
	associate(myFunc, ...params) {
		for (let i = 0; i < params.length; i++) {
			this.observe(params[i], myFunc);
		}
	}

	/**
	 * @param {Function} func 监听的函数
	 */
	trigger(func) {
		let type = typeof func;
		if (type != 'function') {
			console.log(`trigger 参数不是 Function。`);
			return;
		}
		let funcFullName = globalFunc.getQualifiedFunctionName(func);
		this.triggerEventListener(funcFullName);
	}

}

export const eventListener = new EventListener();