<template>
    <div v-if="hasPermission(19) || hasPermission(1)">
        <div>
        <FormAdd :showModal="showModal" @closeModal="showModal = false" :formIdToEdit="formIdToEdit"
            @resetFormIdToEdit="formIdToEdit = null" :getForms="getForms" />

        <div class="card py-5 px-4">
            <h4 class="text-center text-blue">DANH SÁCH BIỂU MẪU</h4>
            <div>
                <button v-show="hasPermission(20)" class="btn-blue px-4 mt-2 mb-3" @click="showModal = true">
                    <i class="fa-solid fa-plus"></i> Thêm mới
                </button>
            </div>
            <table  class="myTable table table-striped  table-bordered ">
                <thead class="">
                    <tr>
                        <th>STT</th>
                        <th>Danh mục</th>
                        <th>Tên</th>
                        <th>Mô tả</th>
                        <th>File</th>
                        <th>Tùy chọn</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(form, index) in forms" :key="index">
                        <th>{{ index + 1 }}</th>
                        <td>{{ form.category.name }}</td>
                        <td>{{ form.name }}</td>
                        <td>{{ form.description }}</td>
                        <td class="d-flex">
                            <button class="btn-icon">
                                <a :href="'http://127.0.0.1:8000/storage/forms/' + form.file" class="text-blue">
                                    <i class='bx bxs-file-doc'></i> Tải về
                                </a>
                            </button>

                            &nbsp;
                            <button class="btn-icon">
                                <a target="_blank" :href="form.link">
                                    <i class='bx bxs-file-doc'></i> xem
                                </a>
                            </button>
                        </td>
                        <td>
                            <!-- <button class="btn-icon" @click="deleteForm(form.id)">
                                <i class="fa-solid fa-trash"></i>
                            </button> -->
                            &nbsp;
                            <button v-show="hasPermission(21)" class="btn-icon" @click="editForm(form.id)">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="modal-container" v-show="showPreview">
        <div class="modal-overlay" @click="showPreview = false"></div>
        <div class="modal-content" style="height: 95vh; width: 65vw;">
            <span class="modal-close" @click="showPreview = false"><i class="fa-solid fa-circle-xmark"></i></span>
            <iframe height="100%" :src="link + '/preview'"></iframe>
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
import FormAdd from './Form.vue'
import $ from 'jquery'
import {hasPermission, initializeDataTable} from '@/utils'

export default {
    name: "ListForms",
    components: {
        FormAdd
    },
    data() {
        return {
            showPreview: false,
            link: '',
            showModal: false,
            forms: [],
            formIdToEdit: null,
            docValue: 'http://127.0.0.1:8000/storage/MoTa.docx'
        }
    },
    created() {
        this.getForms();
    },
    methods: {
        initializeDataTable,hasPermission,
        async getForms() {
            await axios.get('forms').then(res => {
                this.forms = res.data;
                this.initializeDataTable()

            })
        },
        editForm(id) {
            this.formIdToEdit = id;
            this.showModal = true;
        },
        deleteForm(id) {
            this.$swal.fire({
                title: 'Bạn có chắc chắn muốn xóa?',
                icon: 'warning',
                showDenyButton: false,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Đồng ý',
                cancelButtonText: 'Hủy',
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`forms/${id}`).then(res => {
                        if (res.data.success) {
                            this.$swal.fire('Đã xóa thành công!', '', 'success');
                            this.getForms();
                        }
                    });
                }
            });
        },
        showModalPreview(link) {
            this.showPreview = true;
            this.link = link;
        }

    }
}
</script>

