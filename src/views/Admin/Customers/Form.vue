<template>
    <!-- Modal -->
    <div class="modal-container" v-show="showModal">
        <div class="modal-overlay" @click="closeModal"></div>
        <div class="modal-content">
            <span class="modal-close" @click="closeModal"><i class="fa-solid fa-circle-xmark"></i></span>
            <h4 class="text-center my-4 text-blue">Thông tin khách hàng</h4>
            {{  }}
            <form @submit.prevent="saveCustomer()" action="">
                <div class="row">
                    <div class="form-groups col-4  mb-3">
                        <label class="form-label">Loại khách hàng:</label>
                        <select class="form-select" v-model="customer.type_id">
                            <option v-for="(customerType, index) in customerTypes" :key="index" :value="customerType.id">
                                {{ customerType.name }}</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <div class="col-4">
                        <div class="form-groups mb-3">
                            <label class="form-label">Họ tên:</label>
                            <input required v-model="customer.name" type="text" class="form-control">
                        </div>
                        <div class="form-groups mb-3">
                            <label class="form-label">Số CCCD:</label>
                            <input required v-model="customer.idCard_number" type="text" class="form-control">
                        </div>
                        <div class="form-groups mb-3">
                            <label class="form-label">Ngày cấp:</label>
                            <input required v-model="customer.idCard_issued_date" type="date" class="form-control" />
                        </div>
                        <div class="form-groups mb-3">
                            <label class="form-label">Nơi cấp:</label>
                            <input required v-model="customer.idCard_issued_place" type="text" class="form-control">
                        </div>

                    </div>
                    <div class="col-4">
                        <div class="form-groups mb-3">
                            <label class="form-label">Giới tính:</label>
                            <select class="form-select" v-model="customer.gender">
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                            </select>
                        </div>
                        <div class="form-groups mb-3">
                            <label class="form-label">Ngày sinh:</label>
                            <input required v-model="customer.date_of_birth" type="date" class="form-control" />

                        </div>
                        <div class="form-groups mb-3">
                            <label class="form-label">Số điện thoại:</label>
                            <input required v-model="customer.phone" type="text" class="form-control">
                        </div>
                        <div class="form-groups mb-3">
                            <label class="form-label">Email:</label>
                            <input required v-model="customer.email" type="email" class="form-control">
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="form-groups mb-3">
                            <label class="form-label">Tỉnh/Thành Phố:</label>
                            <select id="city" class="form-control" v-model="selectedCity" @change="loadDistricts">
                                <option v-if="customerIdToEdit != null" value="">{{ city }}</option>
                                <option value="">Chọn tỉnh/thành phố</option>
                                <option v-for="city in cities" :value="city.id">{{ city.name }}</option>
                            </select>
                        </div>
                        <div class="form-groups mb-3">
                            <label class="form-label">Quận/Huyện:</label>
                            <select id="district" class="form-control" v-model="selectedDistrict" @change="loadWards">
                                <option v-if="customerIdToEdit != null" value="">{{ district }}</option>
                                <option value="">Chọn quận/huyện</option>
                                <option v-for="district in districts" :value="district.id">{{ district.name }}</option>
                            </select>
                        </div>
                        <div class="form-groups mb-3">
                            <label class="form-label">Phường/Xã:</label>
                            <select id="ward" class="form-control" v-model="selectedWard" @change="getWardName()">
                                <option v-if="customerIdToEdit != null" value="">{{ ward }}</option>
                                <option value="">Chọn phường/xã</option>
                                <option v-for="ward in wards" :value="ward.id">{{ ward.name }}</option>
                            </select>
                        </div>
                        <div class="form-groups mb-3">
                            <label class="form-label">Địa chỉ cụ thể:</label>
                            <input required v-model="address" type="text" class="form-control">
                        </div>
                    </div>
                </div>
                <hr>
                <div class="d-flex justify-content-between">
                    <button type="reset" class="btn-white" @click="closeModal">
                        <i class="fa-solid fa-left-long"></i>
                        Quay lại
                    </button>
                    <button v-if="customerIdToEdit == null" type="submit" class="btn-blue">
                        <i class="fa-solid fa-check"></i>
                        Xác nhận tạo khách hàng mới
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
    name: "FormCustomer",
    data() {
        return {
            customer: {
                type_id: 1,
                name: '',
                idCard_number: '',
                idCard_issued_date: '',
                idCard_issued_place: '',
                gender: 'Nam',
                date_of_birth: '',
                phone: '',
                email: '',
                address: '',
            },
            cities: [],
            districts: [],
            wards: [],
            customerTypes: [],
            selectedCity: '',
            selectedDistrict: '',
            selectedWard: '',
            address: '',
            city: '',
            district: '',
            ward: '',
        }
    },
    props: {
        showModal: {
            type: Boolean,
            required: true,
        },
        getCustomers: {
            type: Function,
            required: true,
        },
        customerIdToEdit: {
            type: Number,
            default: null,
        },
    },
    created() {
    },
    watch: {
        customerIdToEdit(newCustomerId, oldCustomerId) {
            this.getCustomer(newCustomerId);
        },
    },
    async mounted() {
        await this.getCustomerType();
        await this.getCities();
    },
    methods: {
        async getCustomer(customerId) {
            if (customerId != null) {
                axios.get(`customers/${customerId}`).then(res => {
                    this.customer = res.data;
                    // Tách địa chỉ thành tỉnh, huyện, xã
                    const addressParts = res.data.address.split(", ");
                    this.city = addressParts[3];
                    this.district = addressParts[2];
                    this.ward = addressParts[1];
                    this.address = addressParts[0];
                });
            }
        },
        closeModal() {
            this.resetForm();
            this.$emit('closeModal'); // Phát ra sự kiện 'closeModal'
        },
        saveCustomer() {
            this.customer.address = this.fullAddress;
            if (this.customerIdToEdit == null) {

                axios.post('customers', this.customer)
                    .then(res => {
                        if (res.data.success) {
                            this.$swal.fire('Đã thêm thành công!', '', 'success');
                            this.closeModal();
                            this.getCustomers();
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
                            alert('Đã xảy ra lỗi khi thêm khách hàng.'); // Xử lý lỗi không xác định
                        }
                    });
            } else{
                axios.put(`customers/${this.customerIdToEdit}`, this.customer)
                    .then(res => {
                        if (res.data.success) {
                            this.$swal.fire('Đã sửa thành công!', '', 'success');
                            this.closeModal();
                            this.getCustomers();
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
                            alert('Đã xảy ra lỗi khi sửa khách hàng.'); // Xử lý lỗi không xác định
                        }
                    });
            }
        },

        getCustomerType() {
            axios.get('/customerTypes')
                .then(res => {
                    this.customerTypes = res.data;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        getCities() {
            axios.get('/cities')
                .then(res => {
                    this.cities = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        loadDistricts() {
            this.city = this.selectedCity ? this.cities.find(c => c.id === this.selectedCity)?.name : '';
            this.district = '';
            this.ward = '';
            this.wards = [];
            axios.get(`/cities/${this.selectedCity}`)
                .then(res => {
                    this.districts = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        loadWards() {
            this.district = this.selectedDistrict ? this.districts.find(d => d.id === this.selectedDistrict)?.name : '';
            this.ward = '';
            axios.get(`/districts/${this.selectedDistrict}`)
                .then(res => {
                    this.wards = res.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        getWardName() {
            this.ward = this.selectedWard ? this.wards.find(w => w.id === this.selectedWard)?.name : '';
        },
        resetForm() {
            this.customer = {
                type_id: 1,
                name: '',
                idCard_number: '',
                idCard_issued_date: '',
                idCard_issued_place: '',
                gender: 'Nam',
                date_of_birth: '',
                phone: '',
                email: '',
                address: '',
                password: 'password123'
            };
            this.selectedCity = '';
            this.selectedDistrict = '';
            this.selectedWard = '';
            this.address = '';
            this.city = '';
            this.district = '';
            this.ward = '';
            this.$emit('reset-customer-id');
        },

    },
    computed: {
        fullAddress: {
            get() {
                return `${this.address}, ${this.ward}, ${this.district}, ${this.city}`;
            },
            set(newFullAddress) {
                this.customer.address = newFullAddress;
            },
        }
    },

}
</script>

<style scoped></style>
