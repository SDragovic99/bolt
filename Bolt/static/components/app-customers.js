Vue.component('app-customers',{
    data: function(){
        return {
            customers: [],
            uniqueArr: []
        }
    },
    mounted: function(){
        let token = window.localStorage.getItem('token');
        let username = parseJwt(token).sub;
        axios.get('/managers/' + username, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => {   
                axios.get('/customers/' + response.data.restaurantId, {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    })
                    .then(response => {
                        this.customers = response.data
                        const map = new Map()
                        for(let item of response.data){
                            if(!map.has(item.username)){
                                map.set(item.username,true)
                                this.uniqueArr.push(item)
                            }
                        }
                    })
                    .catch(error => {
                        this.$router.push('/')
                    })
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
                    <h1 class="nunito-heading mt-4">Kupci</h1>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col" v-if="uniqueArr.length == 0">Trenutno nema kupaca koji su naručivali iz vašeg restorana.</div>
                    <div class="card mb-3" v-for="customer in uniqueArr">
                        <div class="row">
                            <div class="col-md-8 mb-1 ">
                                <div class="card-body">
                                    <h5 class="card-title">{{ customer.username }}</h5>
                                </div>
                            </div>
                            <div class="col-md-4 mb-1 text-end">
                                <div class="card-body">
                                    <p class="text-muted">Broj porudžbina: {{ getNumberOfOrders(customer.username) }}</p>
                                </div>
                            </div>
                            <div class="col-md-12 mb-3 ">
                                <div class="card-body">
                                    <h6 class="fw-light">{{ customer.name }} {{ customer.surname }}</h6>
                                    <p class="text-info">{{ customer.customerType.type}}, {{ customer.points }} bodova</p>
                                </div>
                            </div>
                        </div>                           
                    </div>  
                </div>
            </div>
        </div>

    `,
    methods: {
        getNumberOfOrders: function(username){
            let num = 0
            this.customers.forEach(element => {
                if(element.username === username){
                    num += 1
                }
            });
            return num
        }
    }
})