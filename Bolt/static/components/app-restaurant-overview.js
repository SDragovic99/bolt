Vue.component('app-restaurant-overview', {
    data: function(){
        return {
            restaurant: {},
            username: ''
        };
    },
    mounted: function() {
        let token = window.localStorage.getItem('token');
        this.username = parseJwt(window.localStorage.getItem('token')).sub;
        axios
            .get('/restaurants/manager/' + this.username, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => {
                this.restaurant = response.data;
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
    template: `
    <div>
    <app-navbar></app-navbar>
    <div v-bind:style="{ 'backgroundImage': 'url(' + restaurant.imagePath + ')', 'background-size': 'cover', 'background-position': 'center', 'color': 'white' }" class="container-fluid py-5">
        <div class="container p-3 mt-5 col-md-11 justify-content-bottom">
            <h1 class="fw-bold">{{ restaurant.name }}</h1>
            <button id="delivery" class="btn btn-light btn-sm" disabled>DOSTAVA: 99.00</button>
        </div>		
    </div>

    <div class="container shadow-lg p-3 mb-5 bg-body rounded col-md-11">
        <p id="rating2" class="card-text"><i class="fa fa-smile-o" aria-hidden="true"></i> 9.5</p>
    </div>

    <div class="container">
        <div class="row justify-content-right">
            <div class="col-md-2"></div>
            <div class="col-md-7 col-sm-8">
                <div class="card">
                    <div class="row card-body">
                        <div class="col-sm-1">
                            <button type="button" class="btn btn-light"><i class="fa fa-plus"></i></button>
                        </div>
                        <div class="col-sm-5">
                            <h5 class="card-title">Poke bowl<span class="fw-bolder text-primary"> x1</span></h5>
                            <p class="card-text">Ukusna činija sa puno vitamina.</p>
                            <p class="card-text"><small class="text-muted">RSD 490.00</small></p>
                            <div class="btn-group" role="group" aria-label="Basic outlined example">
                                <button type="button" class="btn btn-outline-primary">-</button>
                                <button type="button" class="btn btn-outline-primary">+</button>
                              </div>
                        </div>
                        <img src="assets/bowl1.jpg" class="col-sm-6">
                    </div>
                </div>
            </div>

            <div class="col-md-3 col-sm-1">
                <h5 class="fw-bold">Adresa</h5>
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
                <div class="card">
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
                        <img src="assets/bowl2.jpg" class="col-sm-6">
                    </div>
                </div>
            </div>
        </div>
    </div>

    </div>
    `,
    methods: {

    }
})