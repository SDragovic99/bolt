Vue.component('app-profiles', {
    data: function(){
		return {
            users: []
        };
    },
    mounted: function(){
        let token = window.localStorage.getItem('token');
        axios.get('/users', {
            headers: {
                'Authorization': 'Bearer ' + token
            }})
            .then(response => this.users = response.data)
            .catch(error =>  this.$router.push('/'));
    },
    template: `
        <div>
            <app-navbar></app-navbar>
            <div class="container">
                <div class="row">
                <div class="col-md-9 mt-3">
                    <div class="input-group search-bar">
                        <input type="text" class="form-control" placeholder="Korisničko ime" aria-label="Recipient's username" aria-describedby="button-addon2">
                        <button class="btn btn-outline-secondary" type="button" id="button-addon2"><i class="fa fa-search"></i></button>
                        <input type="text" class="form-control" placeholder="Ime" aria-label="Recipient's name" aria-describedby="button-addon2">
                        <button class="btn btn-outline-secondary" type="button" id="button-addon2"><i class="fa fa-search"></i></button>
                        <input type="text" class="form-control" placeholder="Prezime" aria-label="Recipient's surname" aria-describedby="button-addon2">
                        <button class="btn btn-outline-secondary" type="button" id="button-addon2"><i class="fa fa-search"></i></button>
                    </div>
                </div>    
                </div>
            </div>
            <div class="container mt-3">
                <div class="row justify-content-between">
                    <div class="col-md-9">
                        <div class="card outline-card mb-3"  v-for="user in users">
                            <div class="row">
                                <div class="col-md-10 mb-3">
                                    <div class="card-body">
                                        <h5 class="card-title">{{ user.username }}</h5>
                                        <p class="card-text"><small>Ime i prezime: </small><small class="text-muted">{{ user.name }} {{ user.surname }}</small></p>
                                        <p class="card-text"><small class="text-muted">{{ user.role | enumToString }}</small></p>
                                        
                                    </div>
                                </div>
                                <div class="col-md-2 text-end">
                                    <button type="button" class="btn btn-outline-dark"><i class="fa fa-trash"></i></button>
                                    <button type="button" class="btn btn-outline-danger"><i class="fa fa-ban"></i></button>
                                </div>
                            </div>                           
                        </div>                       
                    </div>
                    <div id="filter-section" class="col-md-2">
                        <h5 class="text-left">Filteri</h5>
                        <div class="text-muted">
                        <div class="form-check">
                                <input class="form-check-input" type="radio" name="filter" id="admin">
                                <label class="form-check-label" for="admin">Administratori</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="filter" id="manager">
                                <label class="form-check-label" for="manager">Menadžeri</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="filter" id="deliverer">
                                <label class="form-check-label" for="deliverer">Dostavljači</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="filter" id="customer">
                                <label class="form-check-label" for="customer">Kupci</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="filter" id="gold">
                                <label class="form-check-label" for="gold">Zlatni korisnici</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="filter" id="silver">
                                <label class="form-check-label" for="silver">Srebrni korisnici</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="filter" id="bronze">
                                <label class="form-check-label" for="bronze">Bronzani korisnici</label>
                            </div>
                        </div>
                        <hr>
                        <h5 class="text-left">Sortiraj</h5>
                        <div>
                            <select class="form-select" id="inputGroupSelect04">
                                <option selected>Rastuće</option>
                                <option value="1">Opadajuće</option>
                            </select>
                            <div class="mt-2 text-muted">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="sort" id="name">
                                <label class="form-check-label" for="name">Ime</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="sort" id="surname">
                                <label class="form-check-label" for="surname">Prezime</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="sort" id="username">
                                <label class="form-check-label" for="username">Korisničko ime</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="sort" id="points">
                                <label class="form-check-label" for="points">Broj sakupljenih bodova</label>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    methods: {

    },
    filters: {
        enumToString: function(value) {
            if(value == "admin"){
                return "Administrator"
            } else if(value == "manager"){
                return "Menadžer"
            } else if(value == "deliverer"){
                return "Dostavljač"
            } 
            return "Kupac"
        }
    }
});