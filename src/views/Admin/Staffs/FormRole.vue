<template>
    <div class="modal-container" v-show="showModal">
        <div class="modal-overlay" @click="closeModal"></div>
        <div class="modal-content" style="width: 80vw;">
            <span class="modal-close" @click="closeModal"><i class="fa-solid fa-circle-xmark"></i></span>
            <h4 class="text-center my-4 text-blue">Thông tin vai trò</h4>
            <form>
                <div class="form-groups mb-3">
                    <label class="form-label">Tên vai trò:</label>
                    <input v-model="role.name" type="text" class="form-control">
                </div>
            </form>

            <form action="">
                <div class="main">
                    <div>Chọn quyền cho vai trò:</div>
                    <div class="d-flex justify-content-around mb-2">
                        <div class="form-check">
                            <input @change="test(1)" class="form-check-input" type="radio" name="flexRadioDefault" id="id1">
                            <label class="form-check-label" for="id1">
                                Trưởng phòng công chứng
                            </label>
                        </div>
                        <div class="form-check">
                            <input @change="test(2)" class="form-check-input" type="radio" name="flexRadioDefault" id="id2">
                            <label class="form-check-label" for="id2">
                                Kế toán
                            </label>
                        </div>
                        <div class="form-check">
                            <input checked @change="test(3)" class="form-check-input" type="radio" name="flexRadioDefault" id="id3">
                            <label class="form-check-label" for="id3">
                                Công chứng viên
                            </label>
                        </div>
                        <!-- <div class="form-check">
                            <input @change="test(4)" class="form-check-input" type="radio" name="flexRadioDefault" id="id4">
                            <label class="form-check-label" for="id4">
                                Thư ký nghiệp vụ
                            </label>
                        </div>
                        <div class="form-check">
                            <input @change="test(5)" class="form-check-input" type="radio" name="flexRadioDefault" id="id5">
                            <label class="form-check-label" for="id5">
                                Nhân viên lưu trữ
                            </label>
                        </div> -->
                    </div>

                    <div class="row">
                        <div class="row">
                            <div class="col-4" v-for="group in filteredPermissionGroups" :key="group.id">
                                <div class="text-blue px-2">{{ group.description }}:</div>
                                <div class="px-3" v-for="permission in permissionsByGroup(group.id)" :key="permission.id">
                                    <label>
                                        <input type="checkbox" :value="permission.id" v-model="selectedPermissions"
                                            @click="selectedPermission(permission.id)" />

                                        {{ permission.name }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <hr class="mt-5">
            <div class="d-flex justify-content-between">
                <button type="reset" class="btn-white" @click="closeModal">
                    <i class="fa-solid fa-left-long"></i>
                    Quay lại
                </button>
                <button type="submit" class="btn-blue" @click="saveRole()">
                    <i class="fa-solid fa-check"></i>
                    Xác nhận thêm vai trò mới
                </button>
                <!-- <button type="submit" class="btn-blue">
                        <i class="fa-solid fa-check"></i>
                        Lưu thay đổi
                    </button> -->
                <button type="reset" class="btn-white" @click="resetForm()">
                    <i class="fa-solid fa-x"></i>
                    Xóa thông tin
                </button>
            </div>

        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            role: {
                name: ''
            },
            permissions: [],
            selectedPermissions: []

        }
    },
    props: {
        showModal: {
            type: Boolean,
            required: true,
        },
        getRoles: {
            type: Function,
            required: true,
        },
        roleIdToEdit: {
            type: Number,
            default: null,
        }
    },

    created() {
        this.getPermissions();
        this.test(3);
    },
    watch: {
        roleIdToEdit(newId, oldId) {
            this.getRole(newId)
        }
    },
    methods: {
        test(groupId) {
            if (groupId == 1) {
                this.selectedPermissions = [1, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
            }
            if (groupId == 2) {
                this.selectedPermissions = [2, 10];
            }
            if (groupId == 3) {
                this.selectedPermissions = [3, 6, 7, 8, 10, 11, 12, 13, 15, 16, 17, 19, 20, 21, 22];
            }
            if (groupId == 4) {
                this.selectedPermissions = [4, 6, 7, 8, 10, 11, 12, 15, 19, 20, 21, 22];
            }
            if (groupId == 5) {
                this.selectedPermissions = [5];
            }
        },
        async getRole(roleId) {
            await axios.get(`roles/${roleId}`).then(res => {
                this.role = res.data;
                res.data.permissions.forEach(element => {
                    this.selectedPermissions.push(element.id);
                });
            })

        },
        async getPermissions() {
            await axios.get('permissions').then(res => {
                this.permissions = res.data;
            })
        },

        saveRole() {
            if (this.roleIdToEdit == null) {
                axios.post('roles', this.role)
                    .then(res => {
                        if (res.data.success) {
                            axios.post(`roles/${res.data.id}/permissions`, { permissions: this.selectedPermissions })
                                .then(response => {
                                    if (response.data.success) {
                                        this.$swal.fire('Đã thêm thành công!', '', 'success');
                                        this.closeModal();
                                        this.getRoles()
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
                            alert('Đã xảy ra lỗi khi thêm vai trò.'); // Xử lý lỗi không xác định
                        }
                    });
            }
            else {
                axios.put(`roles/${this.roleIdToEdit}`, this.role).then(res => {
                    axios.put(`roles/${this.roleIdToEdit}/permissions`, { permissions: this.selectedPermissions })
                        .then(response => {
                            if (response.data.success) {
                                this.$swal.fire('Đã sửa thành công!', '', 'success');
                                this.closeModal();
                                this.getRoles()
                            }
                        })
                })
            }
        },
        selectedPermission(id) {
            if (this.selectedPermissions.includes(id)) {
                const index = this.selectedPermissions.indexOf(id);
                if (index > -1) {
                    this.selectedPermissions.splice(index, 1);
                }
            } else {
                this.selectedPermissions.push(id);
            }
        },
        permissionsByGroup(groupId) {
            return this.permissions.filter(permission => permission.group_id === groupId);
        },
        closeModal() {
            this.$emit('closeModal');
            this.resetForm();
        },
        resetForm() {
            this.role = {
                name: ''
            }
            this.selectedPermissions = []
        }

    },
    computed: {
        permissionGroups() {
            const groups = [];
            for (const permission of this.permissions) {
                const existingGroup = groups.find(group => group.id === permission.group_id);
                if (!existingGroup) {
                    groups.push({
                        id: permission.group_id,
                        description: permission.description
                    });
                }
            }
            return groups;
        },
        filteredPermissionGroups() {
            return this.permissionGroups.filter(group => group.id !== 0);
        }
    }
}
</script>

<style lang="css" scoped></style>