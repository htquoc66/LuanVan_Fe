<template>
    <div class="modal-container" v-show="showModal">
        <div class="modal-overlay" @click="closeModal"></div>
        <div class="modal-content" style="width: 65vw;">
            <span class="modal-close" @click="closeModal"><i class="fa-solid fa-circle-xmark"></i></span>
            <h4 class="text-center my-4 text-blue">Thông tin danh mục</h4>
            <form @submit.prevent="saveCategory()">
                <div class="form-groups mb-3">
                    <label class="form-label">Tên danh mục:</label>
                    <input type="text" v-model="category.name" class="form-control">
                </div>

                <div class="d-flex justify-content-between mt-5">
                    <button type="reset" class="btn-white" @click="closeModal">
                        <i class="fa-solid fa-left-long"></i>
                        Quay lại
                    </button>
                    <button v-if="categoryIdToEdit == null" type="submit" class="btn-blue">
                        <i class="fa-solid fa-check"></i>
                        Xác nhận thêm danh mục mới
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
    name: 'FormCategory',
    data() {
        return {
            category: {
                name: ''
            }
        }
    },
    props: {
        showModal: {
            type: Boolean,
            required: true,
        },
        getCategories: {
            type: Function,
            required: true,
        },
        categoryIdToEdit: {
            type: Number,
            default: null,
        }
    },
    watch: {
        categoryIdToEdit(newCategoryId, oldCategoryId) {
            this.getCategory(newCategoryId);
        }
    },
    methods: {
        async getCategory(categoryId) {
            if (categoryId != null) {
                axios.get(`categories/${categoryId}`)
                    .then(res => {
                        console.log(res.data)
                        this.category = res.data;
                    })
            }
        },
        saveCategory() {
            if (this.categoryIdToEdit == null) {
                axios.post('categories', this.category)
                    .then(res => {
                        if (res.data.success) {
                            this.$swal.fire('Đã thêm thành công!', '', 'success');
                            this.closeModal();
                            this.getCategories()
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

                            alert('Đã xảy ra lỗi khi thêm danh mục.'); // Xử lý lỗi không xác định
                        }
                    });
            } else {
                axios.put(`categories/${this.categoryIdToEdit}`, this.category)
                    .then(res => {
                        if (res.data.success) {
                            this.$swal.fire('Đã sửa thành công!', '', 'success');
                            this.resetForm();
                            this.closeModal();
                            this.getCategories()

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

                            alert('Đã xảy ra lỗi khi sửa danh mục.'); // Xử lý lỗi không xác định
                        }
                    });
            }
        },
        closeModal() {
            this.$emit('closeModal');
            this.resetForm();
        },
        resetForm() {
            this.category = {
                name: ''
            }
            this.$emit('resetCategoryId');
        }
    }
}
</script>

<style scoped></style>