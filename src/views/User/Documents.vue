<template>
    <div class="container pt-3 pb-5">
        <div class="row">
            <div class="col-8">
                <div class="card h-100 px-2">
                    <div class="text-blue text-center pt-3 pb-3">
                        <h5>HỒ SƠ CỦA TÔI</h5>
                    </div>
                    <table class="myTable table table-striped  table-bordered">
                        <thead>
                            <tr>
                                <th>Số hồ sơ</th>
                                <th>Tên hồ sơ</th>
                                <th>Ngày tạo</th>
                                <th>Trạng thái</th>
                                <th>Chi phí</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(document, index) in documents" :key="index">
                                <td>{{ document.id }}</td>
                                <td>{{ document.name }}</td>
                                <td>{{ formatDate(document.date) }}</td>
                                <td>
                                    <span class="text-danger" v-if="document.status == 2">Chờ trưởng phòng duyệt</span>
                                    <span class="text-danger" v-if="document.status == 3">Chờ kế toán duyệt</span>
                                    <span class="text-danger" v-if="document.status == 4">Đang cập nhật</span>
                                    <span class="text-danger" v-if="document.status == 5">Hoàn thành</span>
                                </td>
                                <td>
                                    <span v-if="document.status == 5">
                                        {{ formatPrice(document.total_cost) }} vnđ
                                    </span>
                                    <span v-else>
                                        Đang chờ tính
                                    </span>
                                </td>

                            </tr>
                        </tbody>
                    </table>


                </div>
            </div>

            <div class="col-4 ">
                <div class="card px-2 h-100">
                    <div class="text-center text-blue py-3">
                        <h5>LIÊN KẾT TRANG</h5>
                    </div>
                    <a target="_blank" class="text-dark  mb-3 d-block" href="https://www.moj.gov.vn/Pages/home.aspx">
                        <img src="@/assets/home/img5.jpg" style="width: 100%;" alt="">
                    </a>
                    <a target="_blank" class="text-dark mb-3 d-block" href="http://cantho.gov.vn/wps/portal/sotp/">
                        <img src="@/assets/home/img6.jpg" style="width: 100%;" alt="">
                    </a>
                    <a target="_blank" class="text-dark mb-3 d-block" href="https://www.cantho.gov.vn/wps/portal/home">
                        <img src="@/assets/home/img7.jpg" style="width: 100%;" alt="">
                    </a>
                    <a target="_blank" class="text-dark mb-3 d-block" href="https://cna.org.vn/">
                        <img src="@/assets/home/img8.jpg" style="width: 100%;" alt="">
                    </a>
                    <a target="_blank" class="text-dark mb-3 d-block" href="http://cantho.gov.vn/wps/portal/sotnmt/">
                        <img src="@/assets/home/img9.jpg" style="width: 100%;" alt="">
                    </a>
                    <a target="_blank" class="text-dark mb-3 d-block" href="http://cantho.gov.vn/wps/portal/sokhdt/">
                        <img src="@/assets/home/img10.jpg" style="width: 100%;" alt="">
                    </a>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { formatDate, formatPrice, initializeDataTable } from '@/utils';
export default {
    data() {
        return {
            documents: [],
            customer: []
        }
    },
    created() {
        var storeData = localStorage.getItem('store');
        this.customer = JSON.parse(storeData).user;
        if (this.customer) {

            this.getDocuments();
        }
    },
    methods: {
        formatDate, formatPrice, initializeDataTable,
        getDocuments() {
            axios.get(`notarizedDocuments/customer-${this.customer.id}`).then(res => {
                this.documents = res.data;
                this.initializeDataTable();
            })
        }
    }
}
</script>


