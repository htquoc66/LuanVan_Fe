<template>
    <div class="wrapper">
        <div class="container main">
            <div class="row">
                <div class="col-md-6 side-image">
                </div>

                <div class="col-md-6 right">
                    <form @submit.prevent="register()" class="input-box">
                        <header>Đăng ký tài khoản</header>
                        <div class="input-field">
                            <input v-model="customer.name" type="text" class="input" required>
                            <label>Họ và tên</label>
                        </div>
                        <div class="input-field">
                            <input v-model="customer.email" type="email" class="input" required>
                            <label>Email</label>
                        </div>
                        <div class="input-field">
                            <input v-model="customer.phone" type="text" class="input" required>
                            <label>Số điện thoại</label>
                        </div>
                        <div class="input-field">
                            <input type="password" v-model="customer.password" class="input" id="password" required
                                @blur="validate()" :class="{ 'is-invalid': errors.password }">
                            <div class="invalid-feedback" v-if="errors.password">{{ errors.password }}</div>
                            <label for="password">Mật khẩu</label>
                        </div>
                        <div class="input-field">
                            <input type="password" v-model="customer.c_password" class="input" id="c_password" required
                                @blur="validate()" :class="{ 'is-invalid': errors.c_password }">
                            <div class="invalid-feedback" v-if="errors.c_password">{{ errors.c_password }}</div>
                            <label for="c_password">Nhập lại mật khẩu</label>
                        </div>
                        <div class="input-field">
                            <input type="submit" class="submit" value="Đăng ký">

                        </div>
                        <div class="signin">
                            Bạn đã có tài khoản? <RouterLink to="/login">Đăng nhập ngay</RouterLink>
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
                type_id: 1,
                name: '',
                phone: '',
                email: '',
                password: '',
                c_password: ''
            },
            errors: {
                password: '',
                c_password: ''
            },
            isValid: true

        }
    },
    methods: {
        validate() {
            this.isValid = true;
            this.errors.password = '';
            this.errors.c_password = '';
            if (!this.checkStrongPassword(this.customer.password)) {
                this.errors.password = "Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, và ký tự đặc biệt";
                this.isValid = false;
            }
            if (this.customer.c_password != this.customer.password) {
                this.errors.c_password = "Nhập lại mật khẩu không đúng";
                this.isValid = false;
            }

        },
        register() {
            this.validate();
            if (this.isValid) {

                axios.post('customers', this.customer).then(res => {
                    if (res.data.success) {
                        this.$router.push('/login')
                    }
                })
            } 
        },
        checkStrongPassword(password) {
            // Mật khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, và ký tự đặc biệt
            const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
            return regex.test(password);
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
        display: none;
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