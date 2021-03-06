Vue.component('app-restaurant-overview', {
    data: function(){
        return {
            restaurant: {},
            restaurantId: this.$route.params.id, 
            username: '',
            manager: '',
            role: '',
            products: [],
            cart: {id: null, customerId: null, products: [], total: null },
            comments: [],
        };
    },
    mounted: function() {
        axios
            .get('/restaurants/' + this.restaurantId)
            .then(response => {
                this.restaurant = response.data;
                const vectorSource = new ol.source.Vector({
                    features: [new ol.Feature({
                        geometry: new ol.geom.Point(ol.proj.fromLonLat([
                            this.restaurant.location.longitude, this.restaurant.location.latitude
                        ]))})]
                  });
                  const vectorLayer = new ol.layer.Vector({
                    source: vectorSource,
                    style: new ol.style.Style({
                      image: new ol.style.Circle({
                        radius: 9,
                        fill: new ol.style.Fill({color: 'red'})
                      })
                    })
                  });
                const map = new ol.Map({
                    target: 'map',
                    layers: [
                      new ol.layer.Tile({
                        source: new ol.source.OSM()
                      }),
                      vectorLayer
                    ],
                    view: new ol.View({
                      center: ol.proj.fromLonLat([this.restaurant.location.longitude, this.restaurant.location.latitude]),
                      zoom: 18
                    })
                });
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
                        if(error.response.status == 403){
                            window.localStorage.removeItem("token");
                            this.$router.push('/forbidden');
                        }else{
                            this.$router.push('/');
                        }   
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
            
            axios.get("/comments/" + this.restaurantId, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
                }).then(response => {
                    this.comments = response.data
                })
                .catch(error => {
                    if(error.response.status == 403){
                        window.localStorage.removeItem("token");
                        this.$router.push('/forbidden');
                    }else{
                        this.$router.push('/');
                    }   
                })
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
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-12 text-center">
                        <button class="btn btn-light btn-md" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom"><i class="fa fa-map-marker" aria-hidden="true"></i> Pogledaj lokaciju na mapi</button>
                    </div>
                </div>
            </div>
            <div class="container d-flex justify-content-between">
                <div class="container mt-4 col-md-11 justify-content-bottom" style="opacity: 1;">
                    <h1 class="fw-bold nunito-heading">{{ restaurant.name }}</h1>
                    <p>{{restaurant.type | enumToString}}</p>
                    <button id="delivery" class="btn btn-light btn-sm" disabled>{{restaurant.isOpen ? 'OTVOREN' : 'ZATVOREN'}}</button>
                </div>
                <div class="container col-md-1 mt-4" v-if="role == 'customer' && restaurant.isOpen">
                    <button type="button" class="btn btn-primary btn-lg text-nowrap px-3" v-on:click="checkout" v-bind:disabled="cart.products.length == 0"><i class="fa fa-shopping-bag"></i> <span class="align-middle">{{cart.products.length}}</span></button>
                </div>	
                <div class="container col-md-1 mt-4" v-if="role == 'admin'">
                    <button type="button" class="btn btn-dark btn-lg text-nowrap px-3" v-on:click="deleteRestaurant"><i class="fa fa-trash"></i></button>
                </div>	
            </div>   	
        </div>

        <div class="container shadow-lg p-3 mb-5 bg-body rounded col-md-11 justify-content-between">
            <div class="row">
                <div class="col-md-6">
                    <p id="rating2" class="card-text"><img src="/assets/smiling-xl.png"> <span class="align-middle">{{ Math.round((restaurant.rating + Number.EPSILON) * 100) / 100 }}</span></p>
                </div>
                <div class="col-md-6 text-end align-self-center" v-if="role == 'admin' || role == 'customer' || manager.restaurantId == restaurantId">  
                    <button class="btn btn-outline-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapse12" aria-expanded="false" aria-controls="collapse12">Komentari</button>
                </div>
            </div>

            <div class="row">
                <div class="collapse" id="collapse12">
                    <div class="row" v-for="comment in filteredComments">
                        <div class="col-md-3 align-self-center">
                            <div class="card-body">
                                <h5>{{ comment.customerId }}</h5>
                            </div>
                        </div>
                        <div v-bind:class="{ 'col-md-7' : (role != 'admin' && role != 'admin' && manager.restaurantId != restaurantId), 'col-md-5' : (manager.restaurantId == restaurantId || role == 'admin'), 'align-self-center' : true }">
                            <div class="card-body">
                                <p class="fw-light">{{ comment.description }}</p>
                            </div>
                        </div>
                        <div class="col-md-2 align-self-center">
                            <div class="card-body text-end">
                                <h5 class="fw-normal"><img src="/assets/smiling.png"> {{ comment.review }}</h5>
                            </div>
                        </div>
                        <div class="col-md-2 align-self-center" v-if="manager.restaurantId == restaurantId">
                            <div class="card-body text-end">
                                <button type="button" class="btn btn-outline-success" :disabled="comment.status == 'approved'" v-on:click="approve(comment)"><i class="fa fa-check"></i></button>
                                <button type="button" class="btn btn-outline-danger" :disabled="comment.status == 'disapproved'" v-on:click="disapprove(comment)"><i class="fa fa-ban"></i></button>
                            </div>
                        </div>
                        <div class="col-md-2 align-self-center" v-if="role == 'admin'">
                            <div class="card-body text-end">
                                <button type="button" class="btn btn-outline-dark" v-on:click="deleteComment(comment)"><i class="fa fa-trash"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>                 
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
                                <button type="button" class="btn btn-outline-dark" v-on:click="deleteProduct(product)"><i class="fa fa-trash"></i></button>
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
        <div class="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel" style="width: 100%; height: 550px">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" v-if="restaurant.location" id="offcanvasBottomLabel">{{restaurant.location.address}}, {{restaurant.location.city}}<br><span class="text-muted fs-6" v-if="restaurant.location">{{restaurant.location.latitude}}, {{restaurant.location.longitude}}</span></h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body large">
                <div id="map" class="map" style="width: 100%; height: 450px"></div>
            </div>
        </div>
    </div>
    `,
    filters: {
        enumToString: function(value) {
            if(value == "chinese"){
                return "Kineski"
            } else if(value == "barbeque"){
                return "Ro??tilj"
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
                })
                .catch(error => {
                    if(error.response.status == 403){
                        window.localStorage.removeItem("token");
                        this.$router.push('/forbidden');
                    }else{
                        this.$router.push('/');
                    }   
                })
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
                    })
                    .catch(error => {
                        if(error.response.status == 403){
                            window.localStorage.removeItem("token");
                            this.$router.push('/forbidden');
                        }else{
                            this.$router.push('/');
                        }   
                    })
            }
        }, 
        checkout: function(){
            this.$router.push('/restaurant-overview/' + this.restaurantId + '/checkout');
        },
        approve: function(comment){
            let token = window.localStorage.getItem('token');
            comment.status = 'approved'
            axios.put("/comments/" + comment.id, comment, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                .catch(error => {
                    this.$router.push('/');
                });
        },
        disapprove: function(comment){
            let token = window.localStorage.getItem('token');
            comment.status = 'disapproved'
            axios.put("/comments/" + comment.id, comment, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                .catch(error => {
                    if(error.response.status == 403){
                        window.localStorage.removeItem("token");
                        this.$router.push('/forbidden');
                    }else{
                        this.$router.push('/');
                    }   
                })
        },
        deleteRestaurant: function(){
            let token = window.localStorage.getItem('token');
            axios.delete("/restaurants/" + this.restaurantId, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => { this.$router.push('/discover-restaurants'); })
            .catch(error => {
                if(error.response.status == 403){
                    window.localStorage.removeItem("token");
                    this.$router.push('/forbidden');
                }              
            })
        },
        deleteProduct: function(product){
            let token = window.localStorage.getItem('token');
            axios.delete("/restaurants/" + this.restaurantId + "/products/" + product.name, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => { this.products = this.products.filter(item => item.name != product.name) })
            .catch(error => {
                if(error.response.status == 403){
                    window.localStorage.removeItem("token");
                    this.$router.push('/forbidden');
                }              
            })
        },
        deleteComment: function(comment){
            let token = window.localStorage.getItem('token');
            axios.delete("/comments/" + comment.id, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => { this.comments = this.comments.filter(item => item.id != comment.id) })
            .catch(error => {
                if(error.response.status == 403){
                    window.localStorage.removeItem("token");
                    this.$router.push('/forbidden');
                }              
            })
        }
    }, 
    computed: {
        filteredComments(){
            let comments = this.comments
            if(this.role == 'customer'){
                comments = comments.filter(comment => {
                    return (comment.status == 'approved')
                })
            }
            return comments
        }
    }
})