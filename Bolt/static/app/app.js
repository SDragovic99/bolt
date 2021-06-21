const Home = { template: '<app-home></app-home>' }
const Login = { template: '<app-login></app-login>' }
const Register = { template: '<app-registration></app-registration>'}

const router = new VueRouter({
	mode: 'history',
	  routes: [
		{ path: '/', name: 'home', component: Home},
		{ path: '/login', name: 'login', component: Login},
		{ path: '/register', name: 'register', component: Register }
	  ]
});

var app = new Vue({
	router,
	el: '#app'
});