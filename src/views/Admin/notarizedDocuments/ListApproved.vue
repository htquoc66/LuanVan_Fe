<template>
    <div>
        <h4 class="text-center text-blue mt-2">DANH SÁCH HỒ SƠ</h4>
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
                <tr v-for="(notarizedDocument, index) in notarizedDocuments" :key="index">
                    <th>{{ notarizedDocument.id }}</th>
                    <td>{{ notarizedDocument.category.name }}</td>
                    <td>{{ notarizedDocument.name }}</td>
                    <td>
                        <div v-for="(customer, index) in notarizedDocument.customersA" :key="index">
                            {{ customer.name }}
                        </div>
                    </td>
                    <td>
                        <div v-for="(customer, index) in notarizedDocument.customersB" :key="index">
                            {{ customer.name }}
                        </div>
                    </td>
                    <td>{{ notarizedDocument.notary[0].name }}</td>
                    <td>
                        <span class="text-danger" v-if="notarizedDocument.status == 3">Chờ tính phi</span>
                        <span class="text-danger" v-if="notarizedDocument.status == 4">Đang cập nhật</span>
                        <span class="text-danger" v-if="notarizedDocument.status == 5">Hoàn thành</span>
                    </td>
                    <td>{{ formatDate(notarizedDocument.date) }}</td>
                    <td class="text-center">
      
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
import $ from 'jquery'

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


        this.getNotarizedDocuments(this.admin.id);


    },
    methods: {
        formatDate, initializeDataTable, hasPermission,
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
  
  