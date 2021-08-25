import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	scrollBehavior() {
		return { x: 0, y: 0 }
	},
	routes: [
		{
			path: '/',
			name: 'dashboard',
			component: () => import('@/views/dashboard/Dashboard.vue'),
			meta: {
				pageTitle: 'dashboard',
				requiresAuth: true,
				roles: ['admin', 'guest'],
				breadcrumb: [
					{
						text: 'dashboard',
						active: true,
					},
				],
			},
		},
		{
			path: '/search',
			name: 'search',
			component: () => import('@/views/search/Search.vue'),
			meta: {
				pageTitle: 'search',
				requiresAuth: true,
				roles: ['admin', 'guest'],
				breadcrumb: [
					{
						text: 'Search',
						active: true,
					},
				],
			},
		},
		{
			path: '/mass',
			name: 'mass',
			component: () => import('@/views/massBalance/MassBalance.vue'),
			meta: {
				pageTitle: 'massBalance',
				requiresAuth: true,
				roles: ['admin', 'guest'],
				breadcrumb: [
					{
						text: 'Balance de masas',
						active: true,
					},
				],
			},
		},
		//Módulo de Usuarios
		{
			path: '/users',
			name: 'users',
			component: () => import('@/views/users/users-ist'),
			meta: {
				pageTitle: 'users',
				requiresAuth: true,
				roles: ['admin'],
				breadcrumb: [
					{
						text: 'users',
						active: true,
					},
				],
			},
		},
		{
			path: '/users-form',
			name: 'users-form',
			component: () => import('@/views/users/users-form'),
			meta: {
				pageTitle: 'formUsers',
				requiresAuth: true,
				props: (route) => ({ id: route.query.id }) ,
				roles: ['admin'],
				breadcrumb: [
					{
						text: 'users',
					},
					{
						text: 'formUsers',
						active: true,
					},
				],
			},
		},
		{
			path: '/users-view',
			name: 'users-view',
			component: () => import('@/views/users/users-view'),
			meta: {
				pageTitle: 'detail',
				requiresAuth: true,
				props: (route) => ({ id: route.query.id }),
				roles: ['admin'],
				breadcrumb: [
					{
						text: 'users',
					},
					{
						text: 'detail',
						active: true,
					},
				],
			},
		},
		{
			path: '/profile',
			name: 'profile',
			component: () => import('@/views/profile/profile'),
			meta: {
				pageTitle: 'profile',
				requiresAuth: true,
				roles: ['admin', 'guest'],
				breadcrumb: [
					{
						text: 'profile',
						active: true,
					},
				],
			},
		},
		//Fin - Módulo de Usuarios
		{
			path: '/register',
			name: 'register',
			requiresAuth: false,
			component: () => import('@/views/Register.vue'),
			meta: {
				layout: 'full',
			},
		},
		{
			path: '/login',
			name: 'login',
			requiresAuth: false,
			component: () => import('@/views/Login.vue'),
			meta: {
				layout: 'full',
			},
		},
		{
			path: '/error-404',
			name: 'error-404',
			requiresAuth: false,
			component: () => import('@/views/error/Error404.vue'),
			meta: {
				layout: 'full',
			},
		},
		{
			path: '*',
			redirect: 'error-404',
		},
	],
})

export default router
