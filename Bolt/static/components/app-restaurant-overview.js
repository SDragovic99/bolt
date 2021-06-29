Vue.component('app-restaurant-overview', {
    data: function(){
        return {
            restaurant: {},
            username: ''
        };
    },
    mounted: function() {
        let token = window.localStorage.getItem('token');
        this.username = parseJwt(window.localStorage.getItem('token')).sub;
        axios
            .get('/restaurants/' + this.username, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => {
                this.restaurant = response.data;
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
    <img :src=restaurant.imagePath class = "image-source" alt = "Glavna slika">
    </div>
    `,
    methods: {

    }
})