<template>
    <div v-if="hasPermission(1) || hasPermission(27)">
        <FormRole :showModal="showModal" @closeModal="showModal = false" :roleIdToEdit="roleIdToEdit" :getRoles="getRoles"
            @resetRoleId="roleIdToEdit = null" />

        <div>
            <h4 class="text-center text-blue mt-2">DANH SÁCH VAI TRÒ</h4>
        </div>
        <div>
            <button v-show="hasPermission(28)" class="btn-blue px-4 mt-2 mb-3" @click="showModal = true">
                <i class="fa-solid fa-plus"></i> Thêm mới
            </button>
        </div>

        <table class="myTable table table-striped  table-bordered ">
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Tên vai trò</th>
                    <th>Tùy chọn</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(role, index) in roles" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ role.name }}</td>
                    <td>
                        <button v-show="hasPermission(29)" class="btn-icon" @click="editRole(role.id)">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        &nbsp;
<!-- 
                        <button v-show="hasPermission(30)" class="btn-icon">
                            <i class="fa-solid fa-trash "></i>
                        </button> -->
                        
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
import $ from 'jquery';
import FormRole from './FormRole.vue'
import { hasPermission, initializeDataTable } from '@/utils'

export default {
    name: 'ListRoles',
    components: {
        FormRole,
    },
    data() {
        return {
            roles: [],
            showModal: false,
            roleIdToEdit: null
        }
    },
    created() {
        this.getRoles();
    },
    methods: {
        initializeDataTable, hasPermission,
        editRole(id) {
            this.roleIdToEdit = id;
            this.showModal = true;
        },
        async getRoles() {
            const response = await axios.get('roles');
            this.roles = response.data;
            this.initializeDataTable();

        }
    }
}
</script>

<style scoped></style>