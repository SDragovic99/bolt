Vue.component('app-forbidden-page', {
    data: function(){
        return{}
    }, 
    template: `
        <div class="container">
            <div class="row justify-content-center">
                <div class="card text-center shadow-lg mt-5 bg-body rounded" style="width: 18rem;">
                    <div class="card-body p-3">
                        <img style="width: 15%; height: 16%;" src="assets/forbidden.png" alt="">
                        <h1 style="font-family: 'Nunito';" class="card-title">403</h1>                   
                        <p class="card-text text-muted">Nije vam dozvoljen pristup. Imate nalog?</p>
                        <a style="margin-top: 5%;" href="#" class="btn btn-primary" v-on:click="login">Ulogujte se</a>
                    </div>
                </div>
            </div>     
        </div>
    `,
    methods: {
        login: function(event){
            event.preventDefault();
            this.$router.push('/login')
        }
    }
})