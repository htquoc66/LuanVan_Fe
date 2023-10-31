<template>
    <header>
        <div class="topbar">
            <div class="container d-flex justify-content-between">
                <div class="text-white">
                    <i class="fa-regular fa-envelope"></i> : congchungcantho@gmail.com
                </div>
                <div v-if="customer" class="text-white">
                    <i class="fa-solid fa-user"></i> &nbsp;{{ customer.name }}
                    &nbsp;
                    <a href="" @click="signOut()">
                        <i class="fas fa-sign-out-alt"></i>
                    </a>
                </div>
                <div v-else>
                    <RouterLink to="/login" class="text-white">
                        <i class="fa-solid fa-user"></i> &nbsp; Đăng nhập
                    </RouterLink>
                </div>
            </div>
        </div>
        <nav class="bg-light">
            <div class="">
                <div class="container d-flex align-items-center justify-content-between">
                    <div class="logo">
                        <RouterLink to="/" class="d-flex align-items-center">
                            <img src="@/assets/logo.png" width="75" alt="">
                            <h5 class="text-blue m-0">
                                CÔNG CHỨNG CẦN THƠ
                            </h5>
                        </RouterLink>
                    </div>

                    <div>
                        <div class="h6 m-0">Hotline: 0909 888 999</div>
                        <small>01 Đường 3/2, Xuân Khánh, Ninh Kiều, Cần Thơ</small>
                    </div>

                    <div>
                        <div class="h6 m-0">Thời gian làm việc:</div>
                        <small>
                          Thứ 2 đến Thứ 7: Từ 8h00 - 17h:00
                        </small>
                    </div>
                </div>
            </div>
            <div class="">
                <div class="container">
                    <hr class="m-0">
                    <ul class="menu">
                        <li class="item" :class="{ active: $route.path === '/' }">
                            <RouterLink to="/" class="text-dark">Trang chủ</RouterLink>
                        </li>
                        <li class="item" :class="{ active: $route.path === '/introduce' }">
                            <RouterLink to="/introduce" class="text-dark">Giới thiệu</RouterLink>
                        </li>
                        <li class="item" :class="{ active: $route.path === '/service' }">
                            <RouterLink to="/service" class="text-dark">Dịch vụ</RouterLink>
                        </li>
          
                        <li class="item" :class="{ active: $route.path === '/lawTexts' }">
                            <RouterLink to="/lawTexts" class="text-dark">Văn bản pháp luật</RouterLink>
                        </li>
                        <li class="item" :class="{ active: $route.path === '/booking' }">
                            <RouterLink to="/booking" class="text-dark">Đặt lịch</RouterLink>
                        </li>
                        <li class="item" :class="{ active: $route.path === '/contact' }">
                            <RouterLink to="/contact" class="text-dark">Liên hệ</RouterLink>
                        </li>
                        <li v-if="customer" class="item" :class="{ active: $route.path === '/documents' }">
                            <RouterLink to="/documents" class="text-dark">Hồ sơ</RouterLink>
                        </li>
                    </ul>
                    <hr class="m-0">
                </div>
            </div>
        </nav>

   
    </header>
</template>
<script>
export default{
    data(){
        return{
            customer:[]
        }
    },
    created(){
        var storeData = localStorage.getItem('store');
        this.customer = JSON.parse(storeData).user;
    },
    methods:{
        signOut(){
            localStorage.removeItem('tokenUser');
            this.$store.dispatch("logoutUser");
            this.$router.push('/login')
        }
    }
}
</script>

<style>

</style>

