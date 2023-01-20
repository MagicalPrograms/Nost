<template>
    <div class="col-sm-2">
        <aside id="sidebar" class="side-bar">
            <div class="side-head">
                <img src="../../../assets/notificacion.png" alt="logo" >
                <span>NOST</span>
            </div>
            <div class="side-body">
                <div class="items-list">
                    <router-link to="/" class="item item-open" v-b-tooltip.hover.right title="Analiticas">
                        <i class="uil uil-chart" ></i>
                        <span>Analiticas</span>
                    </router-link>
                    <router-link to="/Register" class="item item-open" v-b-tooltip.hover.right title="Crear Solicitud">
                        <i class="uil uil-plus-circle" ></i>
                        <span>Crear Solcitud</span>
                    </router-link>
                    <router-link to="/Request" class="item item-open" v-b-tooltip.hover.right title="Solicitudes">
                        <i class="uil uil-clipboard-notes" ></i>
                        <span>Solicitudes</span>
                    </router-link>
                    <router-link to="/formats" class="item item-open" v-b-tooltip.hover.right title="Formatos">
                        <i class="uil uil-file" ></i>
                        <span>Formatos</span>
                    </router-link>
                    <router-link to="/Settings" class="item item-open" v-b-tooltip.hover.right title="Configuración">
                        <i class="uil uil-setting" ></i>
                        <span>Configuración</span>
                    </router-link>
                </div>
            </div>
            <div class="side-footer">
                <div id="bntcollaps" class="form-control btn-collaps btns-open" @click="CollapsSide">
                    <i id="icon-close" class="uil uil-angle-double-right" ></i>
                    <span>cerrar barra</span>
                </div>
            </div>
        </aside>
    </div>
</template>

<script>
//import Loading from '../components/LoadingView.vue'


export default {
    data() {
        return {
            icon: 'angles-left',
        }
    },

    methods: {
        CollapsSide() {
            document.getElementById("sidebar").classList.toggle("open");
            document.getElementById("contentside").classList.toggle("open");

            const icon = document.getElementById("icon-close").classList[1]
            if(icon == "uil-angle-double-right"){
                document.getElementById("icon-close").classList.remove("uil-angle-double-right");
                document.getElementById("icon-close").classList.add("uil-angle-double-left");
            } else {
                document.getElementById("icon-close").classList.add("uil-angle-double-right");
                document.getElementById("icon-close").classList.remove("uil-angle-double-left");
            }

            console.log("object");
        }
    }
}
</script>

<style>
    .side-bar {
        position: fixed;
        height: calc( 100vh );
        width: 50px;
        background-color: var(--bg-color-secundary);
        transition: linear .3s;
    }

    .side-head {
        overflow: hidden;
        background-color: var(--bg-color-secundary); 
        height: 3.2rem; 
        display: flex; 
        color: #FFF;
        font-size: 2rem;
        font-weight: 600; 
        justify-content: flex-start; 
        padding: 0px 9px;
        align-items: center;
    }

    #sidebar.open .side-head > span {
        opacity: 1;
        visibility: visible;
        transition: linear .3s;
    }

    .side-head img {
        width: 2rem;
        height: 2rem;
    }

    .btns-open {
        width: 100% !important;
        transition: linear .3s;
    }

    #sidebar.open {
        width: 220px !important;
        transition: linear .3s;
    }

    .btn-collaps {
        padding: 0px 9px !important;
        border: none !important;
        border-top: .5 solid black;
        border-radius: 0 !important;
        background-color: transparent;
        position: absolute;
        bottom: 0;
        font-size: 13px !important;
        overflow: hidden;
        white-space: nowrap;
        background-color: var(--bg-color-secundary) !important;
        color: #FFF !important;
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .side-body {
        padding: .3rem 0rem;
        font-size: 15px;
    }

    .items-list div > span {
        opacity: 0;
        visibility: hidden;
        transition: linear .3s;
    }

    .side-head > span {
        opacity: 0;
        visibility: hidden;
        transition: linear .3s;
    }

    .btn-collaps > span {
        opacity: 0;
        visibility: hidden;
        transition: linear .3s;
    }

    #sidebar.open .items-list div > span {
        opacity: 1;
        visibility: visible;
        transition: linear .3s;
    }

    #sidebar.open .btn-collaps > span {
        opacity: 1;
        visibility: visible;
        transition: linear .3s;
    }



    .btn-collaps > span {
        opacity: 0;
        visibility: hidden;
    }

    .item-open{
        padding: .3rem .3rem !important;
        color: #FFF;
        text-decoration: none;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        transition: ease-in-out .3s;
        display: flex;
        align-items: baseline;
        column-gap: 0.5rem;
        border-radius: 7px;
    }

    .item-close {
        transition: linear .3s;
        /* justify-content: center; */
    }

    .item-close span {
        display: none;
        transition: linear .3s;
    }
    
    .item-open:hover,
    .item-close:hover {
        color: #FFF;
        background-color: rgba(0, 0, 0, 0.2);
        transition: ease-in-out .3s;
        cursor: pointer;
    }

    .hover-none:hover{
        background-color: transparent !important;
        color: #FFF !important;
        
    }

    .none{
        padding: 0 !important;
        margin: 0 !important;
        color: white;
    }

    .items-list{
        display: flex;
        flex-direction: column;
        row-gap: .3rem;
        padding: 10px;
    }

    .btn-collaps span {
        font-size: 1rem;
    }    

    .btn-collaps i {
        font-size: 2rem;
    }

    .items-list .item i{
        font-size: 1.3rem;
    }

    .router-link-exact-active{
        background-color: var(--bg-color-active);
    }
</style>