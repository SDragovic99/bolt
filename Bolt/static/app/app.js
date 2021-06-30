const Home = { template: '<app-home></app-home>' }
const Login = { template: '<app-login></app-login>' }
const Register = { template: '<app-registration></app-registration>'}
const RegisterWorker = { template: '<app-registration-workers></app-registration-workers>'}
const MyProfile = { template: '<app-my-profile></app-my-profile>'}
const Profiles = { template: '<app-profiles></app-profiles>'}
const Forbidden = { template: '<app-forbidden-page></app-forbidden-page>'}
const NewRestaurant = { template: '<app-new-restaurant></app-new-restaurant>'}
const Restaurant = { template: '<app-restaurant-overview></app-restaurant-overview>'}
const Restaurants = { template: '<app-restaurants></app-restaurants>'}
const NewArticle = { template: '<app-new-article></app-new-article>'}

const router = new VueRouter({
	mode: 'history',
	  routes: [
		{ path: '/', name: 'home', component: Home},
		{ path: '/login', name: 'login', component: Login},
		{ path: '/register', name: 'register', component: Register},
		{ path: '/register-worker', name: 'register-worker', component: RegisterWorker},
		{ path: '/my-profile', name: 'my-profile', component: MyProfile},
		{ path: '/all-users', name: 'all-users', component: Profiles},
		{ path: '/forbidden', name: 'forbidden', component: Forbidden},
		{ path: '/new-restaurant', name: 'new-restaurant', component: NewRestaurant},
		{ path: '/restaurant-overview/:id', name: 'restaurant-overview', component: Restaurant},
		{ path: '/discover-restaurants', name: 'discover-restaurants', component: Restaurants},
		{ path: '/new-article/:id', name: 'new-article', component: NewArticle}
	  ]
});


var app = new Vue({
	router,
	el: '#app'
});