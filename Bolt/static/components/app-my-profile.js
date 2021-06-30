Vue.component('app-my-profile', {
    data: function(){
		return {
            user: {},
            isSubmittedUpdate: false,
            isSubmittedPassword: false,
            wrongPassword: false,
            full_name: '',
            username: '',
            oldPassword: '',
            newPassword: '',
            validUpdate: false,
            validPassword: false
        };
    },
    mounted: function() {
        let token = window.localStorage.getItem('token');
        this.username = parseJwt(window.localStorage.getItem('token')).sub;
        axios
            .get('/users/' + this.username, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => {
                this.user = response.data;
                this.full_name = this.user.name + ' ' + this.user.surname;
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
    <div id="header" class="container-fluid py-5">
        <div class="container p-3 mt-5 col-md-11 justify-content-bottom">
            <h1 class="fw-bold nunito-heading">Moj nalog</h1>
        </div>		
	</div>

    <div class="container">
        <div class="row justify-content-around">
            <div class="col-md-2 shadow-lg p-5 mb-5 bg-body rounded" style="height: 50%;">
                <div class="text-center"><img src="/assets/user.png"></div>
                <h5 class="text-center">{{full_name}}</h5>
            </div>
            <div class="col-md-9 shadow-lg p-5 mb-5 bg-body rounded justify-content-center">
                <h5 class="text-left nunito-heading">Vaši detalji</h5>
                <p class="text-muted">Da li želite da promenite nešto? Ne zaboravite da kliknete "Snimi izmene" na kraju forme</p>
                <form class="row g-3">
                    <div class="col-md-5">
                        <label for="name" class="form-label">Ime</label>
                        <input type="text" class="form-control" id="name" placeholder="Ime" v-model="user.name" v-bind:class="{'is-invalid' : !user.name && isSubmittedUpdate}">
                        <div class="invalid-feedback">Popunite polje</div>    
                    </div>
                    <div class="col-md-5">
                        <label for="surname" class="form-label">Prezime</label>
                        <input type="text" class="form-control" id="surname" placeholder="Prezime" v-model="user.surname" v-bind:class="{'is-invalid' : !user.surname && isSubmittedUpdate}">
                        <div class="invalid-feedback">Popunite polje</div>
                    </div>
                    <div class="col-md-5">
                        <label for="dateOfBirth" class="form-label">Datum rođenja</label>
                        <input type="date" class="form-control" id="dateOfBirth" v-model="user.dateOfBirth" v-bind:class="{'is-invalid' : !user.dateOfBirth && isSubmittedUpdate}">
                    </div>
                    <div class="col-md-5">
                        <label for="gender" class="form-label">Pol</label>
                        <select id="gender" class="form-select" v-model="user.gender">
                            <option value="male">M</option>
                            <option value="female">Ž</option>
                        </select>
                    </div>
                    <div class="w-100"></div>
                    <div class="d-grid gap-2 col-md-5">
                        <button class="btn btn-primary" type="button" v-on:click='update'>Snimi izmene</button>
                        <p class="text-success" :style="{visibility: validUpdate ? 'visible' : 'hidden'}">Izmene uspešno snimljene!</p>
                    </div>
                </form>
            </div>
            <div class="col-md-2"></div>
            <div class="col-md-9 shadow-lg p-5 mb-5 bg-body rounded">
                <h5 id="password-header nunito-heading" class="text-left">Promena lozinke</h5>
                <div class="row g-3">
                    <div class="col-md-5">
                        <label for="password" class="form-label">Trenutna šifra</label>
                        <input type="password" class="form-control" id="current_password" v-model="oldPassword" v-bind:class="{'is-invalid' : !oldPassword && isSubmittedPassword || wrongPassword}">
                        <div class="invalid-feedback">Neispravna lozinka.</div>
                    </div> 
                    <div class="col-md-5">
                        <label for="password" class="form-label">Nova šifra</label>
                        <input type="password" class="form-control" id="new_password" v-model="newPassword" v-bind:class="{'is-invalid' : !newPassword && isSubmittedPassword}">
                        <div class="invalid-feedback">Popunite polje</div>
                    </div>  
                    <div class="w-100"></div>             
                    <div class="d-grid gap-2 col-md-5">
                        <button class="btn btn-primary" type="button" v-on:click='updatePassword'>Promeni lozinku</button>
                        <p class="text-success" :style="{visibility: validPassword ? 'visible' : 'hidden'}">Lozinka uspešno promenjena!</p>
                    </div>
            </div>
                </div>                      
            </div>
        </div>
    </div>
    </div>
    `,
    methods: {
        update: function() {
            this.isSubmittedUpdate = true;
            if(this.user.name && this.user.surname && this.user.dateOfBirth && this.user.gender){
                let token = window.localStorage.getItem('token');
                axios
                .put('/users/' + this.username, this.user, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                .then(response => {
                    this.full_name = this.user.name + ' ' + this.user.surname;
                    this.validUpdate = true;
                })
                .catch(error => {
                    if(error.response.status == 403){
                        window.localStorage.removeItem("token");
                        this.$router.push('/forbidden');
                    }else{
                        this.$router.push('/');
                    }               
                })
            } else {
                this.validUpdate = false;
            }
        },
        updatePassword: function() {
            this.isSubmittedPassword = true;
            if(this.oldPassword == this.user.password){
                if(this.oldPassword && this.newPassword){
                    this.user.password = this.newPassword;
                    let token = window.localStorage.getItem('token');
                    axios
                    .put('/users/' + this.username, this.user, {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    })
                    .then(response => {
                        this.wrongPassword = false;
                        this.validPassword = true;
                    })
                    .catch(error => {
                        if(error.response.status == 403){
                            window.localStorage.removeItem("token");
                            this.$router.push('/forbidden');
                        }else{
                            this.$router.push('/');
                        }               
                    })  
                } else {
                    this.validPassword = false;
                }
            } else {
                this.wrongPassword = true;
                this.validPassword = false;
            }
        }
    }
});