class GlobalFunc {

	/**
	 * 存在问题！！
	 * 如果在多个文件中存在同名函数，且都被监听了，显然是有问题的
	 * 应该加上文件前缀或类前缀
	 * @param {Function} func 
	 */
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

	/**
	 * 带有完整自定义的类名，自定义类名+函数名
	 * @param {Function} func 
	 * @param {any} obj 暂时只能传入自定义的类名，在类中传入 this（实例） 暂时无效
	 */
	getQualifiedFunctionName2(func, obj) {
		let prefixStr = '';
		if (obj) {
			let prefix = this.getQualifiedClassName(obj);
			if (prefix) {
				prefixStr = prefix + '.';
			}
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

	/**
	 * 获取自定义类的完整类名
	 * @param {any} obj 
	 */
	getQualifiedClassName(obj) {
		if (!obj || !obj.toString()) {
			return typeof obj;
		}

		let res = '';
		let str = obj.toString().trim();
		// console.log(str.toString(), str.indexOf('class'), str.indexOf('function'));

		if (str.indexOf('class') > -1) {
			res = str.substring(0, str.indexOf('{')).replace('class', '').trim();
		} else if (str.indexOf('function') > -1) {
			res = str.substring(0, str.indexOf('(')).replace('function', '').trim();
		} else {
			res = typeof obj;
		}
		return res;
	}

}

export const globalFunc = new GlobalFunc();
