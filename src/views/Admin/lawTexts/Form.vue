<template>
    <div class="modal-container" v-show="showModal">
        <div class="modal-overlay" @click="closeModal"></div>
        <div class="modal-content" style="width: 65vw;">
            <span class="modal-close" @click="closeModal"><i class="fa-solid fa-circle-xmark"></i></span>
            <h4 class="text-center my-4 text-blue">Văn bản pháp luật</h4>
            {{ lawTextIdToEdit }}
            <form @submit.prevent="save()">
                <div class="form-groups mb-3">
                    <label class="form-label">Danh mục:</label>
                    <select v-model="lawText.category_id" class="form-select">
                        <option v-for="(category, index) in categories" :key="index" :value="category.id">
                            {{ category.name }}</option>
                    </select>
                </div>
                <div class="form-group mb-3">
                    <label for="" class="form-label">Tên:</label>
                    <input v-model="lawText.name" type="text" class="form-control">
                </div>
                <div class="form-group mb-3">
                    <label for="" class="form-label">Ngày hiệu lực:</label>
                    <input v-model="lawText.effective_date" type="date" class="form-control">
                </div>
                <div class="form-group mb-3">
                    <label for="" class="form-label">Trạng thái:</label>
                    <select v-model="lawText.status" class="form-select">
                        <option value="Đang áp dụng">Đang áp dụng</option>
                        <option value="Hết hiệu lực">Hết hiệu lực</option>
                        <!-- <option value="Bị thay thế">Bị thay thế</option> -->

                    </select>
                </div>
                <div class="form-group mb-3">
                    <label for="" class="form-label">File PDF:</label>
                    <input ref="fileInput" @change="onFileChange" type="file" class="form-control">
                </div>

                <div class="d-flex justify-content-between mt-5">
                    <button type="reset" class="btn-white" @click="closeModal">
                        <i class="fa-solid fa-left-long"></i>
                        Quay lại
                    </button>
                    <button v-if="lawTextIdToEdit == null" type="submit" class="btn-blue">
                        <i class="fa-solid fa-check"></i>
                        Xác nhận thêm văn bản mới
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
    name: 'FormLawText',
    data() {
        return {
            lawText: {
                name: '',
                file: '',
                effective_date: '',
                status: 'Đang áp dụng',
                category_id:''
            },
            categories:[]
        }
    },
    props: {
        showModal: {
            type: Boolean,
            required: true,
        },
        getLawTexts: {
            type: Function,
            required: true,
        },
        lawTextIdToEdit: {
            type: Number,
            required: null,
        }
    },
    created() {
        this.getCategories();
    },
    watch: {
        lawTextIdToEdit(newId, oldId) {
            this.getLawText(newId);
        }
    },
    methods: {
        getCategories() {
            axios.get('categories').then(res => {
                this.categories = res.data;
            })
        },
        async getLawText(lawTextId) {
            if (lawTextId != null) {
                await axios.get(`lawTexts/${lawTextId}`).then(res => {
                    this.lawText = res.data;
                })
            }
        },
        closeModal() {
            this.resetForm();
            this.$emit('closeModal');
        },
        resetForm() {
            this.lawText = {
                name: '',
                file: '',
                effective_date: '',
                status: 'Đang áp dụng'
            }
            this.$refs.fileInput.value = null;

            this.$emit('reset-lawText-id')
        },
        onFileChange(event) {
            this.lawText.file = event.target.files[0];
            console.log(event)
        },
        save() {
            if (this.lawTextIdToEdit == null) {
                axios.post('lawTexts', this.lawText, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                })
                    .then(res => {
                        if (res.data.success) {
                            this.$swal.fire('Đã thêm thành công!', '', 'success');
                            this.closeModal();
                            this.getLawTexts();
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
                            alert('Đã xảy ra lỗi khi thêm văn bản.'); // Xử lý lỗi không xác định
                        }
                    });
            } else {
                axios.post(`lawTexts/${this.lawTextIdToEdit}`, this.lawText, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                })
                    .then(res => {
                        if (res.data.success) {
                            this.$swal.fire('Đã sưả thành công!', '', 'success');
                            this.closeModal();
                            this.getLawTexts();
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
                            alert('Đã xảy ra lỗi khi thêm văn bản.'); // Xử lý lỗi không xác định
                        }
                    });
            }
        }
    }

}
</script>

<style scoped></style>