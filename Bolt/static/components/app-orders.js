Vue.component('app-orders',{
    data: function(){
        return {
            orders: [],
            restaurants: [],
            role: '',
            manager: {},
            deliverer: {},
            username: '',
            deliveryRequests: []
        }
    },
    mounted: function(){
        let token = window.localStorage.getItem('token');
        this.username = parseJwt(token).sub
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

        if(this.role == 'deliverer'){
            axios.get("/delivery-requests/" + this.username, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }})
                .then(response => this.deliveryRequests = response.data)
                .catch(error => {
                    if(error.response.status == 403){
                        window.localStorage.removeItem("token");
                        this.$router.push('/forbidden');
                    }else{
                        this.$router.push('/');
                    }    
                })
            
            axios.get("/deliverers/" + this.username, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => {
                this.deliverer = response.data        
            })
            .catch(error => {
                if(error.response.status == 403){
                    window.localStorage.removeItem("token");
                    this.$router.push('/forbidden');
                }
                this.deliverer = {username: this.username, orders: []}   
            })
        }
        

        if(this.role == 'manager'){
            axios.get("/managers/" + this.username, {
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
                <div class="col-md-12 mt-3">
                    <div class="input-group search-bar">
                        <input type="text" class="form-control" placeholder="Naziv restorana" v-if="role != 'manager'">
                        <input type="number" class="form-control" placeholder="Cena [od]">
                        <input type="number" class="form-control" placeholder="Cena [do]">
                        <input type="date" class="form-control" placeholder="Datum [od]">
                        <input type="date" class="form-control" placeholder="Datum [do]">
                    </div>
                </div> 
                <p class="mt-2 btn-group" role="group">
                    <button class="btn btn-outline-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="false" aria-controls="collapse1">Filteri</button>
                    <button class="btn btn-outline-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="false" aria-controls="collapse2">Sortiraj</button>
                </p>
            </div>

            <div class="row">
                <div class="col">
                    <div class="collapse" id="collapse1">
                        <div class="row">
                            <div class="col">
                                <h6 class="nunito-heading">Status porudžbine</h6>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="proccessing" value="proccessing">
                                    <label class="form-check-label" for="proccessing">Obrada</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="inPreparation" value="inPreparation">
                                    <label class="form-check-label" for="inPreparation">Priprema se</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="waitingForDelivery" value="waitingForDelivery">
                                    <label class="form-check-label" for="waitingForDelivery">Čeka dostavljača</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="inTransport" value="inTransport">
                                    <label class="form-check-label" for="inTransport">U transportu</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="delivered" value="delivered">
                                    <label class="form-check-label" for="delivered">Dostavljena</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="notDelivered" value="notDelivered">
                                    <label class="form-check-label" for="notDelivered">Nedostavljena</label>
                                </div>
                            </div>
                            <div class="col" v-if="role != 'manager'">
                                <h6 class="nunito-heading">Tip restorana</h6>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="italian" value="italian">
                                    <label class="form-check-label" for="italian">Italijanski</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="chinese" value="chinese">
                                    <label class="form-check-label" for="chinese">Kineski</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="barbeque" value="barbeque">
                                    <label class="form-check-label" for="barbeque">Roštilj</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="vegan" value="vegan">
                                    <label class="form-check-label" for="vegan">Veganski</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="collapse" id="collapse2">
                        <select class="form-select" id="inputGroupSelect04">
                            <option value="asc">Rastuće</option>
                            <option value="desc">Opadajuće</option>
                        </select>
                        <div class="mt-2 text-muted">
                            <select class="form-select">
                                <option value="default">Sortiraj po...</option>
                                <option value="name" v-if="role != 'manager'">Po nazivu restorana</option>
                                <option value="location">Po ceni</option>
                                <option value="rating">Po datumu</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div> 

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
                                <div class="card-body" v-if="role == 'manager' && (order.status == 'processing' || order.status == 'inPreparation')">
                                    <button type="button" class="btn btn-outline-secondary align-middle" v-on:click="updateStatus(order)"> {{order.status | nextStatus}}</button>
                                </div>
                                <div class="card-body" v-if="role == 'manager' && (order.status == 'waitingForDelivery' || order.status == 'inTransport')">
                                    <p class="text-muted"> {{order.status | status}} </p>
                                </div>
                                <div class="card-body" v-if="role == 'deliverer' && order.status != 'delivered'">
                                    <button type="button" class="btn btn-outline-secondary align-middle" v-on:click="updateStatus(order)" :disabled="deliveryRequests.some(e => e.orderId === order.id)"> {{order.status | nextStatus}}</button>
                                </div>
                                <div class="card-body" v-if="role != 'customer' && order.status == 'delivered'">
                                    <p class="text-muted"> {{order.status | status}} </p>
                                </div>

                                <div class="card-body" v-if="role == 'customer' && order.status == 'processing'">
                                    <button type="button" class="btn btn-outline-danger align-middle">Otkaži</button>
                                </div>
                                <div class="card-body" v-if="role == 'customer' && order.status == 'delivered'">
                                    <button type="button" class="btn btn-outline-info align-middle">Ostavi komentar</button>
                                </div>
                                <div class="card-body" v-if="role == 'customer' && order.status != 'processing' && order.status != 'delivered'">
                                    <p class="text-muted"> {{order.status | status}} </p>
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
        },
        updateStatus: function(order) {
            let status = order.status
            let token = window.localStorage.getItem('token')

            if(status == 'processing'){
                order.status = 'inPreparation'
            }
            else if(status == 'inPreparation'){
                order.status = 'waitingForDelivery'
            }
            
            else if(status == 'waitingForDelivery'){   
                let deliveryRequest = {orderId: order.id, restaurantId: order.restaurantId, delivererId: this.username}
                axios.post('/delivery-requests', deliveryRequest, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                    })
                    .then(response => {
                        this.deliveryRequests.push(deliveryRequest)
                    })
                    .catch(error => {
                        if(error.response.status == 403){
                            window.localStorage.removeItem("token");
                            this.$router.push('/forbidden');
                        }else{
                            this.$router.push('/');
                        } 
                    })
            }
            else if(status == 'inTransport'){
                order.status = 'delivered'
            }
         
            axios.put('/orders/' + order.id, order, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }})
                .catch(error => {
                    this.$router.push('/');
                })
        }
    },
    computed: {
        filteredOrders: function(){
            let temp = this.orders
            let token = window.localStorage.getItem('token');

            if(this.role == 'customer'){
                temp = temp.filter((item) => {
                    return (item.customerId == this.username)
                })
            }
            if(this.role == 'manager'){
                temp = temp.filter((item) => {
                    return (item.restaurantId == this.manager.restaurantId)
                })
            }
            if(this.role == 'deliverer'){
                temp = temp.filter((item) => {
                    if(this.deliverer.orders){
                        return (item.status == 'waitingForDelivery' || this.deliverer.orders.includes(item.id))
                    }else{
                        return (item.status == 'waitingForDelivery')
                    }  
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
            if(value == 'waitingForDelivery' && role == 'deliverer'){
                return "Zatraži dostavu"
            }
            if(value == 'inTransport' && role == 'deliverer'){
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
            return ''
        }
    } 
})