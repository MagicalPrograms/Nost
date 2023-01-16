<template>
    <div>
        <h3>Configuración</h3>
        <div>
            <span class="sub-titles">Temas</span>
        </div>
        <div class="d-flex" style="align-items: center; align-content: center; column-gap: 5px;">
            <button class="btn-mode original-mode" @click="changTheme('original')">Original</button>
            <button class="btn-mode blue-mode" @click="changTheme('blue')">Azul</button>
            <button class="btn-mode green-mode"  @click="changTheme('green')">Verde</button>
            <button class="btn-mode dark-mode" @click="changTheme('dark')">Modo Obscuro</button>
        </div>
    </div>
</template>

<script>

    export default {
        
        data() {
            let theme = localStorage.getItem('data-theme');

            return {
                Dark: true,
                theme
            }
        },

        methods: {
            changTheme(themeColor) {
                switch(themeColor){
                    case 'original':
                        document.documentElement.setAttribute("data-theme", "original") // set theme to dark
                        localStorage.setItem("data-theme", "original") // save theme to local storage
                        break;
                    case 'blue':
                        document.documentElement.setAttribute("data-theme", "blue") // set theme to dark
                        localStorage.setItem("data-theme", "blue") // save theme to local storage
                        break;
                    case 'green':
                        document.documentElement.setAttribute("data-theme", "green") // set theme to dark
                        localStorage.setItem("data-theme", "green") // save theme to local storage
                        break;
                    case 'dark':
                        document.documentElement.setAttribute("data-theme", "dark") // set theme to dark
                        localStorage.setItem("data-theme", "dark") // save theme to local storage
                        break;

                }
                
            }
        },

    }
</script>

<style scoped>

    .btn-mode {
        color: #FFF;
        border: none;
        padding: 10px;
        border-radius: 10px;
    }
    .original-mode {
        background-color: #9F2241;
    }
    .blue-mode {
        background-color: #4724d3;
    }
    .green-mode {
        background-color: #24d350;
    }
    .dark-mode {
        background-color: rgb(43, 41, 41);
    }

</style>