Vue.component('app-my-profile', {
    data: function(){
		return {
            user: {},
            isSubmitted: false,
            full_name: '',
            username: '',
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
                window.localStorage.removeItem("token");
                this.$router.push('/login');
            })
    },
    template: `
    <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div class="container-fluid mx-lg-5">
          <a class="navbar-brand" href="#">Bolt</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto flex-nowrap">
                <li class="nav-item">
                  <a class="nav-link" aria-current="page" href="#">Profil</a>
                </li>
                <li class="nav-item">
                    <button class="btn btn-outline-dark"><i class="fa fa-shopping-bag"></i></button>
                </li>
            </ul>
          </div>
        </div>
    </nav>

    <div id="header" class="container-fluid py-5">
        <div class="container p-3 mt-5 col-md-11 justify-content-bottom">
            <h1 class="fw-bold">Moj nalog</h1>
        </div>		
	</div>

    <div id="my-profile" class="container">
        <div class="row justify-content-around">
            <div class="col-md-2 shadow-lg p-5 mb-5 bg-body rounded">
                <div class="text-center"><i class="fa fa-user-circle fa-5x"></i></div>
                <h5 class="fw-bold text-center">{{full_name}}</h5>
            </div>
            <div class="col-md-9 shadow-lg p-5 mb-5 bg-body rounded justify-content-center">
                <h5 class="text-left">Vaši detalji</h5>
                <p class="text-muted">Da li želite da promenite nešto? Ne zaboravite da kliknete "Snimi izmene" na kraju forme</p>
                <form class="row g-3">
                    <div class="col-md-5">
                        <label for="name" class="form-label">Ime</label>
                        <input type="text" class="form-control" id="name" placeholder="Ime" v-model="user.name" v-bind:class="{'is-invalid' : !user.name && isSubmitted}">
                        <div class="invalid-feedback">Popunite polje</div>    
                    </div>
                    <div class="col-md-5">
                        <label for="surname" class="form-label">Prezime</label>
                        <input type="text" class="form-control" id="surname" placeholder="Prezime" v-model="user.surname" v-bind:class="{'is-invalid' : !user.surname && isSubmitted}">
                        <div class="invalid-feedback">Popunite polje</div>
                    </div>
                    <div class="col-md-5">
                        <label for="dateOfBirth" class="form-label">Datum rođenja</label>
                        <input type="date" class="form-control" id="dateOfBirth" v-model="user.dateOfBirth" v-bind:class="{'is-invalid' : !user.dateOfBirth && isSubmitted}">
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
                        <button class="btn btn-primary" id="liveToastBtn" type="button" v-on:click='update'>Snimi izmene</button>
                    </div>
                </form>
            </div>
            <div class="col-md-2"></div>
            <div class="col-md-9 shadow-lg p-5 mb-5 bg-body rounded">
                <h5 id="password-header" class="text-left">Promena lozinke</h5>
                <div class="row g-3">
                    <div class="col-md-5">
                        <label for="password" class="form-label">Trenutna šifra</label>
                        <input type="password" class="form-control" id="current_password">
                    </div> 
                    <div class="col-md-5">
                        <label for="password" class="form-label">Nova šifra</label>
                        <input type="password" class="form-control" id="new_password">
                    </div>  
                    <div class="w-100"></div>             
                    <div class="d-grid col-md-5">
                        <button class="btn btn-primary" type="button">Promeni lozinku</button>
                    </div>   
                </div>                      
            </div>
        </div>
    </div>
    </div>
    `,
    methods: {
        update: function() {
            this.isSubmitted = true;
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
                })
            }
        }
    }
});