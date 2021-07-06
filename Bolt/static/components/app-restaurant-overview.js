Vue.component('app-restaurant-overview', {
    data: function(){
        return {
            restaurant: {},
            restaurantId: this.$route.params.id, 
            username: '',
            manager: '',
            role: '',
            products: [],
            cart: {id: null, customerId: null, products: [], total: null }
        };
    },
    mounted: function() {
        axios
            .get('/restaurants/' + this.restaurantId)
            .then(response => {
                this.restaurant = response.data;
            })
            .catch(error => {
                this.$router.push('/');
        });
        if(window.localStorage.getItem('token')){
            let token = window.localStorage.getItem('token');
            this.username = parseJwt(token).sub;
            this.role = parseJwt(token).Role;
            if(this.role == 'manager'){
                axios
                    .get('/managers/' + this.username, {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    })
                    .then(response => {
                        this.manager = response.data;
                    })
                    .catch(error => {
                        this.$router.push('/');
                })
            }else if(this.role == 'customer'){               
                axios.get('/carts/' + this.username + this.restaurantId, {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    })
                    .then(response => {
                        this.cart = response.data;
                    })
                    .catch(error => {
                        this.cart = {id: this.username + this.restaurantId, customerId: this.username, products: [], total: 0.0 };
                        axios.post('/carts', this.cart, {
                                headers: {
                                    'Authorization': 'Bearer ' + token
                                }
                            });
                });
            }      
        }
        axios.get('/restaurants/' + this.restaurantId + '/products')
            .then(response => {
                this.products = response.data;
            }).catch(error => {
                this.$router.push('/');
        });
        
    }, 
    template: `
    <div>
        <app-navbar></app-navbar>
        <div v-bind:style="{ 'background-image': 'url(/' + restaurant.imagePath + ')', 'background-size': 'cover', 'opacity': 0.6, 'background-position': 'center', 'color': 'white' }" class="container-fluid py-5">
            <div class="container d-flex justify-content-between">
                <div class="container mt-5 col-md-11 justify-content-bottom" style="opacity: 1;">
                    <h1 class="fw-bold nunito-heading">{{ restaurant.name }}</h1>
                    <p>{{restaurant.type | enumToString}}</p>
                    <button id="delivery" class="btn btn-light btn-sm" disabled>{{restaurant.isOpen ? 'OTVOREN' : 'ZATVOREN'}}</button>
                </div>
                <div class="container col-md-1" v-if="role == 'customer' && restaurant.isOpen">
                    <button type="button" class="btn btn-primary btn-lg text-nowrap px-3" v-on:click="checkout" v-bind:disabled="cart.products.length == 0"><i class="fa fa-shopping-bag"></i> <span class="align-middle">{{cart.products.length}}</span></button>
                </div>	
            </div>   	
        </div>

        <div class="container shadow-lg p-3 mb-5 bg-body rounded col-md-11">
            <p id="rating2" class="card-text"><img src="/assets/smiling-xl.png"> <span class="align-middle">{{restaurant.rating}}</span></p>
        </div>

        <div class="container">
            <div class="col-md-2"><button class="btn btn-outline-info" v-if="manager.restaurantId == restaurantId" v-on:click="newProduct">Dodaj nove artikle</button></div>

            <div class="row"> 
                <div class="col-md-7 offset-md-2 my-2" v-for="product in products">
                    <div class="row card-body outline-card-gray">
                        <div class="col-sm-1">
                            <button type="button" class="btn plus-btn"><img src="/assets/add.png" v-if="role == 'customer' && restaurant.isOpen" v-on:click="addToCart(product)"></button>
                        </div>
                        <div class="col-md-5">
                            <h5>{{ product.name }} <span class="text-info">{{ getQuantity(product) }}</span></h5>
                            <p class="fs">{{ product.description }}</p>
                            <p class="text-info fw-light">RSD {{ product.price }}</p>
                            <div class="btn-group btn-group40" role="group" aria-label="Basic outlined example" v-if="role == 'customer' && restaurant.isOpen">
                                <button type="button" class="btn btn-outline-secondary" v-on:click="removeFromCart(product)">-</button>
                                <button type="button" class="btn btn-outline-secondary" v-on:click="addToCart(product)">+</button>
                            </div>
                            <div class="btn-group btn-group40" role="group" aria-label="Basic outlined example" v-if="role == 'admin'">
                                <button type="button" class="btn btn-outline-dark"><i class="fa fa-trash"></i></button>
                            </div>
                            <div class="btn-group btn-group40" role="group" aria-label="Basic outlined example" v-if="manager.restaurantId == restaurantId">
                                <button type="button" class="btn btn-outline-dark" v-on:click="updateProduct(product)"><i class="fa fa-pencil"></i></button>
                            </div>
                        </div>
                        <img v-bind:src="'/' + product.imagePath" class="col-lg-6 col-md-12">
                    </div>
                </div>
 
            </div>
        </div>
    </div>
    `,
    filters: {
        enumToString: function(value) {
            if(value == "chinese"){
                return "Kineski"
            } else if(value == "barbeque"){
                return "Roštilj"
            } else if(value == "vegan"){
                return "Veganski"
            } 
            return "Italijanski"
        }
    },
    methods: {
        newProduct: function(){
            this.$router.push('/restaurant-overview/' + this.restaurantId + '/new-product');
        },
        updateProduct: function(product){
            this.$router.push('/restaurant-overview/' + product.restaurantId + '/update-product/' + product.name);
        }, 
        getQuantity:function(product){
            let quantity = 0;

            this.cart.products.forEach(function(item){
                if(item == product.name){
                    quantity += 1;
                }
            })
            if(quantity == 0){
                return ""
            }
            return "x" + quantity;    
        },
        addToCart: function(product){
            this.cart.products.push(product.name)
            this.cart.total += product.price

            let token = window.localStorage.getItem('token');
            axios.put('/carts/' + this.username + this.restaurantId, this.cart, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                }).catch(error => {
                    this.$router.push('/');
            });
        },
        removeFromCart: function(product){
            var index = this.cart.products.indexOf(product.name)
            if (index > -1) {
                this.cart.products.splice(index, 1);
                this.cart.total -= product.price

                let token = window.localStorage.getItem('token');
                axios.put('/carts/' + this.username + this.restaurantId, this.cart, {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    }).catch(error => {
                    this.$router.push('/');
                });
            }
        }, 
        checkout: function(){
            this.$router.push('/restaurant-overview/' + this.restaurantId +'/checkout');
        }
    }
})