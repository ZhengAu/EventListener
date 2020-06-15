class GlobalFunc {
	/**
	 *
	 * @param func Function
	 * @param thisObj any
	 */
	public getQualifiedFunctionName(func: Function, thisObj: any): string {
		let prefixStr: string = '';
		if (thisObj) {
			let prefix = this.getQualifiedClassName(thisObj);
			prefixStr = prefix ? prefix + '.' : '';
		}

		if (!func || typeof func !== 'function') {
			console.error(`传入参数不对 --- ${func}`);
			return prefixStr + typeof func;
		}
		if (func.name) {
			return prefixStr + func.name;
		}

		let prototype = func.prototype ? func.prototype : Object.getPrototypeOf(func);
		if (prototype && prototype.constructor.name) {
			return prefixStr + prototype.constructor.name;
		}

		let constructorString = prototype.constructor.toString().trim();
		let index = constructorString.indexOf('(');
		let className = constructorString.substring(9, index);

		Object.defineProperty(prototype, '__class__', {
			value: className,
			enumerable: false,
			writable: true,
		});
		return className ? prefixStr + className : prefixStr + 'anonymous';
	}

	public getQualifiedClassName(thisObj: any): string {
		if (!thisObj || !(thisObj as string).toString()) {
			return typeof thisObj;
		}

		let res = '';
		let str = thisObj.toString().trim();

		if (str.indexOf('class') > -1) {
			res = str.substring(0, str.indexOf('{')).replace('class', '').trim();
		} else if (str.indexOf('function') > -1) {
			res = str.substring(0, str.indexOf('(')).replace('function', '').trim();
		} else {
			res = typeof thisObj;
		}
		return res;
	}
}

export const globalFunc = new GlobalFunc();
