Vue.component('app-profiles', {
    data: function(){
		return {
            users: [],
            customers: [],
            searchedName: '',
            searchedUsername: '',
            searchedSurname: '',
            selectedRoleFilters: [],
            selectedTypeFilters: [],
            sortBy: 'name',
            order: 'asc'
        };
    },
    mounted: function(){
        let token = window.localStorage.getItem('token');
        axios.get('/users', {
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
        
        axios.get('/customers', {
            headers: {
                'Authorization': 'Bearer ' + token
            }})
            .then(response => this.customers = response.data)
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
                <div class="row">
                <div class="col-md-9 mt-3">
                    <div class="input-group search-bar">
                        <input type="text" class="form-control" placeholder="Korisničko ime" aria-label="Recipient's username" aria-describedby="button-addon2" v-model="searchedUsername">
                        <input type="text" class="form-control" placeholder="Ime" aria-label="Recipient's name" aria-describedby="button-addon2" v-model="searchedName">
                        <input type="text" class="form-control" placeholder="Prezime" aria-label="Recipient's surname" aria-describedby="button-addon2" v-model="searchedSurname">
                        <span class="p-1 align-middle"><i class="fa fa-search"></i></span>
                    </div>
                </div>    
                </div>
            </div>
            <div class="container mt-3">
                <div class="row justify-content-between">
                    <div class="col-md-9">
                        <div class="card outline-card mb-3"  v-for="user in filteredUsers">
                            <div class="row">
                                <div class="col-md-10 mb-3">
                                    <div class="card-body">
                                        <h5 class="card-title">{{ user.username }}</h5>
                                        <p class="card-text"><small>Ime i prezime: </small><small class="text-muted">{{ user.name }} {{ user.surname }}</small></p>
                                        <p class="card-text"><small class="text-muted">{{ user.role | enumToString }}</small></p>
                                        <p class="card-text"><small class="text-info">{{ customerType(user) }}</small></p>
                                    </div>
                                </div>
                                <div class="col-md-2 text-end">
                                    <button type="button" class="btn btn-outline-dark"><i class="fa fa-trash"></i></button>
                                    <button type="button" class="btn btn-outline-danger"><i class="fa fa-ban"></i></button>
                                </div>
                            </div>                           
                        </div>                       
                    </div>
                    <div class="col-md-2">
                        <h5 class="text-left nunito-heading">Filteri</h5>
                        <div class="text-muted">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="admin" value="admin" v-model="selectedRoleFilters">
                            <label class="form-check-label" for="admin">Administratori</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="manager" value="manager" v-model="selectedRoleFilters">
                            <label class="form-check-label" for="manager">Menadžeri</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="deliverer" value="deliverer" v-model="selectedRoleFilters">
                            <label class="form-check-label" for="deliverer">Dostavljači</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="customer" value="customer" v-model="selectedRoleFilters">
                            <label class="form-check-label" for="customer">Kupci</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="gold" value="gold" v-model="selectedTypeFilters">
                            <label class="form-check-label" for="gold">Zlatni kupci</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="silver" value="silver" v-model="selectedTypeFilters">
                            <label class="form-check-label" for="silver">Srebrni kupci</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="bronze" value="bronze" v-model="selectedTypeFilters">
                            <label class="form-check-label" for="bronze">Bronzani kupci</label>
                        </div>
                        </div>
                        <hr>
                        <h5 class="text-left nunito-heading">Sortiraj</h5>
                        <div>
                            <select class="form-select" id="inputGroupSelect04" v-model="order">
                                <option selected value="asc">Rastuće</option>
                                <option value="desc">Opadajuće</option>
                            </select>
                            <div class="mt-2 text-muted">
                                <select class="form-select" v-model="sortBy">
                                    <option value="name">Po imenu</option>
                                    <option value="surname">Po prezimenu</option>
                                    <option value="username">Po korisničkom imenu</option>
                                    <option value="points">Po broju bodova</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    methods: {
        customerType: function(user){
            let customerType = ''
            this.customers.some(function(customer){
                if(customer.user.username == user.username){
                    if(customer.customerType){
                        customerType = "Tip kupca: " + customer.customerType.type + ", " + customer.points + " bodova"
                    }else {
                        customerType = "Tip kupca: regular, " +  customer.points + " bodova"
                    }
                }
            })
            return customerType
        }
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
    },
    computed: {
        filteredUsers(){
            let temp = this.users

            if(this.sortBy == 'points'){
                let customers = this.customers
                let users = []
                customers = customers.sort((a, b) =>{
                    return a.points - b.points
                })
                customers.forEach(customer => {
                    temp.forEach(user => {
                        if(user.username == customer.user.username){
                            users.push(user)
                        }
                    })
                })
                temp = users
            }

            temp = temp.sort((a, b) => {
                if(this.sortBy == 'name'){
                    let fa = a.name.toLowerCase(), fb = b.name.toLowerCase()
                    return alphabeticalSorter(fa, fb)
                } else if(this.sortBy == 'surname'){
                    let fa = a.surname.toLowerCase(), fb = b.surname.toLowerCase()
                    return alphabeticalSorter(fa, fb)
                } else if(this.sortBy == 'username'){
                    let fa = a.username.toLowerCase(), fb = b.username.toLowerCase()
                    return alphabeticalSorter(fa, fb)
                }
            })

            if(this.order == 'desc'){
                temp.reverse()
            }

            if(this.searchedName && this.searchedName != ''){
                temp = temp.filter((item) => {
                    return item.name.toUpperCase().includes(this.searchedName.toUpperCase())
                })
            }

            if(this.searchedSurname && this.searchedSurname != ''){
                temp = temp.filter((item) => {
                    return item.surname.toUpperCase().includes(this.searchedSurname.toUpperCase())
                })
            }

            if(this.searchedUsername && this.searchedUsername != ''){
                temp = temp.filter((item) => {
                    return item.username.toUpperCase().includes(this.searchedUsername.toUpperCase())
                })
            }

            if(this.selectedRoleFilters.length > 0){
                let filteredByAllRoles = []
                for(var i = 0; i < this.selectedRoleFilters.length; i++){
                    let filteredByRole = []
                    filteredByRole = temp.filter((item) => {
                        return (item.role == this.selectedRoleFilters[i])
                    })
                    filteredByAllRoles.push(...filteredByRole)
                }
                temp = filteredByAllRoles
            }

            if(this.selectedTypeFilters.length > 0){
                let filteredByAllTypes = []
                for(var i = 0; i < this.selectedTypeFilters.length; i++){
                    let filteredByType = []
                    filteredByType = this.customers.filter((item) => {
                        if(item.customerType){
                            return (item.customerType.type == this.selectedTypeFilters[i])
                        }
                    })
                    filteredByAllTypes.push(...filteredByType)
                }
                let users = []
                filteredByAllTypes.forEach(customer => {
                    this.users.forEach(user => {
                        if(user.username == customer.user.username){
                            users.push(user)
                        }
                    })
                })
                temp = users
            }

            

            return temp
        }
    }
});