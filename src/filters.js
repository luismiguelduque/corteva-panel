const filters = {
	arrayStringFilter: function (value) {
		if (!value) return ''
		if (value.length == 1) return value[0].name.charAt(0).toUpperCase() + value[0].name.slice(1)
		let arrayRoles = [];
		value.forEach(function(item) {
			arrayRoles.push(item.name.charAt(0).toUpperCase() + item.name.slice(1));
		});
		return arrayRoles.join(', ');
	},
	statusFilter: function (value) {
		if (!value) return ''
		switch (value) {
			case 1:
			  return 'active';
			case 2:
			  return 'locked';
			case 3:
			  return 'pending';
		}
		return 'pending';
	},
	resolveStatusVariantFilter: function (value) {
		if (value === 'pending') return 'light-warning'
		if (value === 'active') return 'light-success'
		if (value === 'locked') return 'light-danger'
		return 'primary'
	},
	dateFilter(date) {
		return date.slice(0, 10);
	}
}
export default (vm) => {
	Object.keys(filters).forEach(key => {
		vm.filter(key, filters[key])
	})
}