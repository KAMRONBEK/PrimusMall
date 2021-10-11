export const getObjectProperty = (obj, path) => {
	if (!obj || !path) {
		return null;
	}
	let paths = path.split(".");
	let temp = obj;
	for (let key of paths) {
		if (!temp[key]) {
			return null;
		}
		temp = temp[key];
	}
	return temp;
};

export let normalizeFilters = data => {
	return Object.keys(data).reduce((prev, key) => {
		/**
		 * Specific to the case where object contains key and boolen for value pairs @note like {[id]:[slug]:bool}
		 */
		let str = "";
		if (typeof data[key] === "object") {
			Object.keys(data[key]).forEach(id => {
				if (typeof data[key][id] === "object")
					Object.keys(data[key][id]).forEach((element, index) => {
						str += `${key}[${id}][${index}]=${element || ""}&`;
					});
				else {
					str += `${key}[${id}]=${data[key][id]}&`;
				}
			});
			return prev + str;
		}
		//* This ternary removes the undefined value from filter
		return `${prev + key}=${data[key] ? data[key] : ""}&`;
	}, "?");
};

export let removeKeyFromObject = (obj, keyToDelete) => {
	return Object.keys(obj).reduce((prev, current, index) => {
		if (keyToDelete !== current)
			return { ...prev, [current]: obj[current] };
		return prev;
	}, {});
};
