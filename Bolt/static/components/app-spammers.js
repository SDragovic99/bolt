Vue.component('app-spammers',{
    data: function(){
        return {
            users: []
        }
    },
    mounted: function(){
        let token = window.localStorage.getItem('token');

        axios.get('/spammers', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => {   
                this.users = response.data
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
            <div class="container-fluid py-5 gradient-header mb-3">
                <div class="container">
                    <h1 class="nunito-heading mt-4">Sumnjivi korisnici</h1>
                    <h5 class="nunito-heading mt-2">Korisnici koji su napravili više od 5 otkazivanja porudžbina u periodu od mesec dana</h5>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col" v-if="users.length == 0">Trenutno nema takvih korisnika.</div>
                    <div class="card mb-3" v-for="user in users">
                        <div class="row">
                            <div class="col-md-8 mb-1 ">
                                <div class="card-body">
                                    <h5 class="card-title">{{ user.username }}</h5>
                                </div>
                            </div>
                            <div class="col-md-4 mb-1 text-end">
                                <div class="card-body">
                                    <button type="button" class="btn btn-outline-danger" v-on:click="blockUser(user)"><i class="fa fa-ban"></i></button>
                                </div>
                            </div>
                            <div class="col-md-12 mb-3 ">
                                <div class="card-body">
                                    <h6 class="fw-light">{{ user.name }} {{ user.surname }}</h6>
                                    <p class="text-info">{{ user.customerType.type}}, {{ user.points }} bodova</p>
                                </div>
                            </div>
                        </div>                           
                    </div>  
                </div>
            </div>
        </div>

    `,
    methods: {
        blockUser: function(user){
            //TODO block user
        }
    }
})