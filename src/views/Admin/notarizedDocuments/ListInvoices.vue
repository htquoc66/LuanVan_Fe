<template>
    <div>
        <h4 class="text-center text-blue py-2">Danh sách phiếu thu</h4>
        <table class="myTable table table-striped  table-bordered ">
            <thead>
                <tr>
                    <th>Số phiếu thu</th>
                    <th>Kế toán</th>
                    <th>Nội dung</th>
                    <th>Tổng phí</th>
                    <th>Thanh toán</th>
                    <th>Ngày</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(invoice, index) in invoices" :key="index">
                    <td>{{ invoice.id }}</td>
                    <td>{{ invoice.user.name }}</td>
                    <td>{{ invoice.content }}</td>
                    <td>{{ formatPrice(invoice.cost) }}</td>
                    <td>{{ invoice.payment_method }}</td>
                    <td>{{ formatDate(invoice.date) }}</td>
                    <td>
                        <button class="btn-blue" @click="printf(invoice.file_pdf)">
                            <i class="fa-solid fa-print"></i>&nbsp;In phiếu
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="modal-container" v-show="showModal">
        <div class="modal-overlay" @click="showModal = false"></div>
        <div class="modal-content p-0" style="width: 80vw; height: 90vh;">
            <iframe class="w-100 h-100" :src="url"></iframe>
        </div>
        </div>
</template>

<script>
import axios from 'axios';
import { initializeDataTable, formatDate, formatPrice } from '@/utils';

export default {
    data() {
        return {
            invoices: [],
            admin: [],
            url:'',
            showModal: false
        }
    },
    created() {
        // Lấy giá trị admin từ localStorage
        var storeData = localStorage.getItem('store');
        this.admin = JSON.parse(storeData).admin;

        this.getInvoices();
    },
    methods: {
        initializeDataTable,formatDate,formatPrice,
        printf(file){
            this.showModal = true;
            this.url = 'http://127.0.0.1:8000/storage/pdfs/'+ file;
        },
        getInvoices() {
            // Truy vấn các tài liệu công chứng có trạng thái tương ứng và liên kết với người dùng cụ thể
            axios.get('invoices')
                .then((res) => {
                    this.invoices = res.data;
                    this.initializeDataTable();
                })
        }
    }
}
</script>

<style scoped></style>