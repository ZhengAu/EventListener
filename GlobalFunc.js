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

}

export const globalFunc = new GlobalFunc();
