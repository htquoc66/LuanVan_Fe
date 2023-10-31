<template>
    <Header />
    <main class="bg-light">
        <router-view></router-view>

    </main>

    <Footer/>

</template>

<script>
import Header from './Header.vue'
import Footer from './Footer.vue'
export default {
    components: { Header, Footer },
}
</script>

<style  scoped>
main{
    min-height: 500px;
}
@import "@/assets/css/style.css";
@import "@/assets/css/user.css";
</style>