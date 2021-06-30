Vue.component('app-new-product', {
    data: function(){
        return {
            product: {restaurantId: this.$route.params.id, name: null, price: null, type: null, quantity: null, description: null, imagePath: null},
            isSubmitted: false,
            uniqueName: true
        }
    },
    template: `
        <div>
            <app-navbar></app-navbar>
            <div class="container register">
                <div class="row justify-content-md-center">
                    <div class="col-5">
                        <h4 class="text-center">Napravite novi artikal za Vaš restoran</h4>
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
                                <label for="type" class="form-label">Tip artikla</label>
                                <select id="type" v-model="product.type" v-bind:class="{'form-select':true, 'is-invalid': !product.type && isSubmitted}">
                                    <option value="food">Jelo</option>
                                    <option value="drink">Piće</option>
                                </select>
                                <div class="invalid-feedback">Odaberite tip artikla</div>
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
                                <button class="btn btn-primary" type="button" v-on:click="createProduct">Kreiraj artikal</button>
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
        createProduct: function(){
            this.isSubmitted = true;
            if(this.product.name && this.product.price && this.product.type && this.product.imagePath){
                let token = window.localStorage.getItem('token');
                axios
                .post("/restaurants/" + this.product.restaurantId + "/products", this.product, {
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
