Vue.component('app-login', {
    data: function(){
		return {
            credentials: {username:null, password:null},
            isSubmitted: false, 
            invalid: false
        };
    },
    template: `
        <div>
            <app-navbar></app-navbar>
            <div class="container login">
                <div class="row justify-content-md-center">
                    <div class="col-5">
                        <h4 class="text-center">Prijavi se na svoj Bolt nalog</h4>
                        <hr>
                        <div class="form-floating mb-3">
                            <input type="text" id="username" v-model="credentials.username" v-bind:class="{'form-control':true, 'is-invalid' : !credentials.username && isSubmitted}">
                            <label for="username">Korisničko ime</label>
                            <div class="invalid-feedback">Popunite polje</div>
                        </div>
                        <div class="form-floating">
                            <input type="password" id="password" v-model="credentials.password" v-bind:class="{'form-control':true, 'is-invalid' : !credentials.password && isSubmitted}">
                            <label for="password">Šifra</label>
                            <div class="invalid-feedback">Popunite polje</div>
                        </div>
                        <div class="d-grid gap-2">
                            <button class="btn btn-primary" type="button" v-on:click="login">Prijavi se</button>
                        </div>
                        <div class="col-md-12 text-danger text-center" :style="{visibility: invalid ? 'visible' : 'hidden'}">
                                Neispravno korisničko ime ili lozinka.
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    `,
    methods: {
        login: function(){
            this.isSubmitted = true;
            if(this.credentials.username && this.credentials.password){
                axios.post("/auth", this.credentials)
                .then(response => {
                    this.invalid = false;
                    window.localStorage.setItem("token", response.data);
                    this.$router.push("/");
                }).catch(error =>  {
                    this.invalid = true;
                    window.localStorage.removeItem("token");
                    Role = 'guest';
                });               
            }
            
        }
    }
});