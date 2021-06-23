Vue.component('app-registration-workers', {
    data: function(){
		return {
            user: {username: null, password: null, name: null, surname: null, gender: null, dateOfBirth: null, role: null},
            isSubmitted: false,
            uniqueUsername: true
        };
    },
    template: `
    <div>
    <app-navbar></app-navbar>
    <div class="container register">
        <div class="row justify-content-md-center">
            <div class="col-5">
                <h4 class="text-center">Napravite novi Bolt nalog</h4>
                <hr>
                <form class="row g-3">
                    <div class="col-md-6">
                        <label for="name" class="form-label">Ime</label>
                        <input type="text" class="form-control" id="name" placeholder="Ime" v-model="user.name" v-bind:class="{'form-control':true, 'is-invalid' : !user.name && isSubmitted}">
                        <div class="invalid-feedback">Popunite polje</div>
                    </div>
                    <div class="col-md-6">
                        <label for="surname" class="form-label">Prezime</label>
                        <input type="text" class="form-control" id="surname" placeholder="Prezime" v-model="user.surname" v-bind:class="{'form-control':true, 'is-invalid' : !user.surname && isSubmitted}">
                        <div class="invalid-feedback">Popunite polje</div>
                    </div>
                    <div class="col-md-9">
                        <label for="dateOfBirth" class="form-label">Datum rođenja</label>
                        <input type="date" id="dateOfBirth" v-model="user.dateOfBirth" v-bind:class="{'form-control':true, 'is-invalid' : !user.dateOfBirth && isSubmitted}">
                        <div class="invalid-feedback">Odaberite datum</div>
                    </div>
                    <div class="col-md-3">
                        <label for="gender" class="form-label">Pol</label>
                        <select id="gender" v-model="user.gender" v-bind:class="{'form-select':true, 'is-invalid' : !user.gender && isSubmitted}">
                            <option value="male">M</option>
                            <option value="female">Ž</option>
                        </select>
                        <div class="invalid-feedback">Odaberite pol</div>
                    </div>
                    <div class="col-md-12">
                        <label for="role" class="form-label">Uloga</label>
                        <select id="role" v-model="user.role" v-bind:class="{'form-select':true, 'is-invalid': !user.role && isSubmitted}">
                            <option value="manager">Menadžer restorana</option>
                            <option value="deliverer">Dostavljač</option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <label for="username" class="form-label">Korisničko ime</label>
                        <input type="text" id="username" placeholder="Korisničko ime" v-model="user.username" v-bind:class="{'form-control':true, 'is-invalid' : !user.username && isSubmitted}">
                        <div class="invalid-feedback">Popunite polje</div>
                    </div>
                    <div class="col-md-6">
                        <label for="password" class="form-label">Šifra</label>
                        <input type="password" id="password" placeholder="Šifra" v-model="user.password" v-bind:class="{'form-control':true, 'is-invalid' : !user.password && isSubmitted}">
                        <div class="invalid-feedback">Popunite polje</div>
                    </div>
                    <div class="d-grid gap-2">
                        <button class="btn btn-primary" type="button" v-on:click="register">Registruj</button>
                    </div>
                    <div class="col-md-12 text-danger text-center" :style="{visibility: uniqueUsername ? 'hidden' : 'visible'}">
                        Korisničko ime je već zauzeto.
                    </div>
                </form>
            </div>
        </div>
    </div>
                   
    `,
    methods: {
        register: function(){
            this.isSubmitted = true;
            if(this.user.name && this.user.surname && this.user.dateOfBirth && this.user.gender && this.user.role && this.user.username && this.user.password){
                axios
                .post("/users", this.user)
                .then(response => (router.push('/')))
                .catch(error =>  this.uniqueUsername = false);
            }  
        }
    }
});