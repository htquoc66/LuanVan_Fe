<template>
    <div class="modal-container" v-show="showModalAddContent">
        <div class="modal-overlay" @click="close"></div>
        <div class="modal-content" style="width: 70vw;">
            <div v-if="selectedForm != null && selectedForm.id == 1">
                <div class="form-group">
                    <label class="form-label">Nội dung ủy quyền:</label>
                    <textarea v-model="uy_quyen.noi_dung" class="form-control"></textarea>
                </div>
            </div>
            <div v-if="selectedForm != null && selectedForm.id == 2">
                <div class="row">
                    <div class="col-6">
                        <div class="form-group mb-3">
                            <h6>Số thửa:</h6>
                            <input v-model="chuyen_nhuong_dat.so_thua" class="form-control">
                        </div>
                        <div class="form-group mb-3">
                            <h6>Tờ bản đồ số:</h6>
                            <input v-model="chuyen_nhuong_dat.to_ban_do" class="form-control">
                        </div>
                        <div class="form-group mb-3">
                            <h6>Địa chỉ thửa đất:</h6>
                            <input v-model="chuyen_nhuong_dat.dia_chi_dat" class="form-control">
                        </div>
                        <div class="form-group mb-3">
                            <h6>Diện tích (m<sup>2</sup>):</h6>
                            <input v-model="chuyen_nhuong_dat.dien_tich" class="form-control">
                        </div>
                        <div class="form-group mb-3">
                            <h6>Hình thức sử dụng riêng (m<sup>2</sup>):</h6>
                            <input v-model="chuyen_nhuong_dat.sd_rieng" class="form-control">
                        </div>

                    </div>

                    <div class="col-6">
                        <div class="form-group mb-3">
                            <h6>Hình thức sử dụng chung (m<sup>2</sup>):</h6>
                            <input v-model="chuyen_nhuong_dat.sd_chung" class="form-control">
                        </div>

                        <div class="form-group mb-3">
                            <h6>Mục đích sử dụng:</h6>
                            <input v-model="chuyen_nhuong_dat.muc_dich_sd" class="form-control">
                        </div>
                        <div class="form-group mb-3">
                            <h6>Thời hạn sử dụng:</h6>
                            <input v-model="chuyen_nhuong_dat.hsd" class="form-control">
                        </div>
                        <div class="form-group mb-3">
                            <h6>Giá trị chuyển nhượng:</h6>
                            <input v-model="formattedPriceDat" class="form-control">
                        </div>
                        <div class="form-group mb-3">
                            <h6>Phương thức thanh toán:</h6>
                            <select v-model="chuyen_nhuong_dat.pttt" class="form-select">
                                <option value="Tiền mặt">Tiền mặt</option>
                                <option value="Chuyển khoản">Chuyển khoản</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group mb-3">
                        <h6>Nguồn gốc sử dụng:</h6>
                        <input v-model="chuyen_nhuong_dat.nguon_goc" class="form-control">
                    </div>
                </div>

            </div>
            <div v-if="selectedForm != null && selectedForm.id == 3">
                <div class="row">
                    <div class="col-6">
                        <div class="form-group mb-3">
                            <h6>Biển số xe:</h6>
                            <input v-model="mua_ban_oto.bs_xe" class="form-control">
                        </div>
                        <div class="form-group mb-3">
                            <h6>Giấy đăng ký số:</h6>
                            <input v-model="mua_ban_oto.so_dk" class="form-control">
                        </div>
                        <div class="form-group mb-3">
                            <h6>Ngày cấp giấy đăng ký:</h6>
                            <input v-model="mua_ban_oto.ngay_cap_dk" class="form-control">
                        </div>
                        <div class="form-group mb-3">
                            <h6>Nhãn hiệu:</h6>
                            <input v-model="mua_ban_oto.nhan_hieu" class="form-control">
                        </div>
                        <div class="form-group mb-3">
                            <h6>Dung tích xi lanh:</h6>
                            <input v-model="mua_ban_oto.dung_tich" class="form-control">
                        </div>
                        <div class="form-group mb-3">
                            <h6>Loại xe:</h6>
                            <input v-model="mua_ban_oto.loai_xe" class="form-control">
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-group mb-3">
                            <h6>Màu sơn:</h6>
                            <input v-model="mua_ban_oto.mau_son" class="form-control">
                        </div>
                        <div class="form-group mb-3">
                            <h6>Số khung:</h6>
                            <input v-model="mua_ban_oto.so_khung" class="form-control">
                        </div>
                        <div class="form-group mb-3">
                            <h6>Số máy:</h6>
                            <input v-model="mua_ban_oto.so_may" class="form-control">
                        </div>
                        <div class="form-group mb-3">
                            <h6>Đăng ký xe có giá trị đến ngày:</h6>
                            <input v-model="mua_ban_oto.ngay_het_han" class="form-control">
                        </div>
                        <div class="form-group mb-3">
                            <h6>Giá trị giao dịch:</h6>
                            <input v-model="formattedPriceXe" class="form-control">
                        </div>
                        <div class="form-group mb-3">
                            <h6>Phương thức thanh toán:</h6>
                            <select v-model="mua_ban_oto.pttt" class="form-select">
                                <option value="Tiền mặt">Tiền mặt</option>
                                <option value="Chuyển khoản">Chuyển khoản</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>


            <div class="mt-4">
                <button class="btn btn-success" @click="taohoso()">Tạo hồ sơ</button>
            </div>
        </div>
        <div class="loading" v-show="showLoading">
            <div class="overlay"></div>
            <div class="text-center">
                <div class="spinner-border" role="status"></div>
                <div>Đang tạo hồ sơ...</div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { formatDate, convertNumberToWords, formatPrice } from '@/utils';

export default {
    data() {
        return {
            showLoading: false,
            data: {},
            uy_quyen: {
                ten_file: 'template1.docx',
                ten_file_moi: 'hosomoi.docx',
                ngay_thang: '',
                ten_a: '',
                nam_sinh_a: '',
                cccd_a: '',
                ngay_cccd_a: '',
                dia_chi_a: '',
                ten_b: '',
                nam_sinh_b: '',
                cccd_b: '',
                ngay_cccd_b: '',
                dia_chi_b: '',
                noi_dung: '',
                ten_ccv: '',
            },
            chuyen_nhuong_dat: {
                ten_file: 'template2.docx',
                ten_file_moi: 'hosomoi.docx',
                ngay_thang: '',
                ten_a1: '',
                nam_sinh_a1: '',
                cccd_a1: '',
                ngay_cccd_a1: '',
                dia_chi_a1: '',
                ten_a2: '',
                nam_sinh_a2: '',
                cccd_a2: '',
                ngay_cccd_a2: '',
                dia_chi_a2: '',
                ten_b1: '',
                nam_sinh_b1: '',
                cccd_b1: '',
                ngay_cccd_b1: '',
                dia_chi_b1: '',
                ten_b2: '',
                nam_sinh_b2: '',
                cccd_b2: '',
                ngay_cccd_b2: '',
                dia_chi_b2: '',
                so_thua: '',
                to_ban_do: '',
                dia_chi_dat: '',
                dien_tich: '',
                sd_rieng: '',
                sd_chung: '',
                muc_dich_sd: '',
                hsd: '',
                nguon_goc: '',
                gt: '', // giá trị,
                gt_chu: '',
                pttt: '', // phuong thức thanh toán
                ten_ccv: ''
            },
            mua_ban_oto: {
                ten_file: 'template3.docx',
                ten_file_moi: 'hosomoi.docx',
                ngay_thang: '',
                ten_a1: '',
                nam_sinh_a1: '',
                cccd_a1: '',
                ngay_cccd_a1: '',
                dia_chi_a1: '',
                ten_a2: '',
                nam_sinh_a2: '',
                cccd_a2: '',
                ngay_cccd_a2: '',
                dia_chi_a2: '',
                ten_b1: '',
                nam_sinh_b1: '',
                cccd_b1: '',
                ngay_cccd_b1: '',
                dia_chi_b1: '',
                bs_xe: '',
                so_dk: '',
                ngay_cap_dk: '',
                nhan_hieu: '',
                dung_tich: '',
                loai_xe: '',
                mau_son: '',
                so_may: '',
                so_khung: '',
                ngay_het_han: '',
                gt: '',
                gt_chu: '',
                pttt: '',
                ten_ccv: ''
            },
            info: {
                ten_file: '',
                ten_file_moi: 'hosomoi.docx',
                ngay_thang: '',
                ten_a1: '',
                nam_sinh_a1: '',
                cccd_a1: '',
                ngay_cccd_a1: '',
                dia_chi_a1: '',
                ten_a2: '',
                nam_sinh_a2: '',
                cccd_a2: '',
                ngay_cccd_a2: '',
                dia_chi_a2: '',
                ten_b1: '',
                nam_sinh_b1: '',
                cccd_b1: '',
                ngay_cccd_b1: '',
                dia_chi_b1: '',
                ten_b2: '',
                nam_sinh_b2: '',
                cccd_b2: '',
                ngay_cccd_b2: '',
                dia_chi_b2: '',
                ten_ccv: ''
            }
        }
    },
    props: {
        showModalAddContent: {
            type: Boolean,
            required: true,
        },
        selectedForm: {
            type: Object,
            required: null,
        },
        notarizedDocument: {
            type: Object,
            required: null,
        },

    },
    created() {
    },
    watch: {
    },
    computed: {
        formattedPriceDat: {
            get() {
                return this.chuyen_nhuong_dat.gt.toLocaleString();
            },
            set(newValue) {
                this.chuyen_nhuong_dat.gt = parseFloat(newValue.replace(/,/g, ""));
            },
        },
        formattedPriceXe: {
            get() {
                return this.mua_ban_oto.gt.toLocaleString();
            },
            set(newValue) {
                this.mua_ban_oto.gt = parseFloat(newValue.replace(/,/g, ""));
            },
        }
    },

    methods: {
        formatDate, convertNumberToWords, formatPrice,
        createContent() {
            if (this.selectedForm.id == 1) {
                this.uy_quyen.ngay_thang = formatDate(this.notarizedDocument.date);
                this.uy_quyen.ten_ccv = this.notarizedDocument.notary.name;
                if (this.notarizedDocument.customersA.length > 0) {
                    this.uy_quyen.ten_a = this.notarizedDocument.customersA[0].name;
                    this.uy_quyen.nam_sinh_a = formatDate(this.notarizedDocument.customersA[0].date_of_birth);
                    this.uy_quyen.cccd_a = this.notarizedDocument.customersA[0].idCard_number;
                    this.uy_quyen.ngay_cccd_a = formatDate(this.notarizedDocument.customersA[0].idCard_issued_date);
                    this.uy_quyen.dia_chi_a = this.notarizedDocument.customersA[0].address;
                }
                if (this.notarizedDocument.customersB.length > 0) {
                    this.uy_quyen.ten_b = this.notarizedDocument.customersB[0].name;
                    this.uy_quyen.nam_sinh_b = formatDate(this.notarizedDocument.customersB[0].date_of_birth);
                    this.uy_quyen.cccd_b = this.notarizedDocument.customersB[0].idCard_number;
                    this.uy_quyen.ngay_cccd_b = formatDate(this.notarizedDocument.customersB[0].idCard_issued_date);
                    this.uy_quyen.dia_chi_b = this.notarizedDocument.customersB[0].address;
                }
            }
            else if (this.selectedForm.id == 2) {
                this.chuyen_nhuong_dat.ten_ccv = this.notarizedDocument.notary.name;
                this.chuyen_nhuong_dat.ngay_thang = formatDate(this.notarizedDocument.date);
                this.chuyen_nhuong_dat.gt_chu = convertNumberToWords(this.chuyen_nhuong_dat.gt);
                if (this.notarizedDocument.customersA.length > 0) {
                    this.chuyen_nhuong_dat.ten_a1 = this.notarizedDocument.customersA[0].name;
                    this.chuyen_nhuong_dat.nam_sinh_a1 = formatDate(this.notarizedDocument.customersA[0].date_of_birth);
                    this.chuyen_nhuong_dat.cccd_a1 = this.notarizedDocument.customersA[0].idCard_number;
                    this.chuyen_nhuong_dat.ngay_cccd_a1 = formatDate(this.notarizedDocument.customersA[0].idCard_issued_date);
                    this.chuyen_nhuong_dat.dia_chi_a1 = this.notarizedDocument.customersA[0].address;
                    if (this.notarizedDocument.customersA.length > 1) {
                        this.chuyen_nhuong_dat.ten_a2 = this.notarizedDocument.customersA[1].name;
                        this.chuyen_nhuong_dat.nam_sinh_a2 = formatDate(this.notarizedDocument.customersA[1].date_of_birth);
                        this.chuyen_nhuong_dat.cccd_a2 = this.notarizedDocument.customersA[1].idCard_number;
                        this.chuyen_nhuong_dat.ngay_cccd_a2 = formatDate(this.notarizedDocument.customersA[1].idCard_issued_date);
                        this.chuyen_nhuong_dat.dia_chi_a2 = this.notarizedDocument.customersA[1].address;
                    }
                }
                if (this.notarizedDocument.customersB.length > 0) {
                    this.chuyen_nhuong_dat.ten_b1 = this.notarizedDocument.customersB[0].name;
                    this.chuyen_nhuong_dat.nam_sinh_b1 = formatDate(this.notarizedDocument.customersB[0].date_of_birth);
                    this.chuyen_nhuong_dat.cccd_b1 = this.notarizedDocument.customersB[0].idCard_number;
                    this.chuyen_nhuong_dat.ngay_cccd_b1 = formatDate(this.notarizedDocument.customersB[0].idCard_issued_date);
                    this.chuyen_nhuong_dat.dia_chi_b1 = this.notarizedDocument.customersB[0].address;
                    if (this.notarizedDocument.customersB.length > 1) {
                        this.chuyen_nhuong_dat.ten_b2 = this.notarizedDocument.customersB[1].name;
                        this.chuyen_nhuong_dat.nam_sinh_b2 = formatDate(this.notarizedDocument.customersB[1].date_of_birth);
                        this.chuyen_nhuong_dat.cccd_b2 = this.notarizedDocument.customersB[1].idCard_number;
                        this.chuyen_nhuong_dat.ngay_cccd_b2 = formatDate(this.notarizedDocument.customersB[1].idCard_issued_date);
                        this.chuyen_nhuong_dat.dia_chi_b2 = this.notarizedDocument.customersB[1].address;
                    }
                }
            }
            else if (this.selectedForm.id == 3) {
                this.mua_ban_oto.ten_ccv = this.notarizedDocument.notary.name;
                this.mua_ban_oto.ngay_thang = formatDate(this.notarizedDocument.date);
                this.mua_ban_oto.gt_chu = convertNumberToWords(this.mua_ban_oto.gt);
                if (this.notarizedDocument.customersA.length > 0) {
                    this.mua_ban_oto.ten_a1 = this.notarizedDocument.customersA[0].name;
                    this.mua_ban_oto.nam_sinh_a1 = formatDate(this.notarizedDocument.customersA[0].date_of_birth);
                    this.mua_ban_oto.cccd_a1 = this.notarizedDocument.customersA[0].idCard_number;
                    this.mua_ban_oto.ngay_cccd_a1 = formatDate(this.notarizedDocument.customersA[0].idCard_issued_date);
                    this.mua_ban_oto.dia_chi_a1 = this.notarizedDocument.customersA[0].address;
                    if (this.notarizedDocument.customersA.length > 1) {
                        this.mua_ban_oto.ten_a2 = this.notarizedDocument.customersA[1].name;
                        this.mua_ban_oto.nam_sinh_a2 = formatDate(this.notarizedDocument.customersA[1].date_of_birth);
                        this.mua_ban_oto.cccd_a2 = this.notarizedDocument.customersA[1].idCard_number;
                        this.mua_ban_oto.ngay_cccd_a2 = formatDate(this.notarizedDocument.customersA[1].idCard_issued_date);
                        this.mua_ban_oto.dia_chi_a2 = this.notarizedDocument.customersA[1].address;
                    }
                }
                if (this.notarizedDocument.customersB.length > 0) {
                    this.mua_ban_oto.ten_b1 = this.notarizedDocument.customersB[0].name;
                    this.mua_ban_oto.nam_sinh_b1 = formatDate(this.notarizedDocument.customersB[0].date_of_birth);
                    this.mua_ban_oto.cccd_b1 = this.notarizedDocument.customersB[0].idCard_number;
                    this.mua_ban_oto.ngay_cccd_b1 = formatDate(this.notarizedDocument.customersB[0].idCard_issued_date);
                    this.mua_ban_oto.dia_chi_b1 = this.notarizedDocument.customersB[0].address;
                }
            }
            else {
                this.info.ten_ccv = this.notarizedDocument.notary.name;
                this.info.ngay_thang = formatDate(this.notarizedDocument.date);
                this.info.ten_file = this.selectedForm.file;
                if (this.notarizedDocument.customersA.length > 0) {
                    this.info.ten_a1 = this.notarizedDocument.customersA[0].name;
                    this.info.nam_sinh_a1 = formatDate(this.notarizedDocument.customersA[0].date_of_birth);
                    this.info.cccd_a1 = this.notarizedDocument.customersA[0].idCard_number;
                    this.info.ngay_cccd_a1 = formatDate(this.notarizedDocument.customersA[0].idCard_issued_date);
                    this.info.dia_chi_a1 = this.notarizedDocument.customersA[0].address;
                    if (this.notarizedDocument.customersA.length > 1) {
                        this.info.ten_a2 = this.notarizedDocument.customersA[1].name;
                        this.info.nam_sinh_a2 = formatDate(this.notarizedDocument.customersA[1].date_of_birth);
                        this.info.cccd_a2 = this.notarizedDocument.customersA[1].idCard_number;
                        this.info.ngay_cccd_a2 = formatDate(this.notarizedDocument.customersA[1].idCard_issued_date);
                        this.info.dia_chi_a2 = this.notarizedDocument.customersA[1].address;
                    }
                }
                if (this.notarizedDocument.customersB.length > 0) {
                    this.info.ten_b1 = this.notarizedDocument.customersB[0].name;
                    this.info.nam_sinh_b1 = formatDate(this.notarizedDocument.customersB[0].date_of_birth);
                    this.info.cccd_b1 = this.notarizedDocument.customersB[0].idCard_number;
                    this.info.ngay_cccd_b1 = formatDate(this.notarizedDocument.customersB[0].idCard_issued_date);
                    this.info.dia_chi_b1 = this.notarizedDocument.customersB[0].address;
                    if (this.notarizedDocument.customersB.length > 1) {
                        this.info.ten_b2 = this.notarizedDocument.customersB[1].name;
                        this.info.nam_sinh_b2 = formatDate(this.notarizedDocument.customersB[1].date_of_birth);
                        this.info.cccd_b2 = this.notarizedDocument.customersB[1].idCard_number;
                        this.info.ngay_cccd_b2 = formatDate(this.notarizedDocument.customersB[1].idCard_issued_date);
                        this.info.dia_chi_b2 = this.notarizedDocument.customersB[1].address;
                    }
                }
            }
        },
        taohoso() {
            this.createContent()
            if (this.selectedForm.id == 1) {
                this.data = this.uy_quyen;
            }
            else if (this.selectedForm.id == 2) {
                this.data = this.chuyen_nhuong_dat;
            }
            else if (this.selectedForm.id == 3) {
                this.data = this.mua_ban_oto;
            } else {
                this.data = this.info;
            }
            this.showLoading = true;
            axios.post(`generateDocument/${this.selectedForm.id}`, this.data).then(res => {
                if (res.data.success) {
                    this.showLoading = false;
                    this.$emit('send-link', res.data.google_drive_link);
                    this.close()

                }
            })
        },
        close() {
            this.$emit('close');
        },
    }
}
</script>

<style scoped></style>