Vue.component('app-registration', {
    data: function(){
		return {
            user: {username: null, password: null, name: null, surname: null, gender: null, dateOfBirth: null}
        };
    },
    template: `
        <div>
            <app-navbar></app-navbar>
            <div class="container register">
                <div class="row justify-content-md-center">
                    <div class="col-5">
                        <h4 class="text-center">Napravi svoj Bolt nalog</h4>
                        <hr>
                        <form class="row g-3">
                            <div class="col-md-6">
                                <label for="name" class="form-label">Ime</label>
                                <input type="text" class="form-control" id="name" placeholder="Ime" v-model="user.name">
                            </div>
                            <div class="col-md-6">
                                <label for="surname" class="form-label">Prezime</label>
                                <input type="text" class="form-control" id="surname" placeholder="Prezime" v-model="user.surname">
                            </div>
                            <div class="col-md-9">
                                <label for="dateOfBirth" class="form-label">Datum rođenja</label>
                                <input type="date" class="form-control" id="dateOfBirth" v-model="user.dateOfBirth">
                            </div>
                            <div class="col-md-3">
                                <label for="gender" class="form-label">Pol</label>
                                <select id="gender" class="form-select" v-model="user.gender">
                                    <option value="male">M</option>
                                    <option value="female">Ž</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label for="username" class="form-label">Korisničko ime</label>
                                <input type="text" class="form-control" id="username" placeholder="Korisničko ime" v-model="user.username">
                            </div>
                            <div class="col-md-6">
                                <label for="password" class="form-label">Šifra</label>
                                <input type="password" class="form-control" id="password" placeholder="Šifra" v-model="user.password">
                            </div>
                            <div class="d-grid gap-2">
                                <button class="btn btn-primary" type="button" v-on:click="register">Registruj se</button>
                            </div>
                        </form>
                    </div>
                </div>
        </div>
    </div>
                   
    `,
    methods: {
        register: function(){
            axios.post("/users", this.user).then(response => (router.push('/login')));
        }
    }
});