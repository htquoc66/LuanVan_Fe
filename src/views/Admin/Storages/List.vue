<template>
    <div v-if="hasPermission(1) || hasPermission(51)">
        <div v-show="hasPermission(1)" class="card py-4 px-4">
            <h4 class="text-center text-blue mb-4 mt-3 ">Quản lý lưu trữ</h4>
            <table class="myTable table table-striped  table-bordered ">
                <thead class="">
                    <tr>
                        <th>Số lưu trữ</th>
                        <th>Danh mục</th>
                        <th>Số hồ sơ</th>
                        <th>Tên hồ sơ</th>
                        <th>Ngày lập</th>
                        <th>File lưu trữ</th>
                        <th>Mật khẩu nén</th>
                        <th>Tùy chọn</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(storage, index) in storages" :key="index">
                        <td>{{ storage.id }}</td>
                        <td>{{ storage.notarized_document.category.name }}</td>
                        <td>{{ storage.notarized_document.id }}</td>
                        <td>{{ storage.notarized_document.name }}</td>
                        <td>{{ formatDate(storage.notarized_document.date) }}</td>
                        <td>
                            <button v-show="hasPermission(52)" v-if="storage.file == null" @click="addFile(storage.id)"
                                class="btn-icon">+ Thêm</button>
                            <a v-else target="_blank" :href="'https://drive.google.com/file/d/' + storage.file">
                                Xem file
                            </a>
                        </td>
                        <td>
                            <div v-if="showPass === index" @click="toggleShowPass(index)"
                                class="d-flex justify-content-between px-3">
                                <div>{{ storage.zip_password }}</div>
                                <div><i class="fa-solid fa-eye"></i></div>
                            </div>
                            <div v-else @click="toggleShowPass(index)" class="d-flex justify-content-between px-3">
                                <div>********</div>
                                <div><i class="fa-solid fa-eye-slash"></i></div>
                            </div>
                        </td>
                        <td>
                            <button v-if="storage.file != null" class="btn-icon" @click="editStorage(storage)">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="modal-container" v-show="showModal">
            <div class="modal-overlay" @click="showModal = false"></div>
            <div class="modal-content" style="width: 60vw;">
                <span class="modal-close" @click="showModal = false"><i class="fa-solid fa-circle-xmark"></i></span>
                <h5 class="text-center text-blue">Thêm file lưu trữ</h5>
                <form @submit.prevent="save()">
                    <div class="form-groups mb-3" v-if="storage">
                        <h6>Số hồ sơ:</h6>
                        <input :value="storage.notarized_document.id" disabled type="text" class="form-control">
                    </div>
                    <div class="form-groups mb-3" v-if="storage">
                        <h6>Tên hồ sơ:</h6>
                        <input :value="storage.notarized_document.name" disabled type="text" class="form-control">
                    </div>
                    <div class="form-groups mb-3" v-if="storage">
                        <h6>Ngày tạo hồ sơ:</h6>
                        <input required :value="formatDate(storage.notarized_document.date)" disabled type="text"
                            class="form-control">
                    </div>

                    <div class="form-groups mb-3" v-if="storage">
                        <h6>Thêm file:</h6>
                        <input @change="onFileChange" type="file" class="form-control">
                    </div>
                    <div class="form-groups mb-3" v-if="storage">
                        <h6>Mật khẩu nén:</h6>
                        <input required v-model="data.zip_password" type="password" class="form-control">
                    </div>
                    <div class="text-center mt-3">
                        <button class="btn-blue">Lưu thay đổi</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="loading" v-show="showLoading">
            <div class="overlay"></div>
            <div class="text-center">
                <div class="spinner-border" role="status"></div>
                <div>Đang tải...</div>
            </div>
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
import { initializeDataTable, formatDate, hasPermission } from '@/utils'

export default {
    data() {
        return {
            storages: [],
            storage: null,
            showModal: false,
            data: {
                file: '',
                zip_password: ''
            },
            showLoading: false,
            showPass: null,
            edit: 0,
        }
    },
    created() {
        this.getAllStogares()
    },
    methods: {
        initializeDataTable, formatDate, hasPermission,
        async getAllStogares() {
            await axios.get('storages').then(res => {
                this.storages = res.data;
                this.initializeDataTable()
            })
        },
        addFile(id) {
            this.storage = this.storages.find(storage => storage.id === id);
            this.showModal = true;
        },
        onFileChange(event) {
            this.data.file = event.target.files[0];
        },
        save() {
            if (this.data.file == '') {
                alert("Chưa thêm file")
            } else {


                this.showLoading = true;
                axios.post(`storages/${this.storage.id}`, this.data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                }).then(res => {
                    console.log(res.data)
                    if (res.data.success) {
                        this.showLoading = false;
                        this.showModal = false;
                        if (this.edit == 0) {
                            this.$swal.fire('Đã thêm thành công!', '', 'success');
                        } else {
                            this.$swal.fire('Đã sửa thành công!', '', 'success');
                            this.edit = 0;
                        }
                        this.getAllStogares();
                    }
                })
            }
        },
        editStorage(storage) {
            this.showModal = true;
            this.storage = storage;
            this.edit = 1;
        },
        toggleShowPass(index) {
            // Toggle showPass for the clicked row
            this.showPass = this.showPass === index ? null : index;
        },
    }

}
</script>

<style lang="css" scoped></style>