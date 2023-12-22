<template>
    <div v-if="hasPermission(1)" class="">
        <h4 class="text-center text-blue">CÀI ĐẶT</h4>
        <div class="p-4 card mt-4">
            <h6>1. Thay đổi cấu hình drive
                (<a href="https://www.youtube.com/watch?v=v3bME6_DTJk" target="_blank">Xem hướng dẫn</a>)
            </h6>

            <form class="row" action="" @submit.prevent="saveDrive()">
                <div class="col-6">
                    <div class="form-group mb-3">
                        <label for="" class="form-label">Client id:</label>
                        <input required v-model="drive.client_id" type="text" class="form-control">
                    </div>
                    <div class="form-group mb-3">
                        <label for="" class="form-label">Client Secret:</label>
                        <input required v-model="drive.client_secret" type="text" class="form-control">
                    </div>
                    <div class="form-group mb-3">
                        <label for="" class="form-label">Refresh Token:</label>
                        <input required v-model="drive.refresh_token" type="text" class="form-control">
                    </div>
                </div>

                <div class="col-6">
                    <div class="form-group mb-3">
                        <label for="" class="form-label">ID thư mục lưu trữ:</label>
                        <input required v-model="drive.folder_id" type="text" class="form-control">
                    </div>
                    <div class="form-group mb-3">
                        <label for="" class="form-label">ID thư mục lưu hồ sơ:</label>
                        <input required v-model="drive.folder_id_2" type="text" class="form-control">
                    </div>


                </div>
                <div>
                    <button class="btn-blue">Xác nhận</button>
                </div>
            </form>


        </div>
        <div class="card mt-3 p-4">
            <h6>2. Thay đổi cấu hình mail
                (<a href="https://123host.vn/tailieu/kb/hosting/huong-dan-tao-mat-khau-ung-dung-cho-gmail.html"
                    target="_blank">Xem hướng dẫn</a>)
            </h6>
            <form @submit.prevent=saveMail()>
                <div class="form-group mb-3">
                    <label for="" class="form-label">Email:</label>
                    <input required v-model="mail.mail_username" type="text" class="form-control">
                </div>
                <div class="form-group mb-3">
                    <label for="" class="form-label">Mật khẩu ứng dụng:</label>
                    <input required v-model="mail.mail_password" type="text" class="form-control">
                </div>

                <div>
                    <button class="btn-blue">Xác nhận</button>
                </div>
            </form>


        </div>
        <div class="card p-4 mt-3">
            <h6>3. Thay đổi thông tin ngân hàng</h6>
            <form @submit.prevent = "update()">
                <div class="form-group mb-3">
                <label for="" class="form-label ">Chọn ngân hàng</label>
                <select required class="form-select" v-model="bankInfo.acqId">
                    <option v-for="(bank, index) in banks" :value="bank.bin" :key="index">
                        {{ bank.name }}
                    </option>
                </select>
            </div>
            <div class="form-group mb-3">
                <label for="" class="form-label">Nhập số tài khoản</label>
                <input required class="form-control" v-model="bankInfo.accountNo" type="text" />
            </div>
            <div class="form-group mb-3">
                <label for="" class="form-label">Nhập tên chủ tài khoản</label>
                <input required class="form-control" v-model="bankInfo.accountName" @input="handleInput" type="text" />
            </div>
            <div>
                <button  class="btn-blue">Xác nhận</button>

            </div>
            </form>

        </div>
    </div>
    <div v-else class="not-have-access">
        <div class="text-center">
            <h3>Bạn không đủ quyền truy cập!</h3>
            <RouterLink to="/admin/dashboard" class="mt-3 btn btn-success">Trở về trang chủ</RouterLink>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { hasPermission } from '@/utils';
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
            mail: {
                mail_username: '',
                mail_password: ''
            },
            bankInfo: {
                accountNo: '',
                accountName: '',
                acqId: ''
            },
            banks: []
        }
    },
    created() {
        this.getBanks()

    },
    methods: {
        hasPermission,
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
        },
        async update() {

            // Gửi yêu cầu PUT hoặc POST tùy thuộc vào việc bạn cập nhật hoặc tạo mới dữ liệu
            await axios.post('update-bank-info', this.bankInfo).then(res => {
                console.log(res.data);
                if (res.data.success) {
                    this.$swal.fire('Đã sưả thành công!', '', 'success');

                }
            });

        },
        handleInput() {
            // Chuyển đổi chuỗi thành chữ IN HOA không dấu
            this.bankInfo.accountName = this.bankInfo.accountName
                .toUpperCase() // Chuyển đổi thành chữ IN HOA
                .replace(/[^A-Z ]/g, ''); // Loại bỏ các ký tự không phải là chữ cái IN HOA hoặc dấu cách
        },

        async getBanks() {
            axios.get('https://api.vietqr.io/v2/banks').then(res => {
                this.banks = res.data.data;
            })
        }
    }
}
</script>

<style scoped></style>