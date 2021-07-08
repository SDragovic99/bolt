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
const NewProduct = { template: '<app-new-product></app-new-product>'}
const UpdateProduct = { template: '<app-update-product></app-update-product>'}
const Cart = { template: '<app-cart></app-cart>' }
const AddComment = { template: '<app-add-comment></app-add-comment>'}
const Customers = { template: '<app-customers></app-customers>'}

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
		{ path: '/restaurant-overview/:id/new-product', name: 'new-product', component: NewProduct},
		{ path: '/restaurant-overview/:id/update-product/:name', name: 'update-product', component: UpdateProduct},
		{ path: '/restaurant-overview/:id/checkout', name: 'checkout', component: Cart},
		{ path: '/add-comment/:id', name: 'add-comment', component: AddComment},
		{ path: '/my-customers', name: 'my-customers', component: Customers}
	  ]
});


var app = new Vue({
	router,
	el: '#app'
});