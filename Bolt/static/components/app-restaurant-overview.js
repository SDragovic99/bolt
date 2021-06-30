Vue.component('app-restaurant-overview', {
    data: function(){
        return {
            restaurant: {},
            restaurantId: this.$route.params.id
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
        <div class="row justify-content-right">
            <div class="col-md-2"></div>
            <div class="col-md-7 col-sm-8">
                <div class="card card-rounded">
                    <div class="row card-body">
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-light"><i class="fa fa-plus"></i></button>
                        </div>
                        <div class="col-sm-5">
                            <h5 class="card-title">Poke bowl<span class="fw-bolder text-primary"> x1</span></h5>
                            <p class="card-text">Ukusna činija sa puno vitamina.</p>
                            <p class="card-text"><small class="text-muted">RSD 490.00</small></p>
                            <div class="btn-group quantity-btn" role="group" aria-label="Basic outlined example">
                                <button type="button" class="btn btn-outline-primary">-</button>
                                <button type="button" class="btn btn-outline-primary">+</button>
                              </div>
                        </div>
                        <img src="/assets/bowl1.jpg" class="col-sm-6">
                    </div>
                </div>
            </div>

           <div class="col-md-3 col-sm-1">
                <h5 class="fw-bold nunito-heading">Adresa</h5>
                <p>{{restaurant.location.address}}, {{restaurant.location.city}}</p>
                <p><small class="text-muted">{{restaurant.location.latitude}}, {{restaurant.location.longitude}}</small></p>
                mapa...
            </div>

        </div>
    </div>

    <div class="container">
        <div class="row justify-content-left">
            <div class="col-md-2"></div>
            <div class="col-md-7 col-sm-8">
                <div class="card card-rounded">
                    <div class="row card-body">
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-light"><i class="fa fa-plus"></i></button>
                        </div>
                        <div class="col-sm-5">
                            <h5 class="card-title">Shrimp bowl</h5>
                            <p class="card-text">Ukusna činija sa puno vitamina.</p>
                            <p class="card-text"><small class="text-muted">RSD 500.00</small></p>
                            <div class="btn-group" role="group" aria-label="Basic outlined example">
                                <button type="button" class="btn btn-outline-primary">-</button>
                                <button type="button" class="btn btn-outline-primary">+</button>
                              </div>
                        </div>
                        <img src="/assets/bowl2.jpg" class="col-sm-6">
                    </div>
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
    }
})