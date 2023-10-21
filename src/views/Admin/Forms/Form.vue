<template>
    <div class="modal-container" v-show="showModal">
        <div class="modal-overlay" @click="closeModal"></div>
        <div class="modal-content" style="width: 65vw;">
            <span class="modal-close" @click="closeModal"><i class="fa-solid fa-circle-xmark"></i></span>
            <h4 class="text-center my-4 text-blue">Thông tin biểu mẫu</h4>
            <form @submit.prevent="save()">
                <div class="form-groups mb-3">
                    <label class="form-label">Danh mục:</label>
                    <select v-model="form.category_id" class="form-select">
                        <option v-for="(category, index) in categories" :key="index" :value="category.id">
                            {{ category.name }}</option>
                    </select>
                </div>
                <div class="form-groups mb-3">
                    <label class="form-label">Tên biểu mẫu:</label>
                    <input v-model="form.name" type="text" class="form-control">
                </div>
                <div class="form-groups mb-3">
                    <label class="form-label">Mô tả:</label>
                    <input v-model="form.description" type="text" class="form-control">
                </div>
                <div class="form-groups mb-3">
                    <label class="form-label">File docx:</label>
                    <input  ref="fileInput" type="file" @change="onFileChange" class="form-control">
                </div>

                <div class="d-flex justify-content-between mt-5">
                    <button type="reset" class="btn-white" @click="closeModal">
                        <i class="fa-solid fa-left-long"></i>
                        Quay lại
                    </button>
                    <button v-if="formIdToEdit == null" type="submit" class="btn-blue">
                        <i class="fa-solid fa-check"></i>
                        Xác nhận thêm biểu mẫu mới
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
            categories: [],
            form: {
                category_id: '',
                name: '',
                description: '',
                file: ''
            }

        }
    },
    props: {
        showModal: {
            type: Boolean,
            required: true,
        },
        formIdToEdit: {
            type: Number,
            required: null,
        },
        getForms: {
            type: Function,
            required: true,
        }
    },
    created() {
        this.getCategories();
    },
    watch: {
        formIdToEdit(newFormId, oldFormId) {
            this.getForm(newFormId);
        }
    },
    methods: {
        getCategories() {
            axios.get('categories').then(res => {
                this.categories = res.data;
            })
        },
        getForm(formId) {
            if (formId != null) {
                axios.get(`forms/${formId}`).then(res => {
                    console.log(res.data)
                    this.form = res.data;
                })
            }
        },
        closeModal() {
            this.$emit('closeModal');
            this.resetForm();
        },
        onFileChange(event) {
            this.form.file = event.target.files[0];
        },
        save() {
            if (this.formIdToEdit == null) {
                axios.post('forms', this.form, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                }).then(res => {
                    console.log(res.data)
                    if (res.data.success) {
                        this.$swal.fire('Đã thêm thành công!', '', 'success');
                        this.getForms();
                        this.closeModal();
                    }
                })
                    .catch(error => {
                        if (error.response && error.response.status === 422) {
                            this.$swal.fire({
                                icon: 'error',
                                title: 'Lỗi',
                                text: error.response.data.message,
                            });
                        } else {
                            console.log(error);
                            alert('Đã xảy ra lỗi khi thêm biểu mẫu.');
                        }
                    });
            } else {
                axios.post(`forms/${this.formIdToEdit}`, this.form, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                }).then(res => {
                    console.log(res.data)
                    if (res.data.success) {
                        this.$swal.fire('Đã sửa thành công!', '', 'success');
                        this.getForms();
                        this.closeModal();
                    }
                })
                    .catch(error => {
                        if (error.response && error.response.status === 422) {
                            this.$swal.fire({
                                icon: 'error',
                                title: 'Lỗi',
                                text: error.response.data.message,
                            });
                        } else {
                            console.log(error);
                            alert('Đã xảy ra lỗi khi sửa biểu mẫu.');
                        }
                    });
            }
        },


        resetForm() {
            this.form = {
                category_id: '',
                name: '',
                description: '',
                file: ''
            }
            this.$refs.fileInput.value = null;

            this.$emit('resetFormIdToEdit');
        },
    }
}
</script>

<style scoped></style>