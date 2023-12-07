<template>
    <div class="">
        <h4 class="text-center text-blue">CÀI ĐẶT</h4>
        <div class="p-4 card mt-4">
            <h6>1. Thay đổi cấu hình drive
                (<a href="https://www.youtube.com/watch?v=v3bME6_DTJk" target="_blank">Xem hướng dẫn</a>)
            </h6>

            <div class="row ">
                <div class="col-6">
                    <div class="form-group mb-3">
                        <label for="" class="form-label">Client id:</label>
                        <input v-model="drive.client_id" type="text" class="form-control">
                    </div>
                    <div class="form-group mb-3">
                        <label for="" class="form-label">Client Secret:</label>
                        <input v-model="drive.client_secret" type="text" class="form-control">
                    </div>
                    <div class="form-group mb-3">
                        <label for="" class="form-label">Refresh Token:</label>
                        <input v-model="drive.refresh_token" type="text" class="form-control">
                    </div>
                </div>

                <div class="col-6">
                    <div class="form-group mb-3">
                        <label for="" class="form-label">ID thư mục lưu trữ:</label>
                        <input v-model="drive.folder_id" type="text" class="form-control">
                    </div>
                    <div class="form-group mb-3">
                        <label for="" class="form-label">ID thư mục lưu hồ sơ:</label>
                        <input v-model="drive.folder_id_2" type="text" class="form-control">
                    </div>


                </div>
                <div>
                    <button @click="saveDrive()" class="btn-blue">Xác nhận</button>
                </div>

            </div>

        </div>
        <div class="card mt-3 p-4">
            <h6>2. Thay đổi cấu hình mail
                (<a href="https://123host.vn/tailieu/kb/hosting/huong-dan-tao-mat-khau-ung-dung-cho-gmail.html" target="_blank">Xem hướng dẫn</a>)
            </h6>
            <div class="form-group mb-3">
                <label for="" class="form-label">Email:</label>
                <input v-model="mail.mail_username" type="text" class="form-control">
            </div>
            <div class="form-group mb-3">
                <label for="" class="form-label">Mật khẩu ứng dụng:</label>
                <input v-model="mail.mail_password" type="text" class="form-control">
            </div>

            <div>
                <button @click="saveMail()" class="btn-blue">Xác nhận</button>
            </div>


        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {

    data() {
        return {
            drive: {
                client_id: '',
                client_secret: '',
                refresh_token: '',
                folder_id: '',
                folder_id_1: '',
                folder_id_2: ''
            },
            mail:{
                mail_username:'',
                mail_password:''
            }
        }
    },
    methods: {
        saveDrive() {
            axios.post('update-drive-config', this.drive).then(res => {
                if (res.data.success) {
                    this.$swal.fire('Đã sưả thành công!', '', 'success');

                }
            })
        },
        saveMail() {
            axios.post('update-mail-config', this.mail).then(res => {
                if (res.data.success) {
                    this.$swal.fire('Đã sưả thành công!', '', 'success');

                }
            })
        }
    }
}
</script>

<style scoped></style>