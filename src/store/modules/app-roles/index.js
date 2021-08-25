import webServices from '../../../webServices';

export default {
	namespaced: true,
	state: {
		rolesList: [],
	},
	getters: {
		rolesList: state => {
			return state.rolesList;
		},
	},
	mutations: {
		SET_ROLES_LIST(state, val) {
			state.rolesList = val;
		},
	},
	actions: {
		async getRolesList(context, data) {
			return await new Promise((resolve, reject) => {
				webServices.get('roles', {headers: {'Accept': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`},})
					.then(response => {
						context.commit('SET_ROLES_LIST', response.data.data);
						resolve(response);
					}).catch(error => {
						if (error.response.status && error.response.status == 401){
							context.commit('appAuth/LOGOUT', null, { root: true });
						}
						reject(error);
					});
			})
		},
	},
}
