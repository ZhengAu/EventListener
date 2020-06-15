import { globalFunc } from './GlobalFunc';

class EventListener {
	public events: any = {};

	public constructor() {
		this.events = {};
	}

	/**
	 * @param key string
	 * @param func Function
	 * @param thisObj any
	 */
	public addEventListener(key: string, func: Function, thisObj: any) {
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

	/**
	 * @param key string
	 * @param params any[]
	 */
	public triggerEventListener(key: string, ...params: any[]) {
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

	/**
	 * @param key string
	 * @param func Function
	 */
	public removeEventListener(key: string, func: Function) {
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

	/**
	 * @param key string
	 */
	public removeEventListeners(key: string) {
		let funs = this.events[key];
		if (!funs) {
			return;
		}
		for (let fun of funs) {
			this.removeEventListener(key, fun);
		}
		delete this.events[key];
	}

	public removeAllEventListener() {
		let keys = Object.keys(this.events);
		for (let key of keys) {
			this.removeEventListeners(key);
			delete this.events[key];
		}
		this.events = {};
	}

	/**
	 * @param func Function
	 * @param thisObj any
	 * @param myFunc Function
	 */
	public observe(func: Function, thisObj: any, myFunc: Function) {
		let type = typeof func;
		if (type != 'function') {
			console.log(`observe 第一个参数不是 Function。`);
			return;
		}
		let funcFullName = globalFunc.getQualifiedFunctionName(func, thisObj);
		this.addEventListener(funcFullName, myFunc, this);
	}

	/**
	 * @param myFunc Function
	 * @param thisObj any
	 * @param params any[]
	 */
	public associate(myFunc: Function, thisObj: any, ...params: any[]) {
		for (let i = 0; i < params.length; i++) {
			this.observe(params[i], myFunc, thisObj);
		}
	}

	/**
	 * @param func Function
	 * @param thisObj any
	 */
	public trigger(func: Function, thisObj: any) {
		let type = typeof func;
		if (type != 'function') {
			console.log(`trigger 参数不是 Function。`);
			return;
		}
		let funcFullName = globalFunc.getQualifiedFunctionName(func, thisObj);
		this.triggerEventListener(funcFullName);
	}
}

export const eventListener = new EventListener();
