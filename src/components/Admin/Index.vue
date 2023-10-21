<template>
    <Sidebar></Sidebar>

    <section id="content">

        <Navbar></Navbar>
        <main>
            <RouterView></RouterView>
        </main>

    </section>
</template>

<script>
import Sidebar from './Sidebar.vue';
import Navbar from './Navbar.vue';
import $ from 'jquery'
export default {
    components: { Sidebar, Navbar },
    mounted() {
        $('#menuIcon').click(function () {
            $('#sidebar').toggleClass('hide');
        });



    }
}
</script>

<style  scoped>
@import "@/assets/css/style.css";
@import "@/assets/css/admin.css";
</style>