<template>
    <div class="login">
        <div class="row">
            <div class="card style-card">
                <div class="content-g">
                    <div class="conent-1">
                        <div class="row">
                            <div class="col-sm-12">
                                <img src="../../../../public/notificacion.png" width="20px" height="20px" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="content-2">
                        <div class="row">
                            <div class="col-sm-12">
                                Usuario
                                <input type="text" class="form-control" v-model="userCredentials.nameuser" />
                            </div>
                        </div>
                        <div class="row constasena">
                            <div class="col-sm-10">
                                Contraseña
                                <input :type="inputType" class="form-control" v-model="userCredentials.password" />
                            </div>
                            <div class="col-sm-2">
                                <button @click="InputType()" class="form-control btn btn-primary" style="font-size: 1rem;">
                                    <i :class="iconPass"></i>
                                </button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <button class="form-control btn btn-primary" @click="Login()" >Iniciar Sesión</button>
                            </div>
                        </div>
                    </div>  
                </div>
                <div v-show="isBusy == true">
                    <div class="row">
                        <div class="col-sm-12 busy">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        data() {
            let isBusy = false
            let inputType = 'password'
            let iconPass = 'uil uil-eye'

            const userCredentials = {
                nameuser: '',
                password: ''
            }

            return {
                inputType,
                iconPass,
                isBusy,
                userCredentials
            }
        },

        methods: {
            ...mapActions('auth', ['SingIn']),

            InputType() {
                if(this.inputType == 'password') {
                    this.inputType = 'text'
                    this.iconPass = 'uil uil-eye-slash'
                } else {
                    this.inputType = 'password'
                    this.iconPass = 'uil uil-eye'
                }
            },

            async Login() {
                this.isBusy = true
                const { ok } = await this.SingIn(this.userCredentials)

                if(ok) {
                    this.isBusy = false
                    console.log(this.$router);
                    this.$router.push({ name: 'analytics' })
                } else {
                    this.isBusy = false
                }
            }
        }
    }
</script>

<style scoped>
#app .login {
    display: flex;
    justify-content: center;
    align-items: center;
}

.style-card {
    padding: 1rem;
    width: 600px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.constasena {
    display: flex;
    align-items: center;
}

.constasena .col-sm-2 button {
    margin-top: 1.4rem;
}

.conent-1 .row .col-sm-12 img {
    height: 10rem;
    width: 10rem;
}

.content-g {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 1rem;
}
.conent-1 {
    display: flex;
    justify-content: center;
    align-items: center;
}

.content-2 {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.busy {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    font-size: 3rem;
    gap: 1rem;
    margin-top: 2rem;
}

.busy div {
   width: 12px;
   background-color: dodgerblue;
   animation: busy 1.8s linear infinite; 
}

.busy div:nth-child(2) {
    animation-delay: -0.25s;
}

@keyframes busy {
    0% {
        height: 12px;
    }

    25% {
        height: 50px;
    }

    50% {
        height: 10px;
    }

    75% {
        height: 25px;
    }

    100% {
        height: 12px;
    }
}
</style>