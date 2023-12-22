<template>
    <div v-if="hasPermission(1) || hasPermission(23)">
        <FormSaff :showModal="showModal" @closeModal="showModal = false" :getStaffs="getStaffs"
            :staffIdToEdit="staffIdToEdit" @resetStaffId="staffIdToEdit = null" />
        <div>
            <h4 class="text-center text-blue mt-2">DANH SÁCH NHÂN VIÊN</h4>
        </div>
        <div>
            <button v-show="hasPermission(24)" class="btn-blue px-4 mt-2 mb-3" @click="showModal = !showModal">
                <i class="fa-solid fa-plus"></i> Thêm mới
            </button>
        </div>

        <table class="myTable table table-striped  table-bordered ">
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Họ tên</th>
                    <th>Email</th>
                    <th>Sđt</th>
                    <th>Ngày sinh</th>
                    <th>Giới tính</th>
                    <th>Vai trò</th>
                    <th>Tùy chọn</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(staff, index) in staffs" :key="index">
                    <th>{{ index + 1 }}</th>
                    <td>{{ staff.name }}</td>
                    <td>{{ staff.email }}</td>
                    <td>{{ staff.phone }}</td>
                    <td>{{ formatDate(staff.date_of_birth) }}</td>
                    <td>{{ staff.gender }}</td>
                    <td class="d-flex">
                        <div class="btn-icon" v-for="(role, i) in staff.roles" :key="i">
                            {{ role.name }}
                        </div>
                    </td>
                    <td>
                        <button v-if="hasPermission(26)" v-show="staff.blocked == 1" class="btn-icon" @click="blocked(staff.id)">
                            <i class="fa-solid fa-unlock"></i>
                        </button>
                        <button  v-if="hasPermission(26)" v-show="staff.blocked == 0" class="btn-icon text-danger" @click="blocked(staff.id)">
                            <i class="fa-solid fa-lock"></i>
                        </button>
                        &nbsp;
                        <button v-show="hasPermission(25)" class="btn-icon" @click="editStaff(staff.id)">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                    </td>
                </tr>

            </tbody>
        </table>
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
import $ from 'jquery'
import FormSaff from './FormSaff.vue';
import { formatDate, hasPermission, initializeDataTable } from '@/utils';
export default {
    name: "ListStaffs",
    components: {
        FormSaff
    },
    data() {
        return {
            staffs: [],
            showModal: false,
            staffIdToEdit: null,
        }
    },
    created() {
        this.getStaffs();
    },
    methods: {
        formatDate, initializeDataTable, hasPermission,

        editStaff(id) {
            this.staffIdToEdit = id;
            this.showModal = true;
        },
        async getStaffs() {

            const response = await axios.get('staffs');
            this.staffs = response.data;
            this.initializeDataTable();



        },
        blocked(id) {
            axios.delete(`staffs/${id}`).then(res => {
                if (res.data.success) {
                    this.getStaffs()
                }
            })
        }
    }
}
</script>

<style scoped></style>