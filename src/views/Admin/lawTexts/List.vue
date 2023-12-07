<template>
    <FormLawText :showModal="showModal" @closeModal="showModal = false" :getLawTexts="getLawTexts"
        :lawTextIdToEdit="lawTextIdToEdit" @reset-lawText-id="lawTextIdToEdit = null" />

    <div class="card px-5 py-4">
        <h4 class="text-center text-blue">VĂN BẢN PHÁP LUẬT</h4>
        <div>
            <button class="btn-blue px-4 mt-2 mb-3" @click="showModal = true">
                <i class="fa-solid fa-plus"></i> Thêm mới
            </button>
        </div>

        <table class="myTable table table-striped  table-bordered ">
            <thead class="">
                <tr>
                    <th>STT</th>
                    <!-- <th>Danh mục</th> -->
                    <th>Tên</th>
                    <th>Ngày hiệu lực</th>
                    <th>Trạng thái</th>
                    <th>File</th>
                    <th>Tùy chọn</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(lawText, index) in lawTexts" :key="index">
                    <th>{{ index + 1 }}</th>
                    <!-- <td>{{ lawText.category.name }}</td> -->

                    <td>{{ lawText.name }}</td>
                    <td>{{ formatDate(lawText.effective_date) }}</td>
                    <td>{{ lawText.status }}</td>
                    <td class="d-flex">
                        <button class="btn-icon">
                            <a target="_blank" :href="'http://127.0.0.1:8000/storage/lawTexts/' + lawText.file"
                                class="text-blue">
                                <i class='bx bxs-file-doc'></i> Tải về
                            </a>
                        </button>

                    </td>
                    <td>
                        <!-- <button class="btn-icon" @click="deleteLawText(lawText.id)">
                            <i class="fa-solid fa-trash"></i>
                        </button> -->
                        &nbsp;
                        <button class="btn-icon" @click="editLawText(lawText.id)">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
import { formatDate, initializeDataTable } from '@/utils';
import FormLawText from './Form.vue';
import $ from 'jquery';
export default {
    name: 'ListLawTexts',
    components: {
        FormLawText
    },
    data() {
        return {
            lawTexts: [],
            showModal: false,
            lawTextIdToEdit: null,
        }
    },
    created() {
        this.getLawTexts();
    },
    methods: {
        formatDate, initializeDataTable,
        editLawText(id) {
            this.lawTextIdToEdit = id;
            this.showModal = true;
        },
        async getLawTexts() {
            await axios.get('lawTexts').then(res => {
                this.lawTexts = res.data;
                this.initializeDataTable();


            })
        },
        deleteLawText(id) {
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
                    axios.delete(`lawTexts/${id}`).then(res => {
                        if (res.data.success) {
                            this.$swal.fire('Đã xóa thành công!', '', 'success');
                            this.getLawTexts();
                        }
                    });
                }
            });
        },
    }
}
</script>

<style scoped>
.pdf {
    width: 300px;
    height: 500px;
}
</style>