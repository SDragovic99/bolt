Vue.component('app-restaurant-overview', {
    data: function(){
        return {
            restaurant: {},
            restaurantId: this.$route.params.id, 
            manager: '',
            role: '',
            products: []
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
            this.manager = parseJwt(window.localStorage.getItem('token')).sub;
            this.role = parseJwt(window.localStorage.getItem('token')).Role;
            if(this.role == 'manager'){
                axios
                    .get('/managers/' + this.manager)
                    .then(response => {
                        this.manager = response.data;
                    })
                    .catch(error => {
                        this.$router.push('/');
                })
            }        
        }
        axios.get('/restaurants/' + this.restaurantId + '/products')
            .then(response => {
                this.products = response.data;
            }).catch(error => {
                this.$router.push('/');
            })
        
    }, 
    template: `
    <div>
        <app-navbar></app-navbar>
        <div v-bind:style="{ 'backgroundImage': 'url(/' + restaurant.imagePath + ')', 'background-size': 'cover', 'background-position': 'center', 'color': 'white', opacity: 0.6 }" class="container-fluid py-5">
            <div class="container p-3 mt-5 col-md-11 justify-content-bottom">
                <h1 class="fw-bold nunito-heading">{{ restaurant.name }}</h1>
                <p>{{restaurant.type | enumToString}}</p>
                <button id="delivery" class="btn btn-light btn-sm" disabled>DOSTAVA: 99.00</button>
            </div>		
        </div>

        <div class="container shadow-lg p-3 mb-5 bg-body rounded col-md-11">
            <p id="rating2" class="card-text"><img src="/assets/smiling-xl.png"> <span class="align-middle">{{restaurant.rating}}</span></p>
        </div>

        <div class="container">
            <div class="col-md-2"><button class="btn btn-outline-info" v-if="manager.restaurantId == restaurantId" v-on:click="newProduct">Dodaj nove artikle</button></div>

            <div class="row"> 
                <div class="col-md-7 offset-md-2 my-2" v-for="product in products" :key="product">
                    <div class="row card-body outline-card-gray">
                        <div class="col-sm-1">
                            <button type="button" class="btn plus-btn"><img src="/assets/add.png" v-if="role == 'customer'"></button>
                        </div>
                        <div class="col-md-5">
                            <h5>{{ product.name }}</h5>
                            <p class="fs">{{ product.description }}</p>
                            <p class="text-info fw-light">RSD {{ product.price }}</p>
                            <div class="btn-group btn-group40" role="group" aria-label="Basic outlined example" v-if="role == 'customer'">
                                <button type="button" class="btn btn-outline-secondary">-</button>
                                <button type="button" class="btn btn-outline-secondary">+</button>
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
        }
    }
})