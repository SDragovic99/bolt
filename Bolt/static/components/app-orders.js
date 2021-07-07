Vue.component('app-orders',{
    data: function(){
        return {
            orders: [],
            restaurants: [],
            role: '',
            manager: {},
            deliverer: {},
            username: '',
            deliveryRequests: [],
            sortBy: 'default',
            order: 'asc',
            selectedStatusFilters: [],
            selectedTypeFilters: [],
            searchedName: '',
            minCost: null,
            maxCost: null,
            minDate: null,
            maxDate: null
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
                        <input type="text" class="form-control" placeholder="Naziv restorana" v-if="role != 'manager'" v-model="searchedName">
                        <input type="number" class="form-control" placeholder="Cena [od]" v-model="minCost">
                        <input type="number" class="form-control" placeholder="Cena [do]" v-model="maxCost">
                        <input type="date" class="form-control" placeholder="Datum [od]" v-model="minDate">
                        <input type="date" class="form-control" placeholder="Datum [do]" v-model="maxDate">
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
                                    <input class="form-check-input" type="checkbox" id="processing" value="processing" v-model="selectedStatusFilters">
                                    <label class="form-check-label" for="proccessing">Obrada</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="inPreparation" value="inPreparation" v-model="selectedStatusFilters">
                                    <label class="form-check-label" for="inPreparation">Priprema se</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="waitingForDelivery" value="waitingForDelivery" v-model="selectedStatusFilters">
                                    <label class="form-check-label" for="waitingForDelivery">Čeka dostavljača</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="inTransport" value="inTransport" v-model="selectedStatusFilters">
                                    <label class="form-check-label" for="inTransport">U transportu</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="delivered" value="delivered" v-model="selectedStatusFilters">
                                    <label class="form-check-label" for="delivered">Dostavljena</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="notDelivered" value="notDelivered" v-model="selectedStatusFilters">
                                    <label class="form-check-label" for="notDelivered">Nedostavljena</label>
                                </div>
                            </div>
                            <div class="col" v-if="role != 'manager'">
                                <h6 class="nunito-heading">Tip restorana</h6>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="italian" value="italian" v-model="selectedTypeFilters">
                                    <label class="form-check-label" for="italian">Italijanski</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="chinese" value="chinese" v-model="selectedTypeFilters">
                                    <label class="form-check-label" for="chinese">Kineski</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="barbeque" value="barbeque" v-model="selectedTypeFilters">
                                    <label class="form-check-label" for="barbeque">Roštilj</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="vegan" value="vegan" v-model="selectedTypeFilters">
                                    <label class="form-check-label" for="vegan">Veganski</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="collapse" id="collapse2">
                        <select class="form-select" id="inputGroupSelect04" v-model="order">
                            <option value="asc">Rastuće</option>
                            <option value="desc">Opadajuće</option>
                        </select>
                        <div class="mt-2 text-muted">
                            <select class="form-select" v-model="sortBy">
                                <option value="default">Sortiraj po...</option>
                                <option value="name" v-if="role != 'manager'">Po nazivu restorana</option>
                                <option value="total">Po ceni</option>
                                <option value="date">Po datumu</option>
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
                                <div class="card-body" v-if="role != 'customer' && (order.status == 'delivered' || order.status == 'cancelled')">
                                    <p class="text-muted"> {{order.status | status}} </p>
                                </div>

                                <div class="card-body" v-if="role == 'customer' && order.status == 'processing'">
                                    <button type="button" class="btn btn-outline-danger align-middle" v-on:click="cancelOrder(order)">Otkaži</button>
                                </div>
                                <div class="card-body" v-if="role == 'customer' && order.status == 'delivered'">
                                    <button type="button" class="btn btn-outline-info align-middle" v-on:click="addComment(order)">Ostavi komentar</button>
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
        restaurantType: function(value) {
            let restaurantType = ''
            this.restaurants.some(function(restaurant) {
                if(restaurant.id == value){
                    restaurantType = restaurant.type
                }
            })
            return restaurantType
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
        },
        cancelOrder: function(order) {
            order.status = 'cancelled';
            let token = window.localStorage.getItem('token');
            axios
            .put('/orders/' + order.id, order, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .catch(error => {
                if(error.response.status == 403){
                    window.localStorage.removeItem("token");
                    this.$router.push('/forbidden');
                }               
            })
        },
        addComment: function(order){
            this.$router.push('/add-comment/' + order.restaurantId);
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

            if(this.searchedName && this.searchedName != ''){ 
                temp = temp.filter((item) => {
                    return this.restaurantName(item.restaurantId).toUpperCase().includes(this.searchedName.toUpperCase())
                })
            }

            if(this.minCost){
                temp = temp.filter((item) => {
                    return (item.total >= this.minCost)
                })
            }

            if(this.maxCost){
                temp = temp.filter((item) => {
                    return (item.total <= this.maxCost)
                })
            }

            if(this.minDate){
                temp = temp.filter((item) => {
                    return (new Date(item.date) >= new Date(this.minDate))
                })
            }

            if(this.maxDate){
                temp = temp.filter((item) => {
                    return (new Date(item.date) <= new Date(this.maxDate))
                })
            }

            if(this.selectedStatusFilters.length > 0){
                let filteredByAll = []
                for(var i = 0; i < this.selectedStatusFilters.length; i++){
                    let filtereByOne = []
                    filtereByOne = temp.filter(item => {
                        if(this.selectedStatusFilters[i] == 'notDelivered'){
                            return (item.status != 'delivered')
                        }
                        return (item.status == this.selectedStatusFilters[i])
                    })
                    filteredByAll.push(...filtereByOne)
                }
                temp = [ ...new Set(filteredByAll)]
            }

            if(this.selectedTypeFilters.length > 0){
                let filteredByAll = []
                for(var i = 0; i < this.selectedTypeFilters.length; i++){
                    let filteredByOne = []
                    filteredByOne = temp.filter(item => {
                        return (this.restaurantType(item.restaurantId) == this.selectedTypeFilters[i])
                    })
                    filteredByAll.push(...filteredByOne)
                }
                temp = [ ... new Set(filteredByAll)]
            }

            temp = temp.sort((a, b) => {
                if(this.sortBy == 'name') {
                    let fa = this.restaurantName(a.restaurantId).toLowerCase(), fb = this.restaurantName(b.restaurantId).toLowerCase()
                    return alphabeticalSorter(fa, fb)
                } else if (this.sortBy == 'total') {
                    return a.total - b.total
                } else if (this.sortBy == 'date') {
                    return new Date(a.date) - new Date(b.date)
                }
            })

            if(this.order == 'desc'){
                temp.reverse()
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
            if(value == 'cancelled'){
                return "Otkazana"
            }
            return ''
        }
    } 
})