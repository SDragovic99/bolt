Vue.component('app-navbar', {
    data: function(){
		return {
            loggedIn: window.localStorage.getItem('token'), 
            role: '',
            username: ''
        };
    },
    mounted: function(){
        if(this.loggedIn){
            this.role = parseJwt(window.localStorage.getItem('token')).Role;
            this.username = parseJwt(window.localStorage.getItem('token')).sub;
        }
    },
    template: `
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container">
                <a class="navbar-brand" href="#" v-on:click="home"><img src="/assets/bolt.svg"></a>
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
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {{username}}
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDarkDropdownMenuLink">
                                <li><a class="nav-link" aria-current="page" href="#" v-on:click="my_profile">Moj profil</a></li>
                                <li><a class="nav-link" aria-current="page" href="#" v-on:click="allProfiles">Korisnici</a></li>
                                <li><a class="nav-link" href="#" v-on:click="register_worker">Registracija radnika</a></li>
                                <li><a class="nav-link" aria-current="page" href="#" v-on:click="newRestaurant">Dodaj novi restoran</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="nav-link" aria-current="page" href="#" v-on:click="logout">Odjavi se</a></li>
                            </ul>
                        </li>
                    </ul>

                    <ul class="navbar-nav ms-auto flex-nowrap" v-if="role == 'manager' && loggedIn">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {{username}}
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDarkDropdownMenuLink">
                                <li><a class="nav-link" aria-current="page" href="#" v-on:click="my_profile">Moj profil</a></li>
                                <li><a class="nav-link" href="#" v-on:click="myRestaurant">Moj restoran</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="nav-link" aria-current="page" href="#" v-on:click="logout">Odjavi se</a></li>
                            </ul>
                        </li>
                    </ul>

                    <ul class="navbar-nav ms-auto flex-nowrap" v-if="role == 'customer' && loggedIn">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {{username}}
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDarkDropdownMenuLink">
                                <li><a class="nav-link" aria-current="page" href="#" v-on:click="my_profile">Moj profil</a></li>
                                <li><a class="nav-link" aria-current="page" href="#">Moje porudžbine</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="nav-link" aria-current="page" href="#" v-on:click="logout">Odjavi se</a></li>
                            </ul>
                        </li>
                    </ul>
                        
                    <ul class="navbar-nav ms-auto flex-nowrap" v-if="role == 'deliverer' && loggedIn">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {{username}}
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDarkDropdownMenuLink">
                                <li><a class="nav-link" aria-current="page" href="#" v-on:click="my_profile">Moj profil</a></li>
                                <li><a class="nav-link" aria-current="page" href="#">Porudžbine</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="nav-link" aria-current="page" href="#" v-on:click="logout">Odjavi se</a></li>
                            </ul>
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
        },
        register_worker: function(event){
            event.preventDefault();
            this.$router.push('/register-worker');
        }, 
        home: function(event){
            event.preventDefault();
            this.$router.push('/');
        },
        my_profile: function(event){
            event.preventDefault();
            this.$router.push('/my-profile');
        }, 
        allProfiles: function(event){
            event.preventDefault();
            this.$router.push('/all-users');
        },
        newRestaurant: function(event){
            event.preventDefault();
            this.$router.push('/new-restaurant');
        },
        myRestaurant: function(event){
            event.preventDefault();
            let username = parseJwt(window.localStorage.getItem('token')).sub;
            axios.get('/managers/' + username)
                .then(response => {
                    if(response.data.restaurantId != 0){
                        this.$router.push('/restaurant-overview/' + response.data.restaurantId)
                    }
                })
                .catch(error => {
                    this.$router.push('/')
                })
            
        }
    }
});