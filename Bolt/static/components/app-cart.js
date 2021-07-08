Vue.component('app-cart',{
    data: function(){
        return{
            restaurantId: this.$route.params.id,
            restaurant: {},
            username: '',
            cart: {},
            products: [], 
            productsInCart: [],
            order: {id: null, date: null, total: 0.0, status: null, customerId: null, restaurantId: null, products: []}
        }
    },
    mounted: function(){
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
            axios.get('/carts/' + this.username + this.restaurantId, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
                })
                .then(response => {
                    this.cart = response.data;
                    axios.get('/restaurants/' + this.restaurantId + '/products')
                        .then(response => {
                            this.products = response.data;

                            this.products.forEach(product => {
                                this.cart.products.forEach(cartProduct => {
                                    if(product.name == cartProduct){
                                        this.productsInCart.push(product);
                                    }
                                })
                            })  
                            this.productsInCart = [ ...new Set(this.productsInCart)]      
                        }).catch(error => {
                            this.$router.push('/');
                        });
                })
        }
        
    },
    template: `
        <div>
            <app-navbar></app-navbar>
            <div class="container-fluid py-5 gradient-header">
                <div class="container">
                    <h1 class="nunito-heading mt-4">Završetak kupovine</h1>
                    <h5 class="nunito-heading">{{ restaurant.name }}</h5>
                </div>
            </div>
            <div class="container">
                <div class="row">       
                    <h5 class="nunito-heading mt-5">Odabrani artikli</h5>
                    <div class="col-md-7 my-2" v-for="product in productsInCart">
                        <div class="row card-body outline-card-gray">
                            <div class="col-sm-1">
                                <button type="button" class="btn plus-btn"><img src="/assets/add.png" v-on:click="addToCart(product)"></button>
                            </div>
                            <div class="col-md-5">
                                <h5>{{ product.name }} <span class="text-info">{{ getQuantity(product) }}</span></h5>
                                <p class="fs">{{ product.description }}</p>
                                <p class="text-info fw-light">RSD {{ product.price }}</p>
                                <div class="btn-group btn-group40" role="group" aria-label="Basic outlined example">
                                    <button type="button" class="btn btn-outline-secondary" v-on:click="removeFromCart(product)">-</button>
                                    <button type="button" class="btn btn-outline-secondary" v-on:click="addToCart(product)">+</button>
                                </div>
                            </div>
                            <img v-bind:src="'/' + product.imagePath" class="col-lg-6 col-md-12">
                        </div>
                    </div>
                </div>
                <div class="row my-3">
                        <div class="col-md-6 d-flex align-items-center">
                            <h5>Ukupno: {{cart.total}}</h5>
                        </div>
                        <div class="col-md-6 d-flex align-items-center">
                            <button type="button" class="btn btn-outline-info btn-lg" v-on:click="makeOrder">Poruči</button>
                        </div>
                        
                    </div>
            </div>
        </div>
    `,
    methods: {
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

                if(this.cart.products.length == 0){
                    this.$router.push('/restaurant-overview/' + this.restaurantId);
                }
            }
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
        makeOrder: function(){
            this.order.customerId = this.username;
            this.order.restaurantId = this.restaurantId;
            this.order.products = this.cart.products;
            this.order.total = this.cart.total;
            let token = window.localStorage.getItem('token');
                axios
                .post("/orders", this.order, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                .then(response => {
                    axios.delete('/cart/' + this.cart.id, {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    })
                    router.push('/restaurant-overview/' + this.restaurantId)
                })
                .catch(error => {
                    if(error.response.status == 403){
                        window.localStorage.removeItem("token");
                        this.$router.push('/forbidden');
                    }       
                })
        }
    }

})