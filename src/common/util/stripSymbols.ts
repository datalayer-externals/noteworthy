type ExcludeSymbolKeys<T extends Object> = { [K in keyof T] : T[K] extends symbol ? never : T[K] } 

/**
 * Returns a shallow copy of `obj` which exlcudes any keys of `symbol` type.
 * 
 * @warning this function may be a source of unsoundess -- if a bug is traced
 *    back to this function later, check for missing or undefined fields.
 *    https://github.com/microsoft/TypeScript/issues/1863#issuecomment-689028589
 *    https://github.com/microsoft/TypeScript/issues/35101
 *    https://stackoverflow.com/a/55012175/1444650
 */
export function stripSymbols<T extends object>(obj: T): ExcludeSymbolKeys<T> {
	let result: any = {};

	// (see links below for discussion about efficiency, typings, and alternatives)
	// https://stackoverflow.com/questions/56321094/whats-the-most-efficient-way-to-remove-all-symbols-from-an-object
	for(let prop in obj) {
		if(obj.hasOwnProperty(prop)){
			result[prop] = obj[prop];
		}
	}

	return result;
}