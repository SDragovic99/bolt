Vue.component('app-restaurants', {
    data: function(){
        return {
            restaurants: [],
            searchedName: '',
            searchedCity: '',
            selectedType: 'default',
            searchedRating: '',
            selectedFilters: [],
            order: 'asc',
            sortBy: 'default'
        }
    },
    mounted: function(){
        axios.get('/restaurants')
            .then(response => {
                this.restaurants = response.data
                this.restaurants.sort((a, b) => {
                    return (a.isOpen === b.isOpen) ? 0 : a.isOpen? -1 : 1
                })
            })
            .catch(error => {
                this.$router.push('/');                   
            })
    },
    template: `
    <div>
        <app-navbar></app-navbar>
        <div class="container">
            <div class="row">
                <div class="col-md-12 mt-3">
                    <div class="input-group search-bar">
                        <input type="text" class="form-control" placeholder="Naziv restorana" v-model="searchedName">
                        <input type="text" class="form-control" placeholder="Grad" v-model="searchedCity">
                        <select class="form-select" v-model="selectedType">
                            <option selected value="default">Tip</option>
                            <option value="italian">Italijanski</option>
                            <option value="chinese">Kineski</option>
                            <option value="barbeque">Roštilj</option>
                            <option value="vegan">Veganski</option>
                        </select>                          
                        <input type="number" class="form-control" placeholder="Prosečna ocena" v-model="searchedRating">
                        <span class="p-1 align-middle"><i class="fa fa-search"></i></span>
                    </div>
                </div> 
                <p class="mt-2 btn-group" role="group">
                    <button class="btn btn-outline-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="false" aria-controls="collapse1">Filteri</button>
                    <button class="btn btn-outline-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="false" aria-controls="collapse2">Sortiraj</button>
                </p>
            </div>
            <div class="row">
                <div class="col">
                    <div class="collapse" id="collapse1">
                        <div class="row">
                            <div class="col">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="italian" value="italian" v-model="selectedFilters">
                                    <label class="form-check-label" for="italian">Italijanski</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="chinese" value="chinese" v-model="selectedFilters">
                                    <label class="form-check-label" for="chinese">Kineski</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="barbeque" value="barbeque" v-model="selectedFilters">
                                    <label class="form-check-label" for="barbeque">Roštilj</label>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="vegan" value="vegan" v-model="selectedFilters">
                                    <label class="form-check-label" for="vegan">Veganski</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="open" value="open" v-model="selectedFilters">
                                    <label class="form-check-label" for="open">Otvoreni</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="collapse" id="collapse2">
                        <select class="form-select" id="inputGroupSelect04" v-model="order">
                            <option value="asc">Rastuće</option>
                            <option value="desc">Opadajuće</option>
                        </select>
                        <div class="mt-2 text-muted">
                            <select class="form-select" v-model="sortBy">
                                <option value="default">Sortiraj po...</option>
                                <option value="name">Po nazivu</option>
                                <option value="location">Po lokaciji</option>
                                <option value="rating">Po prosečnoj oceni</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>  
            <h4 class="nunito-heading">Naši restorani</h4>
            <div class="row">
                <div class="col-md-4 mt-2" v-for="restaurant in filteredRestaurants">
                    <div class="card">
                        <a href="#" class="stretched-link" :id="restaurant.id" v-on:click.prevent="restaurant_overview(restaurant)"></a>
                            <div class="my-container">
                                <img :src="restaurant.imagePath" class="card-img-top" v-bind:style="{opacity: restaurant.isOpen ? 1 : 0.3}">
                                <div class="centered" v-bind:style="{visibility : restaurant.isOpen ? 'hidden' : 'visible'}">ZATVOREN</div>
                            </div>
                            
                            <div class="card-body">
                                <h5 class="card-title">{{restaurant.name}}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">{{restaurant.type | enumToString}}</h6>
                                <p class="address">{{restaurant.location.address}}, {{restaurant.location.city}}, {{restaurant.location.postalCode}}</p>
                            </div>
                            <div class="rating-wrapper">
                                <p id="rating" class="card-text"><img src="/assets/smiling.png"><span class="align-middle"><small class="text-muted"> {{restaurant.rating}}</small></span></p>
                            </div>
                        </a>    
                    </div>
                </div>
            </div> 
        </div>
    </div>
    `,
    methods: {
        restaurant_overview: function(restaurant){
            this.$router.push('/restaurant-overview/' + restaurant.id);
        }
    },
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
    computed: {
        filteredRestaurants(){
            let temp = this.restaurants

            if(this.searchedName && this.searchedName != ''){ 
                temp = temp.filter((item) => {
                    return item.name.toUpperCase().includes(this.searchedName.toUpperCase())
                })
            }

            if(this.searchedCity && this.searchedCity != ''){ 
                temp = temp.filter((item) => {
                    return item.location.city.toUpperCase().includes(this.searchedCity.toUpperCase())
                })
            }

            if(this.selectedType && this.selectedType != 'default'){
                temp = temp.filter((item) =>{
                    return (item.type == this.selectedType)
                })
            }

            if(this.searchedRating){
                temp = temp.filter((item) =>{
                    return (item.rating == this.searchedRating)
                })
            }

            if(this.selectedFilters.length > 0){
                let filteredByAll = []
                for(var i = 0; i < this.selectedFilters.length; i++){
                    let filteredByOne = []
                    filteredByOne = temp.filter((item) => {
                        if(this.selectedFilters[i] == 'open'){
                            return (item.isOpen === true)
                        }
                        return (item.type == this.selectedFilters[i])
                    })
                    filteredByAll.push(...filteredByOne)
                }
                temp = [ ...new Set(filteredByAll)]
            }

            temp = temp.sort((a, b) => {
                if(this.sortBy == 'name'){
                    let fa = a.name.toLowerCase(), fb = b.name.toLowerCase()
                    return alphabeticalSorter(fa, fb)
                } else if(this.sortBy == 'location'){
                    let fa = a.location.city.toLowerCase(), fb = b.location.city.toLowerCase()
                    return alphabeticalSorter(fa, fb)
                }
            })

            if(this.sortBy == 'rating'){
                temp = temp.sort((a, b) => {
                    return a.rating - b.rating
                })
            }

            if(this.order == 'desc'){
                temp.reverse()
            }
            

            return temp
        }
    }
})