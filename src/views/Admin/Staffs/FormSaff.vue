<template>
    <div class="modal-container" v-show="showModal">
        <div class="modal-overlay" @click="closeModal"></div>
        <div class="modal-content" style="width: 75vw;">
            <span class="modal-close" @click="closeModal"><i class="fa-solid fa-circle-xmark"></i></span>
            <h4 class="text-center mt-3 mb-5 text-blue">Thông tin nhân viên</h4>
            <form @submit.prevent="saveStaff()">
                <div class="row">
                    <div class="col-6">
                        <div class="form-groups mb-3">
                            <label class="form-label">Họ tên:</label>
                            <input v-model="staff.name" type="text" class="form-control">
                        </div>
                        <div class="form-groups mb-3">
                            <label class="form-label">Email:</label>
                            <input v-model="staff.email" type="text" class="form-control">
                        </div>
                        <div class="form-groups mb-3">
                            <label class="form-label">Số điện thoại:</label>
                            <input v-model="staff.phone" type="text" class="form-control">
                        </div>

                    </div>
                    <div class="col-6">
                        <div class="form-groups mb-3">
                            <label class="form-label">Ngày sinh:</label>
                            <input v-model="staff.date_of_birth" type="date" class="form-control">
                        </div>

                        <div class="form-groups mb-3">
                            <label class="form-label">Giới tính:</label>
                            <select class="form-select" v-model="staff.gender">
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                            </select>
                        </div>
                        <div class="form-groups mb-3">
                            <label class="form-label">Vai trò:</label>
                            <div class="d-flex justify-content-around">
                                <div class="form-check" v-for="(role, index) in allRoles" :key="index">
                                    <input class="form-check-input" type="checkbox" v-model="roles" :value="role.id"
                                        :id="role.name">
                                    <label class="form-check-label" :for="role.name">
                                        {{ role.name }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr class="my-4">
                <div class="d-flex justify-content-between">
                    <button type="reset" class="btn-white" @click="closeModal">
                        <i class="fa-solid fa-left-long"></i>
                        Quay lại
                    </button>
                    <button v-if="staffIdToEdit == null" type="submit" class="btn-blue">
                        <i class="fa-solid fa-check"></i>
                        Xác nhận thêm nhân viên mới
                    </button>
                    <button v-else type="submit" class="btn-blue">
                        <i class="fa-solid fa-check"></i>
                        Lưu thay đổi
                    </button>
                    <button type="reset" class="btn-white" @click="resetForm()">
                        <i class="fa-solid fa-x"></i>
                        Xóa thông tin
                    </button>
                </div>

            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            staff: {
                name: '',
                email: '',
                phone: '',
                date_of_birth: '',
                gender: 'Nam',
                password: ''
            },
            allRoles: [],
            roles: []
        }
    },
    props: {
        showModal: {
            type: Boolean,
            required: true,
        },
        getStaffs: {
            type: Function,
            required: true,
        },
        staffIdToEdit: {
            type: Number,
            default: null,
        },
    },
    created() {
        this.getAllRoles();
    },

    watch: {
        staffIdToEdit(newStaffId, oldStaffId) {
            this.getStaff(newStaffId);
        }
    },
    methods: {
        async getAllRoles() {
            await axios.get('roles').then(res => {
                this.allRoles = res.data;
            })
        },
        closeModal() {
            this.resetForm();
            this.$emit('closeModal'); // Phát ra sự kiện 'closeModal'
        },
        generateRandomPassword() {
            const length = 8;
            const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
            let password = "";
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * charset.length);
                password += charset[randomIndex];
            }
            return password;
        },
        async getStaff(staffId) {
            if (staffId != null) {
                await axios.get(`staffs/${staffId}`)
                    .then(res => {
                        this.staff = res.data;
                        if (Array.isArray(this.staff.roles)) {
                            this.roles = this.staff.roles.map(role => role.id);
                        } else {
                            this.roles = [];
                        }
                    })
            }
        },
        saveStaff() {
            if (this.staffIdToEdit == null) {
                this.staff.password = this.generateRandomPassword();

                axios.post('staffs', this.staff)
                    .then(res => {
                        if (res.data.success) {
                            axios.post(`staff/${res.data.id}/roles`, { roles: this.roles }).then(response => {
                                if (response.data.success) {
                                    this.$swal.fire('Đã thêm thành công!', '', 'success');
                                    this.closeModal();
                                    this.getStaffs()
                                }
                            })
                        }
                    })
                    .catch(error => {
                        if (error.response && error.response.status === 422) {
                            this.$swal.fire({
                                icon: 'error',
                                title: 'Lỗi',
                                text: error.response.data.message,
                            })
                        } else {
                            console.log(error);
                            alert('Đã xảy ra lỗi khi thêm khách hàng.'); // Xử lý lỗi không xác định
                        }
                    });
            } else {
                axios.put(`staffs/${this.staffIdToEdit}`, this.staff)
                    .then(res => {
                        if (res.data.success) {
                            axios.put(`staff/${this.staffIdToEdit}/roles`, { roles: this.roles }).then(response => {
                                if (response.data.success) {
                                    this.$swal.fire('Đã sửa thành công!', '', 'success');
                                    this.resetForm();
                                    this.closeModal();
                                    this.getStaffs();
                                }
                            })
                        }
                    })
                    .catch(error => {
                        if (error.response && error.response.status === 422) {
                            this.$swal.fire({
                                icon: 'error',
                                title: 'Lỗi',
                                text: error.response.data.message,
                            })
                        } else {
                            console.log(error);
                            alert('Đã xảy ra lỗi khi sửa nhân viên.'); // Xử lý lỗi không xác định
                        }
                    });
            }
        },
        resetForm() {
            this.staff = {
                name: '',
                email: '',
                phone: '',
                date_of_birth: '',
                gender: 'Nam',
                password: ''
            }
            this.roles = [];
            this.$emit('resetStaffId');

        }
    }
}
</script>

<style lang="scss" scoped></style>