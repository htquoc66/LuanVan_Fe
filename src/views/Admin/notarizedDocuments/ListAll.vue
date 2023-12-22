<template>
    <div v-if="hasPermission(1)">
        <h4 class="text-center text-blue mt-2">DANH SÁCH HỒ SƠ</h4>
        <div class="">

            <button class="btn-blue px-4 mt-2 mb-3" @click="exportToExcel">
                <i class="fa-solid fa-file-excel"></i> Xuất Excel
            </button>

        </div>
        <table class="myTable table table-striped  table-bordered ">
            <thead class="">
                <tr>
                    <th>Số HS</th>
                    <th>Loại</th>
                    <th>Tên hồ sơ</th>
                    <th>Khách hàng A</th>
                    <th>Khách hàng B</th>
                    <th>CCV</th>
                    <th>Trạng thái</th>
                    <th>Ngày tạo</th>
                    <th>Tùy chọn</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(notarizedDocument, index) in notarizedDocuments" :key="index"
                    v-show="notarizedDocument.status != 1">
                    <th>{{ notarizedDocument.id }}</th>
                    <td>{{ notarizedDocument.category.name }}</td>
                    <td>{{ notarizedDocument.name }}</td>
                    <td>
                        <div v-for="(customer, index) in notarizedDocument.customersA" :key="index">
                            {{ customer.name }}
                            <span class="d-none">{{ customer.address }}</span>
                            <span class="d-none">{{ customer.phone }}</span>
                            <span class="d-none">{{ customer.idCard_number }}</span>
                        </div>
                    </td>
                    <td>
                        <div v-for="(customer, index) in notarizedDocument.customersB" :key="index">
                            {{ customer.name }}
                            <span class="d-none">{{ customer.address }}</span>
                            <span class="d-none">{{ customer.phone }}</span>
                            <span class="d-none">{{ customer.idCard_number }}</span>
                        </div>
                    </td>
                    <td>{{ notarizedDocument.notary[0].name }}</td>
                    <td>
                        <span v-if="notarizedDocument.status == 1">Hồ sơ lưu</span>
                        <span class="text-danger" v-if="notarizedDocument.status == 0">Hủy</span>
                        <span class="text-danger" v-if="notarizedDocument.status == 2">Chờ trưởng phòng duyệt</span>
                        <span class="text-danger" v-if="notarizedDocument.status == 3">Chờ tính phi</span>
                        <span class="text-danger" v-if="notarizedDocument.status == 4">Đang cập nhật</span>
                        <span class="text-danger" v-if="notarizedDocument.status == 5">Hoàn thành</span>

                    </td>
                    <td>{{ formatDate(notarizedDocument.date) }}</td>
                    <td class="text-center">

                        &nbsp;
                        <RouterLink class="text-a"
                            :to="{ name: 'formNotarizedDocuments', query: { id: notarizedDocument.id } }">
                            <button class="btn-icon">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                        </RouterLink>
                    </td>
                </tr>

            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
import { formatDate, initializeDataTable, hasPermission } from '@/utils';
import ExcelJS from 'exceljs';

export default {
    data() {
        return {
            notarizedDocuments: [],
            admin: []
        }

    },
    created() {
        // Lấy giá trị admin từ localStorage
        var storeData = localStorage.getItem('store');
        this.admin = JSON.parse(storeData).admin;

        this.getNotarizedDocuments(this.admin.id)
    },
    methods: {
        formatDate, initializeDataTable, hasPermission,
        async exportToExcel() {
            try {
                const workbook = new ExcelJS.Workbook();
                const worksheet = workbook.addWorksheet('Danh Sách Hồ Sơ');

                // Định nghĩa tiêu đề cho các cột
                worksheet.columns = [
                    { header: 'Số HS', key: 'id', width: 10 },
                    { header: 'Loại', key: 'category', width: 15 },
                    { header: 'Tên hồ sơ', key: 'name', width: 20 },
                    { header: 'Khách hàng A', key: 'customersA', width: 25 },
                    { header: 'Khách hàng B', key: 'customersB', width: 25 },
                    { header: 'Công chứng viên', key: 'notary', width: 20 },
                    { header: 'Trạng thái', key: 'status', width: 15 },
                    { header: 'Ngày tạo', key: 'date', width: 15 }
                ]

            // Thêm dữ liệu từ danh sách hồ sơ vào tệp Excel
            this.notarizedDocuments.forEach((document) => {

                worksheet.addRow({
                    id: document.id,
                    category: document.category.name,
                    name: document.name,
                    customersA: document.customersA.map(customer => customer.name).join(', '),
                    customersB: document.customersB.map(customer => customer.name).join(', '),
                    notary: document.notary[0].name,
                    status: this.getStatusLabel(document.status),
                    date: formatDate(document.date)
                });
            });

            // Tạo một Blob từ tệp Excel
            const blob = await workbook.xlsx.writeBuffer();

            // Tạo một URL cho Blob
            const url = window.URL.createObjectURL(new Blob([blob]));

            // Tạo một liên kết để tải tệp Excel
            const a = document.createElement('a');
            a.href = url;
            a.download = 'danh_sach_ho_so.xlsx';
            a.click();

            // Dọn dẹp
            window.URL.revokeObjectURL(url);
        } catch(error) {
            console.error(error);
        }
    },

    getStatusLabel(status) {
        switch (status) {
            case 1:
                return 'Hồ sơ lưu';
            case 2:
                return 'Chờ trưởng phòng duyệt';
            case 3:
                return 'Chờ tính phí';
            case 4:
                return 'Đang cập nhật';
            case 5:
                return 'Hoàn thành';
            default:
                return '';
        }
    },
    getNotarizedDocuments(userId) {
        axios.get(`notarizedDocuments/user-${userId}`)
            .then((res) => {
                this.notarizedDocuments = res.data;
                this.initializeDataTable();
            })
    }


}
}
</script>

<style scoped></style>