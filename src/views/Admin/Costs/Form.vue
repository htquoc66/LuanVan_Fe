<template>
    <div class="modal-container" v-show="showModal">
        <div class="modal-overlay" @click="closeModal"></div>
        <div class="modal-content" style="width: 65vw;">
            <span class="modal-close" @click="closeModal"><i class="fa-solid fa-circle-xmark"></i></span>
            <h4 class="text-center my-4 text-blue">Thông tin chi phí</h4>
            <form @submit.prevent="saveCost()">
                <div class="form-groups mb-3">
                    <label class="form-label">Loại chi phí:</label>
                    <select class="form-select" v-model="cost.cost_type_id">
                        <option v-for="(costType, index) in costTypes" :key="index" :value="costType.id">
                            {{ costType.name }}</option>
                    </select>
                </div>

                <div class="form-groups mb-3">
                    <label class="form-label">Tên chi phí:</label>
                    <input required type="text" v-model="cost.name" class="form-control">
                </div>
                <div class="form-groups mb-3">
                    <label class="form-label">Giá chi phi:</label>
                    <input required type="text" v-model="cost.price" class="form-control">
                </div>

                <div class="d-flex justify-content-between mt-5">
                    <button type="reset" class="btn-white" @click="closeModal">
                        <i class="fa-solid fa-left-long"></i>
                        Quay lại
                    </button>
                    <button v-if="costIdToEdit == null" type="submit" class="btn-blue">
                        <i class="fa-solid fa-check"></i>
                        Xác nhận thêm chi phí mới
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
import { formatPrice } from '@/utils.js'

export default {
    data() {
        return {
            cost: {
                cost_type_id: '',
                name: '',
                price: ''
            },
            costTypes: []
        }
    },
    props: {
        showModal: {
            type: Boolean,
            required: true,
        },
        getCosts: {
            type: Function,
            required: true,
        },
        costIdToEdit: {
            type: Number,
            required: null
        }
    },
    created() {
        this.getCostTypes();
    },

    methods: {
        formatPrice,
        saveCost() {
            if (this.costIdToEdit == null) {
                axios.post('costs', this.cost)
                    .then(res => {
                        if (res.data.success) {
                            this.$swal.fire('Đã thêm thành công!', '', 'success');
                            this.closeModal();
                            this.getCosts()
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

                            alert('Đã xảy ra lỗi khi thêm chi phí.'); // Xử lý lỗi không xác định
                        }
                    });
            } else {
                axios.put(`categories/${this.costIdToEdit}`, this.category)
                    .then(res => {
                        if (res.data.success) {
                            this.$swal.fire('Đã sửa thành công!', '', 'success');
                            this.resetForm();
                            this.closeModal();
                            this.getCosts();

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

                            alert('Đã xảy ra lỗi khi sửa chi phí.'); // Xử lý lỗi không xác định
                        }
                    });
            }
        },
        async getCost(costId) {
            if (costId != null) {
                await axios.get(`costs/${costId}`).then(res => {
                    this.cost = res.data;
                })
            }
        },
        async getCostTypes() {
            await axios.get('costTypes').then(res => {
                this.costTypes = res.data
            })
        },
        closeModal() {
            this.$emit('closeModal');
            this.resetForm();
        },
        resetForm() {
            this.cost = {
                name: '',
                price: ''
            }
            this.$emit('resetCostId');

        }
    },
    watch: {
        costIdToEdit(newCostId, oldCostId) {
            this.getCost(newCostId);
        }
    },

}
</script>

<style scoped></style>