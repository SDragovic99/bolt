Vue.component('app-navbar', {
    data: function(){
		return {
            loggedIn: window.localStorage.getItem('token'), 
            role: ''
        };
    },
    mounted: function(){
        if(this.loggedIn){
            this.role = parseJwt(window.localStorage.getItem('token')).Role;
        }
    },
    template: `
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid mx-lg-5">
            <a class="navbar-brand" href="#">Bolt</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto flex-nowrap" v-if="!loggedIn">
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="#" v-on:click="login">Prijava</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" v-on:click="register">Registracija</a>
                    </li>
                </ul>
                <ul class="navbar-nav ms-auto flex-nowrap" v-if="role == 'admin' && loggedIn">
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="#">Svi profili</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="#">Dodaj novi restoran</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="#">Moj profil</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="#" v-on:click="logout">Odjavi se</a>
                    </li>
                </ul>
                
            </div>
            </div>
        </nav>
    `,
    methods: {
        login: function(event){
            event.preventDefault();
            this.$router.push('/login')
        },
        register: function(event){
            event.preventDefault();
            this.$router.push('/register')
        },
        logout: function(event){
            event.preventDefault();
            window.localStorage.removeItem("token");
            this.loggedIn = false;
            this.$router.push('/')
        }
    }
});