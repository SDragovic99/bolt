const Home = { template: '<app-home></app-home>' }
const Login = { template: '<app-login></app-login>' }
const Register = { template: '<app-registration></app-registration>'}
const RegisterWorker = { template: '<app-registration-workers></app-registration-workers>'}
const MyProfile = { template: '<app-my-profile></app-my-profile>'}
const Profiles = { template: '<app-profiles></app-profiles>'}

const router = new VueRouter({
	mode: 'history',
	  routes: [
		{ path: '/', name: 'home', component: Home},
		{ path: '/login', name: 'login', component: Login},
		{ path: '/register', name: 'register', component: Register },
		{ path: '/register-worker', name: 'register-worker', component: RegisterWorker},
		{ path: '/my-profile', name: 'my-profile', component: MyProfile},
		{ path: '/all-users', name: 'all-users', component: Profiles}
	  ]
});


var app = new Vue({
	router,
	el: '#app'
});