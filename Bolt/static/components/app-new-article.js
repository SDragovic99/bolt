Vue.component('app-new-article', {
    data: function(){
        return {
            article: {id: this.$route.params.id, name: null, price: null, type: null, quantity: null, description: null, imagePath: null},
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
                                <input type="text" class="form-control" id="name" placeholder="Ime" v-model="article.name" v-bind:class="{'form-control':true, 'is-invalid' : !article.name && isSubmitted}">
                                <div class="invalid-feedback">Popunite polje</div>    
                            </div>
                            <div class="col-md-12">
                                <label for="price" class="form-label">Cena artikla</label>
                                <input type="number" class="form-control" id="price" placeholder="Cena" v-model="article.price" v-bind:class="{'form-control':true, 'is-invalid' : !article.price && isSubmitted}">
                                <div class="invalid-feedback">Popunite polje</div>    
                            </div>
                            <div class="col-md-12">
                                <label for="type" class="form-label">Tip artikla</label>
                                <select id="type" v-model="article.type" v-bind:class="{'form-select':true, 'is-invalid': !article.type && isSubmitted}">
                                    <option value="dish">Jelo</option>
                                    <option value="drink">Piće</option>
                                </select>
                                <div class="invalid-feedback">Odaberite tip artikla</div>
                            </div>
                            <div class="col-md-12">
                                <label for="description" class="form-label">Opis artikla</label>
                                <input type="text" class="form-control" id="description" placeholder="Opis" v-model="article.description">
                            </div>
                            <div class="col-md-12">
                                <label for="quantity" class="form-label">Količina</label>
                                <input type="number" class="form-control" id="price" placeholder="Količina" v-model="article.quantity">
                            </div>
                            <div class="col-md-12">
                                <label for="photo" class="form-label">Slika artikla</label>
                                <input type="file" @change="imageAdded" class="form-control" id="photo" aria-describedby="inputGroupFileAddon04" aria-label="Upload">
                            </div>
                            
                            <div class="d-grid gap-2">
                                <button class="btn btn-primary" type="button" v-on:click="createArticle">Kreiraj artikal</button>
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
        createArticle: function(){
            this.isSubmitted = true;
            if(this.article.name && this.article.price && this.article.type && this.article.imagePath){
                let token = window.localStorage.getItem('token');
                axios
                .post("/articles", this.article, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                .then(response => (router.push('/restaurant-overview/' + this.article.id)))
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
                this.article.imagePath = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    }
});
