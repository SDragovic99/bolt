Vue.component('app-add-comment', {
    data: function(){
        return {
            restaurant: {},
            restaurantId: this.$route.params.id,
            username: '',
            comment: {customerId: null, restaurantId: null, description: null, review: null},
            isValid: true
        }
    },
    mounted: function() {
        let token = window.localStorage.getItem('token');
        this.username = parseJwt(token).sub;
        axios
            .get('/restaurants/' + this.restaurantId)
            .then(response => {
                this.restaurant = response.data;
            })
            .catch(error => {
                this.$router.push('/');
        });
    },
    template: `
        <div>
            <app-navbar></app-navbar>
            <div class="container register">
                <div class="row justify-content-md-center">
                    <div class="col-5">
                        <h4 class="text-center">{{restaurant.name}}</h4>
                        <hr>
                        <form class="row g-3">
                            <div class="col-md-12">
                                <div class="stars">
                                    <label for="review" class="form-label">Ocena</label>
                                    <form action=""> <input class="star star-5" id="star-5" type="radio" name="star" v-on:click="changeReview(5)"/> <label class="star star-5" for="star-5"></label> <input class="star star-4" id="star-4" type="radio" name="star" v-on:click="changeReview(4)"/> <label class="star star-4" for="star-4"></label> <input class="star star-3" id="star-3" type="radio" name="star" v-on:click="changeReview(3)"/> <label class="star star-3" for="star-3"></label> <input class="star star-2" id="star-2" type="radio" name="star" v-on:click="changeReview(2)"/> <label class="star star-2" for="star-2"></label> <input class="star star-1" id="star-1" type="radio" name="star" v-on:click="changeReview(1)"/> <label class="star star-1" for="star-1"></label> </form>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <label for="description" class="form-label">Komentar</label>
                                <input type="text" class="form-control" id="description" placeholder="Napišite komentar..." v-model="comment.description">
                            </div>                         
                            <div class="d-grid gap-2">
                                <button class="btn btn-primary" type="button" v-on:click="addComment">Postavi komentar</button>
                            </div>
                            <div class="col-md-12 text-danger text-center" :style="{visibility: isValid ? 'hidden' : 'visible'}">
                                Prilikom postavljanja komentara morate da popunite sva polja.
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `,
    methods: {
        changeReview: function(review){
            this.comment.review = review;
        },
        addComment: function(){
            this.comment.customerId = this.username;
            this.comment.restaurantId = this.restaurantId;
            if(this.comment.review && this.comment.description){
                let token = window.localStorage.getItem('token');
                axios
                .post("/comments", this.comment, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                .then(response => (router.push('/my-profile')))
                .catch(error => {
                    if(error.response.status == 403){
                        window.localStorage.removeItem("token");
                        this.$router.push('/forbidden');
                    }             
                })
            }else{
                this.isValid = false;
            }
        }
    }
});