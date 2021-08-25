import webServices from '../../../webServices';

export default {
   namespaced: true,
   state: {
   	usersList: [],
		user: {},
   },
   getters: {
		usersList: state => {
			return state.usersList;
		},
		user: state => {
			return state.user;
		},
    },
   mutations: {
      SET_USERS_LIST(state, val) {
         state.usersList = val;
      },
		SET_USER(state, val) {
         state.user = val;
      },
    },
   actions: {
		async getUsersList(context, data) {
			return await new Promise((resolve, reject) => {
				webServices.get('users?role_name='+data.role_name, {headers: {'Accept': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`},})
					.then(response => {
						context.commit('SET_USERS_LIST', response.data.data);
						resolve(response);
					}).catch(error => {
						if (error.response.status && error.response.status == 401){
							context.commit('appAuth/LOGOUT', null, { root: true });
						}
						reject(error);
					});
			})
		},
		async storeUser(context, data) {
			return await new Promise((resolve, reject) => {
				webServices.post('users', data, {headers: {'Accept': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`},})
					.then(response => {
						resolve(response);
					}).catch(error => {
						if (error.response.status && error.response.status == 401){
							context.commit('appAuth/LOGOUT', null, { root: true });
						}
						reject(error);
					});
			})
		},
		async getUser(context, data) {
			return await new Promise((resolve, reject) => {
				webServices.get('users/'+data, {headers: {'Accept': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`},})
					.then(response => {
						context.commit('SET_USER', response.data.data);
						resolve(response);
					}).catch(error => {
						if (error.response.status && error.response.status == 401){
							context.commit('appAuth/LOGOUT', null, { root: true });
						}
						reject(error);
					});
			})
		},
		async updateUser(context, data) {
			return await new Promise((resolve, reject) => {
				webServices.post('users-update/', data, {headers: {'Accept': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`},})
					.then(response => {
						resolve(response);
					}).catch(error => {
						if (error.response.status && error.response.status == 401){
							context.commit('appAuth/LOGOUT', null, { root: true });
						}
						reject(error);
					});
			})
		},
		async deleteUser(context, data) {
			return await new Promise((resolve, reject) => {
				webServices.delete('users/'+data, {headers: {'Accept': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`},})
					.then(response => {
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
