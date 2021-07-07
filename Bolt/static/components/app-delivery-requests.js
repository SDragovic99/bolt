Vue.component('app-delivery-requests', {
    data: function() { 
        return {
            deliveryRequests: [],
            manager: {}
        }
    },
    mounted: function(){
        let token = window.localStorage.getItem('token');
        let username = parseJwt(token).sub

        axios.get("/managers/" + username, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(response =>{
            this.manager = response.data
            axios.get('/delivery-requests', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
                 })
                 .then(response => {
                    this.deliveryRequests = response.data
                    this.deliveryRequests = this.deliveryRequests.filter(item => {
                        return (item.restaurantId == this.manager.restaurantId)
                    })
                })
                .catch(error =>{
                    if(error.response.status == 403){
                        window.localStorage.removeItem("token");
                        this.$router.push('/forbidden');
                    }else{
                        this.$router.push('/');
                    }   
                })
        })
        

        
    },
    template: `
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="card" id="order-card" v-for="req in deliveryRequests">
                    <div class="row">
                        <div class="col-md-4 align-self-center">
                            <div class="card-body">
                                <h5 class="card-title">Id: {{ req.orderId }}</h5>
                            </div>
                        </div>
                        <div class="col-md-4 align-self-center">
                            <div class="card-body">
                                <h5 class="fw-light">Dostavljač: {{ req.delivererId }}</h5>
                            </div>
                        </div>
                        <div class="col-md-4 align-self-center text-end">
                            <div class="card-body">
                                <button type="button" class="btn btn-outline-secondary align-middle" v-on:click="approve(req)">Prihvati dostavu</button>
                            </div>
                        </div>
                    </div>                           
                </div>                           
            </div>
        </div>
    </div>
    `,
    methods:{
        approve: function(req) {
            let token = window.localStorage.getItem('token');
            axios.get("/deliverers/" + req.delivererId, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => {
                let deliverer = response.data
                deliverer.orders.push(req.orderId)
                axios.put("/deliverers/" + req.delivererId, deliverer, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                .then(response => {
                    axios.delete("/delivery-requests/" + req.orderId, {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    })
                    .then(response => this.deliveryRequests = [])
                    .catch(error => {
                        if(error.response.status == 403){
                            window.localStorage.removeItem("token");
                            this.$router.push('/forbidden');
                        }else{
                            this.$router.push('/');
                        }   
                    })

                    axios.get('/orders/' + req.orderId, {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }})
                        .then(response => {
                            let order = response.data
                            order.status = 'inTransport'
                            axios.put('/orders/' + order.id, order, {
                                headers: {
                                    'Authorization': 'Bearer ' + token
                                }})
                                .catch(error => {
                                    this.$router.push('/');
                                })
                        })
                        .catch(error => {
                            this.$router.push('/');
                        })
                })
            })
            .catch(error => {
                let deliverer = {username: req.delivererId, orders: [req.orderId]}
                axios.post("/deliverers", deliverer, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                .then(response => {
                    axios.delete("/delivery-requests/" + req.orderId, {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    })
                    .then(response => this.deliveryRequests = [])
                    .catch(error => {
                        if(error.response.status == 403){
                            window.localStorage.removeItem("token");
                            this.$router.push('/forbidden');
                        }else{
                            this.$router.push('/');
                        }   
                    })

                    axios.get('/orders/' + req.orderId, {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }})
                        .then(response => {
                            let order = response.data
                            order.status = 'inTransport'
                            axios.put('/orders/' + order.id, order, {
                                headers: {
                                    'Authorization': 'Bearer ' + token
                                }})
                                .catch(error => {
                                    this.$router.push('/');
                                })
                        })
                        .catch(error => {
                            this.$router.push('/');
                        })
                })
            })
        }
    }
})