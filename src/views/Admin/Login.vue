<template>
    <div class="wrapper">
        <div class="container main">
            <div class="row">
                <div class="col-md-6 side-image">

                </div>
                <div class="col-md-6 right">
                    <form @submit.prevent="login()"  class="input-box">
                        <header>Đăng nhập</header>
                        <div class="input-field">
                            <input type="email" v-model="user.email" class="input" id="email" required autocomplete="off">
                            <label  for="email">Email</label>
                        </div>
                        <div class="input-field">
                            <input type="password" v-model="user.password" class="input" id="password" required>
                            <label for="password">Mật khẩu</label>
                        </div>
                        <div class="input-field">
                            <input type="submit" class="submit" value="Đăng nhập">

                        </div>
                        <div class="signin">
                            (Dành cho nhân viên)                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            user: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        async login() {
            const res = await axios.post("admin/login", this.user)
            if (res.data.success) {
                console.log(res.data)
                localStorage.setItem('tokenAdmin', res.data.token);
                this.$store.dispatch('setAdmin', res.data.user);                
                this.$router.push({ name: 'dashboard' })
            } else {
                alert(res.data.message)
            }

        }
    }
}
</script>

<style scoped>
@import "@/assets/css/login.css";

</style>