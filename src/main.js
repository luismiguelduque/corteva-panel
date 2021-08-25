import Vue from 'vue'
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { verifyRole } from './verifyRole'

import i18n from '@/libs/i18n'
import filters from './filters'
import router from './router'
import store from './store'
import App from './App.vue'
import mixins from '@/mixins'

// Axios Mock Adapter
import '@/@fake-db/db'

// Global Components
import './global-components'

// 3rd party plugins
import '@/libs/portal-vue'
import '@/libs/toastification'

// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)

//Filters
Vue.use(filters)

// Composition API
Vue.use(VueCompositionAPI)

// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')

Vue.config.productionTip = false

//Router
// navigation guards before each
router.beforeEach((to, from, next) => {
	if (to.matched.some((record) => record.meta.requiresAuth)) {
	// this route requires auth, check if logged in
	// if not, redirect to login page.
		if (localStorage.getItem('accessToken') === null) {
			Vue.prototype.$notify('Un error ha ocurrido', 'Unauthenticated', 'XCircleIcon', 'danger');
			next({
				path: "/login",
				query: { redirect: to.fullPath },
			});
		}else{
			if(verifyRole(to.meta.roles)){
				next();
			}else{
				Vue.prototype.$notify('Un error ha ocurrido', 'Not authorized', 'XCircleIcon', 'danger');
				next({
					path: "/",
					query: { redirect: to.fullPath },
				});
			}
		}
	} else {
		next(); // make sure to always call next()!
	}
});

Vue.prototype.$notify = function(title, text, icon, variant) {
	this.$toast({
		component: ToastificationContent,
		props: {
			title: title ? title : 'Alerta',
			text: text ? text : 'Un error ha ocurrido',
			icon: icon ? icon : 'AlertTriangleIcon',
			variant: variant ? variant : 'warning',
		},
	})
}

Vue.prototype.$handleSuccessResponse = function(response, message = null) {
	message = message ? message : "Acción realizada correctamente.";
	var { result = message } = response.data;
	if (response && result) {
	  this.$notify('Éxito!', result, 'CheckCircleIcon', 'success');
	}
 };

Vue.prototype.$handleErrorResponse = function(error, retry = true) {
	error = this.parseError(error);
	if (error) {
		if (this.isRetrievable(error) && retry) {
			this.$notify('Un error ha ocurrido', error.message, 'XCircleIcon', 'danger');
			throw error;
		} else {
			this.$notify('Un error ha ocurrido', error.message, 'XCircleIcon', 'danger');
			if (error.errors) {
			const keys = Object.keys(error.errors);
			keys.forEach((k) => {
				(error.errors[k] || []).forEach((element) => {
					if (element) {
					this.$notify('Un error ha ocurrido', element, 'AlertTriangleIco', 'warning');
					}
				});
			});
			}
		}
	}
};

new Vue({
	router,
	store,
	i18n,
	render: h => h(App),
}).$mount('#app')
