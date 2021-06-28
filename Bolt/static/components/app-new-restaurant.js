Vue.component('app-new-restaurant', {
    data: function(){
        return {
            restaurantDTO: {name: null, type: null, imagePath: null, Location: null, username: null},
            isSubmitted: false,
            users: [],
        }
    },
    mounted: function(){
        let token = window.localStorage.getItem('token');
        axios.get('/managers', {
            headers: {
                'Authorization': 'Bearer ' + token
            }})
            .then(response => this.users = response.data)
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
            <div class="container register">
                <div class="row justify-content-md-center">
                    <div class="col-5">
                        <h4 class="text-center">Napravi Bolt restoran</h4>
                        <hr>
                        <form class="row g-3">
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
                                <label for="manager" class="form-label">Menadžer</label>
                                <select id="manager" v-model="restaurantDTO.username" v-bind:class="{'form-select':true, 'is-invalid': !restaurantDTO.username && isSubmitted}">
                                    <option v-for="user in users" :value="user.username">{{ user.name }} {{ user.surname }}</option>
                                </select>
                                <div class="invalid-feedback">Odaberite menadžera</div>
                            </div>
                            <div class="col-md-12">
                                <label for="photo" class="form-label">Logo restorana</label>
                                <input type="file" @change="imageAdded" class="form-control" id="photo" aria-describedby="inputGroupFileAddon04" aria-label="Upload">
                            </div>
                            <div class="col-md-12">
                                lokacija...
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
            if(this.restaurantDTO.name && this.restaurantDTO.type && this.restaurantDTO.username){ 
                let token = window.localStorage.getItem('token');
                axios.post('/restaurants', this.restaurantDTO, { 
                    headers: {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
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
        imageAdded(e){
            const file = e.target.files[0];
            this.createBase64Image(file);
        },
        createBase64Image(file){
            const reader = new FileReader();

            reader.onload = (e) => {
                let img = e.target.result;
                this.restaurantDTO.imagePath = img.split(",")[1];
            }
            reader.readAsDataURL(file);
        }
    }
});