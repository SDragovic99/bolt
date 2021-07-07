Vue.component('app-my-profile', {
    data: function(){
		return {
            user: {},
            role: '',
            isSubmittedUpdate: false,
            isSubmittedPassword: false,
            wrongPassword: false,
            full_name: '',
            username: '',
            oldPassword: '',
            newPassword: '',
            validUpdate: false,
            validPassword: false,
            breadcrumb: 'personal-info'
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
                this.role = this.user.role
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

        <div class="container">
            <h1 class="fw-bold nunito-heading mt-4">Moj nalog</h1>
            <div id="horizontal-nav-wrapper">
                <ul id="horizontal-nav">
                    <li><a v-on:click.prevent="toInfoBreadcrumb" v-bind:style="{'font-weight' : breadcrumb == 'personal-info' ? 500 : 200}">Lični podaci</a></li>
                    <li v-if="role != 'admin'" v-on:click.prevent="toOrdersBreadcrumb"><a v-bind:style="{'font-weight' : breadcrumb == 'orders' ? 500 : 200}">Porudžbine</a></li>
                    <li v-if="role == 'manager'" v-on:click.prevent="toRequestsBreadcrumb"><a v-bind:style="{'font-weight' : breadcrumb == 'requests' ? 500 : 200}">Zahtevi za dostavu</a></li>
                </ul>
            </div>
        </div>

        <div class="container">
            <div class="row justify-content-around" v-if="breadcrumb == 'personal-info'">
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
                    <h5 id="password-header" class="text-left nunito-heading">Promena lozinke</h5>
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

            <app-orders v-if="breadcrumb == 'orders'"></app-orders>

            <app-delivery-requests v-if="breadcrumb == 'requests'"></app-delivery-requests>
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
        },
        toInfoBreadcrumb: function() {
            this.breadcrumb = 'personal-info'
        },
        toOrdersBreadcrumb: function() {
            this.breadcrumb = 'orders'
        },
        toRequestsBreadcrumb: function() {
            this.breadcrumb = 'requests'
        }
    }
});