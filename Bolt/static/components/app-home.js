Vue.component('app-home', {
    data: function(){
		return {};
    },
    template: `
        <div id="jumbotron">
            <app-navbar></app-navbar>
            <div class="container">
                <div class="row"> 
                    <div class="col-lg-12">
                        <div id="content">
                            <h3>Otkrij i poruči</h3>
                            <h3>odličnu hranu.</h3>
                            <button class="btn btn-outline-dark btn-lg" v-on:click="showRestaurants">Pogledaj restorane u našoj ponudi</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    `,
    methods: {
        showRestaurants: function(){
            this.$router.push('/discover-restaurants')
        }
    }
});