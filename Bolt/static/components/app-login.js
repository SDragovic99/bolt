Vue.component('app-login', {
    data: function(){
		return {};
    },
    template: `
        <div>
            <app-navbar></app-navbar>
            <div class="container login">
                <div class="row justify-content-md-center">
                    <div class="col-5">
                        <h4 class="text-center">Prijavi se na svoj Bolt nalog</h4>
                        <hr>
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="username">
                            <label for="username">Korisničko ime</label>
                        </div>
                        <div class="form-floating">
                            <input type="password" class="form-control" id="password">
                            <label for="password">Šifra</label>
                        </div>
                        <div class="d-grid gap-2">
                            <button class="btn btn-primary" type="button">Prijavi se</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    `,
    methods: {
        
    }
});