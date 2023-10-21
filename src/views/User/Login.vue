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
                            <input type="email" v-model="customer.email" class="input" id="email" required autocomplete="off">
                            <label  for="email">Email</label>
                        </div>
                        <div class="input-field">
                            <input type="password" v-model="customer.password" class="input" id="password" required>
                            <label for="password">Mật khẩu</label>
                        </div>
                        <div class="input-field">
                            <input type="submit" class="submit" value="Đăng nhập">

                        </div>
                        <div class="signin">
                            Bạn chưa có tài khoản? <RouterLink to="/register">Đăng ký ngay</RouterLink>
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
            customer: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        async login() {
            const res = await axios.post("/login", this.customer)
            if (res.data.success) {
                console.log(res.data)
                localStorage.setItem('tokenUser', res.data.token);
                this.$store.dispatch('setUser', res.data.customer);        
                this.$router.push('/')
        
            } else {
                alert(res.data.message)
            }

        }
    }
}
</script>

<style scoped>

/* login */
.wrapper {
    background: #ececec;
    padding: 0 20px 0 20px;
}

.main {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.row {
    width: 900px;
    height: 550px;
    border-radius: 10px;
    background: #fff;
    box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.2);
}

.side-image {
    background-image: url("@/assets/login.jpg");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    border-radius: 10px 0 0 10px;
}

img {
    width: 35px;
    position: absolute;
    top: 30px;
    left: 30px;
}

.text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.text p {
    color: #fff;
    font-size: 18px;
}

i {
    font-weight: 400;
    font-size: 15px;
}

.right {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.input-box {
    width: 330px;
    box-sizing: border-box;
}

.input-box header {
    font-weight: 700;
    font-size: 24px;
    text-align: center;
    margin-bottom: 24px;
}

.input-field {
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 0 10px 0 10px;
}

.input {
    height: 45px;
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    outline: none;
    margin-bottom: 20px;
    color: #40414a;
}

.input-box .input-field label {
    position: absolute;
    top: 10px;
    left: 10px;
    pointer-events: none;
    transition: .5s;
}

.input-field .input:focus~label {
    top: -10px;
    font-size: 13px;
}

.input-field .input:valid~label {
    top: -10px;
    font-size: 13px;
    color: #5d5076;
}

.input-field .input:focus,
.input-field .input:valid {
    border-bottom: 1px solid #743ae1;
}

.submit {
    border: none;
    outline: none;
    height: 45px;
    background: #ececec;
    border-radius: 5px;
    transition: .4s;
}

.submit:hover {
    background: rgba(37, 95, 156, 0.9);
    color: #fff;
}

.signin {
    text-align: center;
    font-size: small;
    margin-top: 25px;
}

span a {
    text-decoration: none;
    font-weight: 700;
    color: #000;
    transition: .5s;
}

span a:hover {
    text-decoration: underline;
    color: #000;
}

@media only screen and (max-width: 768px) {
    .side-image {
        border-radius: 10px 10px 0 0;
    }

    img {
        width: 35px;
        position: absolute;
        top: 20px;
        left: 47%;
    }

    .text {
        position: absolute;
        top: 70%;
        text-align: center;
    }

    .text p,
    i {
        font-size: 17px;
    }

    .row {
        max-width: 420px;
        width: 100%;
    }
}


</style>