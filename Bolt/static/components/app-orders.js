Vue.component('app-orders',{
    data: function(){
        return {
            orders: [],
            restaurants: [],
            role: '',
            manager: {}
        }
    },
    mounted: function(){
        let token = window.localStorage.getItem('token');
        let username = parseJwt(token).sub
        this.role = parseJwt(token).Role;
        axios.get('/orders', {
            headers: {
                'Authorization': 'Bearer ' + token
            }})
            .then(response => {
                this.orders = response.data
            }).catch(error => {
                if(error.response.status == 403){
                    window.localStorage.removeItem("token");
                    this.$router.push('/forbidden');
                }else{
                    this.$router.push('/');
                }    
            })

        axios.get("/restaurants")
            .then(response => this.restaurants = response.data)   

        if(this.role == 'manager'){
            axios.get("/managers/" + username, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then(response =>{
               this.manager = response.data
            })
        }
    },
    template: `
        <div class="container">
            <div class="row">
                <div class="col">
                    <div class="card" id="order-card" v-for="order in filteredOrders">
                        <div class="row">
                            <div class="col-md-3 align-self-center">
                                <div class="card-body">
                                    <h5 class="card-title">{{ restaurantName(order.restaurantId) }}</h5>
                                </div>
                            </div>
                            <div class="col-md-3 align-self-center">
                                <div class="card-body">
                                    <h5 class="fw-light">{{ order.date}}</h5>
                                </div>
                            </div>
                            <div class="col-md-3 align-self-center">
                                <div class="card-body">
                                    <h5 class="fw-normal">RSD {{ order.total }}</h5>
                                </div>
                            </div>
                            <div class="col-md-3 text-end">
                                <div class="card-body" v-if="role != 'customer'">
                                    <button type="button" class="btn btn-outline-secondary align-middle"> {{order.status | nextStatus}}</button>
                                </div>
                                <div class="card-body" v-if="role == 'customer' && order.status != 'processing'">
                                    <p class="text-muted"> {{order.status | status}} </p>
                                </div>
                                <div class="card-body" v-if="role == 'customer' && order.status == 'processing'">
                                <button type="button" class="btn btn-outline-danger align-middle">Otkaži</button>
                                </div>
                            </div>
                        </div>                           
                    </div>                           
                </div>
            </div>
        </div>
    `,
    methods: {
        restaurantName: function(value) {
            let restaurantName = ''
            this.restaurants.some(function(restaurant) {
                if(restaurant.id == value){
                    restaurantName = restaurant.name
                }
            })
            return restaurantName
        }
    },
    computed: {
        filteredOrders: function(){
            let temp = this.orders
            let token = window.localStorage.getItem('token');
            let username = parseJwt(token).sub

            if(this.role == 'customer'){
                temp = temp.filter((item) => {
                    return (item.customerId == username)
                })
            }
            if(this.role == 'manager'){
                temp = temp.filter((item) => {
                    return (item.restaurantId == this.manager.restaurantId)
                })
            }
            if(this.role == 'deliverer'){
                temp = temp.filter((item) => {
                    return (item.status == 'waitingForDelivery')
                })
            }

            return temp
        }
    },
    filters: {
        nextStatus: function(value) {
            let role = parseJwt(window.localStorage.getItem('token')).Role
            if(value == 'processing'){
                return "U pripremi"
            }
            if(value == 'inPreparation'){
                return "Čeka dostavljača"
            }
            if(value == 'waitingForDelivery' && role == 'manager'){
                return "U transportu"
            }
            if(value == 'waitingForDelivery' && role == 'deliverer'){
                return "Zatraži dostavu"
            }
            if(value == 'inTransport'){
                return "Dostavljena"
            }
            return ''
        },
        status: function(value){
            if(value == 'inPreparation'){
                return "Priprema se..."
            }
            if(value == 'waitingForDelivery'){
                return "Čeka dostavljača..."
            }
            if(value == 'inTransport'){
                return "U transportu..."
            }
            if(value == 'delivered'){
                return "Dostavljena"
            }
            if(value == 'cancelled'){
                return "Otkazana"
            }
            return ''
        }
    } 
})