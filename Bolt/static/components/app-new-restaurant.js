Vue.component('app-new-restaurant', {
    data: function(){
        return {
            restaurantDTO: {name: null, type: null, imagePath: null, location: null, username: null},
            user: {username: null, password: null, name: null, surname: null, gender: null, dateOfBirth: null, role: 'manager'},
            isSubmitted: false,
            isRegistrationSubmitted: false,
            username: '',
            managers: [],
            breadcrumb: 'info',
            uniqueUsername: true,
            registered: false,
            location: {longitude: null, latitude: null, address: null, city: null, postalCode: null},
            places: null
        }
    },
    mounted: function(){
        let token = window.localStorage.getItem('token');
        axios.get('/managers', {
            headers: {
                'Authorization': 'Bearer ' + token
            }})
            .then(response => this.managers = response.data)
            .catch(error => {
                if(error.response.status == 403){
                    window.localStorage.removeItem("token");
                    this.$router.push('/forbidden');
                }else{
                    this.$router.push('/');
                }               
            })
        this.places = places({
            appId: 'plQ4P1ZY8JUZ',
            apiKey: 'bc14d56a6d158cbec4cdf98c18aced26',
            container: document.querySelector('#address'),
		    templates: {
			      value: function(suggestion) {
			        return suggestion.name;
			      }
			    }
			  }).configure({
			    type: 'address'
			 });

            this.places.on('change', function getLocationData(e) {
                
                document.querySelector('#address').value = e.suggestion.value || '';
                document.querySelector('#city').value = e.suggestion.city || '';
                document.querySelector('#longitude').value = e.suggestion.latlng.lng || '';
                document.querySelector('#latitude').value = e.suggestion.latlng.lat || '';
                document.querySelector('#postalCode').value = e.suggestion.postcode || '';    
            });
    },
    template: `
        <div>
            <app-navbar></app-navbar>
            <div class="container register">
                <div class="row justify-content-md-center">
                    <div class="col-6">
                        <h4 class="text-center">Napravi Bolt restoran</h4>
                        <hr class="hr-breadcrumbs">
                        <div class="container breadcrumbs">
                            <div class="row">
                                <div v-bind:class="{'col' : true, 'text-center' : true, 'text-info' : breadcrumb == 'info', 'text-muted' : breadcrumb != 'info'}">
                                    <a class="nav-link" aria-current="page" href="#" v-on:click.prevent="toInfoBreadcrumb">Informacije</a>
                                </div>
                                <span class="col text-center text-muted">/</span>
                                <div v-bind:class="{'col' : true, 'text-center' : true, 'text-info' : breadcrumb == 'manager', 'text-muted' : breadcrumb != 'manager'}">
                                    <a class="nav-link" aria-current="page" href="#" v-on:click.prevent="toManagerBreadcrumb">Menadžer</a>
                                </div>
                            </div>
                        </div>
                        <form class="row g-3" v-if="breadcrumb == 'info'">
                            <div class="col-md-12">
                                <label for="name" class="form-label">Naziv restorana</label>
                                <input type="text" class="form-control" id="name" placeholder="Ime" v-model="restaurantDTO.name" v-bind:class="{'form-control':true, 'is-invalid' : !restaurantDTO.name && isSubmitted}">
                                <div class="invalid-feedback">Popunite polje</div>    
                            </div>
                            <div class="col-md-12">
                                <label for="type" class="form-label">Tip restorana</label>
                                <select id="type" v-model="restaurantDTO.type" v-bind:class="{'form-select':true, 'is-invalid': !restaurantDTO.type && isSubmitted}">
                                    <option value="italian">Italijanski</option>
                                    <option value="chinese">Kineski</option>
                                    <option value="barbeque">Roštilj</option>
                                    <option value="vegan">Veganski</option>
                                </select>
                                <div class="invalid-feedback">Odaberite tip restorana</div>
                            </div>
                            <div class="col-md-12">
                                <label for="photo" class="form-label">Logo restorana</label>
                                <input type="file" @change="imageAdded" v-bind:class="{'form-control':true, 'is-invalid': !restaurantDTO.imagePath && isSubmitted}" id="photo" aria-describedby="inputGroupFileAddon04" aria-label="Upload">
                                <div class="invalid-feedback">Upload-ujte sliku</div>
                            </div>
                            <div class="col-md-12">
                                <label for="address" class="form-label">Adresa restorana</label>
                                <input type="search" class="form-control" id="address" placeholder="Adresa restorana" v-model="location.address" v-bind:class="{'form-control':true, 'is-invalid' : !location.address && isRegistrationSubmitted}">
                                <div class="invalid-feedback">Popunite polje</div>
                            </div>
                            <div class="col-md-12">
                                <label for="city" class="form-label">Grad</label>
                                <input type="text" class="form-control" id="city" placeholder="Grad" v-model="location.city" v-bind:class="{'form-control':true, 'is-invalid' : !location.city && isRegistrationSubmitted}" disabled>
                                <div class="invalid-feedback">Popunite polje</div>
                            </div>
                            <div class="col-md-12">
                                <label for="postalCode" class="form-label">Poštanski broj</label>
                                <input type="text" class="form-control" id="postalCode" placeholder="Poštanski broj" v-model="location.postalCode" v-bind:class="{'form-control':true, 'is-invalid' : !location.postalCode && isRegistrationSubmitted}" disabled>
                                <div class="invalid-feedback">Popunite polje</div>
                            </div>
                            <input id="latitude" v-model="location.latitude" hidden>
                            <input id="longitude" v-model="location.longitude" hidden>                            
                            <div class="d-grid gap-2">
                                <button class="btn btn-primary" type="button" v-on:click="toManagerBreadcrumb">Dalje...</button>
                            </div>
                            
                        </form>

                        <form class="row g-3" v-if="breadcrumb == 'manager'">
                            <div class="col-md-12" v-if="registered && managers.length == 0">Username menadžera: {{ username }}</div>
                            <div class="col-md-12" v-if="managers.length > 0">
                                <label for="manager" class="form-label">Menadžer</label>
                                <select id="manager" v-model="username" v-bind:class="{'form-select':true, 'is-invalid': !restaurantDTO.username && isSubmitted}">
                                    <option v-for="user in managers" :value="user.username">{{ user.name }} {{ user.surname }}</option>
                                </select>
                                <div class="invalid-feedback">Odaberite menadžera</div>
                            </div>
                            <div class="col-md-12" v-if="managers.length == 0 && !registered">
                                <form class="row g-3">
                                    <div class="col-md-6">
                                        <label for="name" class="form-label">Ime</label>
                                        <input type="text" class="form-control" id="name" placeholder="Ime" v-model="user.name" v-bind:class="{'form-control':true, 'is-invalid' : !user.name && isRegistrationSubmitted}">
                                        <div class="invalid-feedback">Popunite polje</div>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="surname" class="form-label">Prezime</label>
                                        <input type="text" class="form-control" id="surname" placeholder="Prezime" v-model="user.surname" v-bind:class="{'form-control':true, 'is-invalid' : !user.surname && isRegistrationSubmitted}">
                                        <div class="invalid-feedback">Popunite polje</div>
                                    </div>
                                    <div class="col-md-9">
                                        <label for="dateOfBirth" class="form-label">Datum rođenja</label>
                                        <input type="date" id="dateOfBirth" v-model="user.dateOfBirth" v-bind:class="{'form-control':true, 'is-invalid' : !user.dateOfBirth && isRegistrationSubmitted}">
                                        <div class="invalid-feedback">Odaberite datum</div>
                                    </div>
                                    <div class="col-md-3">
                                        <label for="gender" class="form-label">Pol</label>
                                        <select id="gender" v-model="user.gender" v-bind:class="{'form-select':true, 'is-invalid' : !user.gender && isRegistrationSubmitted}">
                                            <option value="male">M</option>
                                            <option value="female">Ž</option>
                                        </select>
                                        <div class="invalid-feedback">Odaberite pol</div>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="username" class="form-label">Korisničko ime</label>
                                        <input type="text" id="username" placeholder="Korisničko ime" v-model="username" v-bind:class="{'form-control':true, 'is-invalid' : !user.username && isRegistrationSubmitted}">
                                        <div class="invalid-feedback">Popunite polje</div>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="password" class="form-label">Šifra</label>
                                        <input type="password" id="password" placeholder="Šifra" v-model="user.password" v-bind:class="{'form-control':true, 'is-invalid' : !user.password && isRegistrationSubmitted}">
                                        <div class="invalid-feedback">Popunite polje</div>
                                    </div>
                                    <div class="d-grid gap-2">
                                        <button class="btn btn-outline-primary" type="button" v-on:click="register">Registruj menadžera i dodaj ga na restoran</button>
                                    </div>
                                    <div class="col-md-12 text-danger text-center" :style="{visibility: uniqueUsername ? 'hidden' : 'visible'}">
                                        Korisničko ime je već zauzeto.
                                    </div>
                                </form>
                            </div>
                            <div class="d-grid gap-2">
                                <button class="btn btn-primary" type="button" v-on:click="createRestaurant">Kreiraj restoran</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    `,
    methods: {
        createRestaurant: function(){
            this.isSubmitted = true;
            this.restaurantDTO.username = this.username
            this.restaurantDTO.location = this.location
            if(this.restaurantDTO.name && this.restaurantDTO.type && this.restaurantDTO.username && this.restaurantDTO.imagePath){ 
                let token = window.localStorage.getItem('token');
                axios.post('/restaurants', this.restaurantDTO, { 
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                .then(response => (router.push("/")))
                .catch(error => {
                    if(error.response.status == 403){
                        window.localStorage.removeItem("token");
                        this.$router.push('/forbidden');
                    }            
                })
            }
        },
        register: function(){
            this.isRegistrationSubmitted = true;
            this.user.username = this.username
            if(this.user.name && this.user.surname && this.user.dateOfBirth && this.user.gender && this.user.role && this.user.username && this.user.password){
                let token = window.localStorage.getItem('token');
                axios
                .post("/workers", this.user, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                .then(response => this.registered = true)
                .catch(error => {
                    if(error.response.status == 403){
                        window.localStorage.removeItem("token");
                        this.$router.push('/forbidden');
                    }else{
                        this.uniqueUsername = false;
                    }               
                })
            }  
        },
        imageAdded(e){
            const file = e.target.files[0];
            this.createBase64Image(file);
        },
        createBase64Image(file){
            const reader = new FileReader();

            reader.onload = (e) => {
                this.restaurantDTO.imagePath = e.target.result;
            }
            reader.readAsDataURL(file);
        }, 
        toInfoBreadcrumb: function(){
            this.breadcrumb = 'info'
        },
        toManagerBreadcrumb: function(){
            this.location.address = document.querySelector('#address').value;
            this.location.city = document.querySelector('#city').value;
            this.location.postalCode = document.querySelector('#postalCode').value;
            this.location.latitude = document.querySelector('#latitude').value;
            this.location.longitude = document.querySelector('#longitude').value;
            this.breadcrumb = 'manager'
        }
    }
});