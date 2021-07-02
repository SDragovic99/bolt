Vue.component('app-update-product', {
    data: function(){
        return {
            product: {},
            productDTO: {currentProductId: null, imageChanged: false, restaurantId: this.$route.params.id, name: null, price: null, type: null, quantity: null, description: null, imagePath: null},
            uniqueName: true,
            isSubmitted: false
        };
    },
    mounted: function() {
        let token = window.localStorage.getItem('token');
        let restaurantId = this.$route.params.id;
        let name = this.$route.params.name;
        this.productDTO.currentProductId = name + restaurantId;
        axios
            .get('/restaurants/' + restaurantId + '/products/' + name, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => {
                this.product = response.data;
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
            <div class="container register">
                <div class="row justify-content-md-center">
                    <div class="col-5">
                        <h4 class="text-center">Izmena podataka</h4>
                        <hr>
                        <form class="row g-3">
                            <div class="col-md-12">
                                <label for="name" class="form-label">Naziv artikla</label>
                                <input type="text" class="form-control" id="name" placeholder="Ime" v-model="product.name" v-bind:class="{'form-control':true, 'is-invalid' : !product.name && isSubmitted}">
                                <div class="invalid-feedback">Popunite polje</div>    
                            </div>
                            <div class="col-md-12">
                                <label for="price" class="form-label">Cena artikla</label>
                                <input type="number" class="form-control" id="price" placeholder="Cena" v-model="product.price" v-bind:class="{'form-control':true, 'is-invalid' : !product.price && isSubmitted}">
                                <div class="invalid-feedback">Popunite polje</div>    
                            </div>
                            <div class="col-md-12">
                                <label for="description" class="form-label">Opis artikla</label>
                                <input type="text" class="form-control" id="description" placeholder="Opis" v-model="product.description">
                            </div>
                            <div class="col-md-12">
                                <label for="quantity" class="form-label">Količina</label>
                                <input type="number" class="form-control" id="price" placeholder="Količina" v-model="product.quantity">
                            </div>
                            <div class="col-md-12">
                                <label for="photo" class="form-label">Slika artikla</label>
                                <input type="file" @change="imageAdded" class="form-control" id="photo" aria-describedby="inputGroupFileAddon04" aria-label="Upload">
                            </div>
                            
                            <div class="d-grid gap-2">
                                <button class="btn btn-primary" type="button" v-on:click="updateProduct">Izmeni artikal</button>
                            </div>
                            <div class="col-md-12 text-danger text-center" :style="{visibility: uniqueName ? 'hidden' : 'visible'}">
                                Ime artikla je već zauzeto.
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `,
    methods: {
        updateProduct: function(){
            this.isSubmitted = true;
            this.productDTO.name = this.product.name;
            this.productDTO.price = this.product.price;
            this.productDTO.type = this.product.type;
            this.productDTO.quantity = this.product.quantity;
            this.productDTO.description = this.product.description;
            this.productDTO.imagePath = this.product.imagePath;
            if(this.product.name && this.product.price){
                let token = window.localStorage.getItem('token');
                axios
                .put("/restaurants/" + this.product.restaurantId + "/products/" + this.product.name, this.productDTO, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                .then(response => (router.push('/restaurant-overview/' + this.product.restaurantId)))
                .catch(error => {
                    if(error.response.status == 403){
                        window.localStorage.removeItem("token");
                        this.$router.push('/forbidden');
                    }else{
                        this.uniqueName = false;
                    }               
                })
            } 
        },
        imageAdded(e){
            const file = e.target.files[0];
            this.productDTO.imageChanged = true;
            this.createBase64Image(file);
        },
        createBase64Image(file){
            const reader = new FileReader();

            reader.onload = (e) => {
                this.product.imagePath = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    }
});