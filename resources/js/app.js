require('./bootstrap');

import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Home from './components/home.vue';
import App from './components/App';
import Login from './components/login';
import Register from './components/Register';
const router = new VueRouter({
    mode: 'history',
    routes:[
        {
            path:'/',
            name: 'Home',
            component: Home,
            meta: { requiresAuth: true} 
        },
        {
            path:'/login',
            name: 'Login',
            component: Login
        },
        {
            path:'/register',
            name: 'Register',
            component: Register
        }
    ]
});
router.beforeEach((to, from, next) => {
	if (to.meta.requiresAuth) {
		const authUser = JSON.parse(window.localStorage.getItem('authUser'))
		if (!(authUser && authUser.access_token )) {
			next({ name: 'Login' })
		}
	}
	next()
})
var app = new Vue({
    el: '#app',
    router:router,
    render: h => h(App)
})