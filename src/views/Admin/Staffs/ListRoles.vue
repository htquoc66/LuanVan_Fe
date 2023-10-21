<template>
    <div>
        <FormRole :showModal="showModal" @closeModal="showModal = false" :roleIdToEdit="roleIdToEdit" :getRoles="getRoles"
            @resetRoleId="roleIdToEdit = null" />

        <div>
            <h4 class="text-center text-blue mt-2">DANH SÁCH VAI TRÒ</h4>
        </div>
        <div>
            <button class="btn-blue px-4 mt-2 mb-3" @click="showModal = true">
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
                        <button class="btn-icon">
                            <i class="fa-solid fa-trash "></i>
                        </button>
                        &nbsp;
                        <button class="btn-icon" @click="editRole(role.id)">
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
import $ from 'jquery';
import FormRole from './FormRole.vue'
import { initializeDataTable } from '@/utils'

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
        initializeDataTable,
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