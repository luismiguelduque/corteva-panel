import webServices from '../../../webServices';
import router from '@/router';

export default {
	namespaced: true,
	state: {
		user:           JSON.parse(localStorage.getItem('user')),
		accessToken:    localStorage.getItem('accessToken'),
		roles:          localStorage.getItem('roles'),
	},
	getters: {
		getAccessToken: state => {
			return state.accessToken;
		},
		getUserLoggedIn: state => {
			return state.user;
		},
		getRolesUserLoggedIn: state => {
			return state.roles;
		},
	},
	mutations: {
		SET_AUTH(state, value){
			state.user = value.user;
			localStorage.setItem('user', JSON.stringify(state.user));
			state.accessToken = value.token;
			localStorage.setItem('accessToken', state.accessToken);
			let arrayRoles = [];
			state.user.roles.forEach(function(item) {
				arrayRoles.push(item.name);
			});
			state.roles = arrayRoles;
			localStorage.setItem('roles', arrayRoles);
		},
		SET_USER_FRESH(state, value){
			state.user = value;
			localStorage.setItem('user', JSON.stringify(value));
		},
		LOGOUT(state) {
			state.user = {};
			localStorage.removeItem('user');
			state.accessToken = null;
			localStorage.removeItem('accessToken');
			state.roles = [];
			localStorage.removeItem('roles');
			setTimeout(() => router.replace('/login'), 1000);
		},
	},
	actions: {
		async login(context, data) {
			return await new Promise((resolve, reject) => {
				webServices.post('auth/login', data, { headers: {'Accept': 'application/json',}})
					.then(response => {
						context.commit('SET_AUTH', response.data.data);
						resolve(response);
					}).catch(error => {
						reject(error)
					});
			})
		},
		async logout(context, data) {
			return await new Promise((resolve, reject) => {
				webServices.post('auth/logout', {}, {headers: {'Accept': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`},})
					.then(response => {
						context.commit('LOGOUT');
						resolve(response);
					}).catch(error => {
						if (error.response.status && error.response.status == 401){
							context.commit('LOGOUT');
						}
						reject(error);
					});
			})
		},
		async me(context, data) {
			return await new Promise((resolve, reject) => {
				webServices.get('auth/me', {}, {headers: {'Accept': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`},})
					.then(response => {
						resolve(response);
					}).catch(error => {
						if (error.response.status && error.response.status == 401){
							context.commit('LOGOUT');
						}
						reject(error);
					});
			})
		},
		async changePassword(context, data) {
			return await new Promise((resolve, reject) => {
				webServices.post('auth/change-password', data, {headers: {'Accept': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`},})
					.then(response => {
						resolve(response);
					}).catch(error => {
						if (error.response.status && error.response.status == 401){
							context.commit('LOGOUT');
						}
						reject(error)
					});
			})
		},
		async register(context, data) {
			return await new Promise((resolve, reject) => {
				webServices.post('/auth/register', data, { headers: {'Accept': 'application/json',}})
					.then(response => {
						context.commit('SET_AUTH', response.data.data);
						resolve(response);
					}).catch(error => {
						reject(error)
					});
			})
		},
   },
}
