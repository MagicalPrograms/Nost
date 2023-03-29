<template>
    <div class="Login_Container">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style>
#app .Login_Container{
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc( 100vh );
}

.Login_Container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>