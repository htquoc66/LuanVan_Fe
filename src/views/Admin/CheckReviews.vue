<template>
    <div>
        <div class="card py-5 px-4">
            <h4 class="text-center text-blue">QUẢN LÝ ĐÁNH GIÁ</h4>

            <table class="myTable table table-striped  table-bordered ">
                <thead class="">
                    <tr>
                        <th>STT</th>
                        <th>Tên khách hàng</th>
                        <th>Số điểm</th>
                        <th>Nội dung</th>
                        <th>Ngày đánh giá</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(review,  index) in reviews" :key="index">
                        <th>{{ index+1 }}</th>
                        <td>{{ review.customer.name }}</td>
                        <td>{{ review.rating }}</td>
                        <td>{{ review.content }}</td>
                        <td>{{ review.created_at }}</td>
                        <td>
                            <button class="btn btn-danger" @click="updateStatus(review.id, 2)" v-if="review.status == 1">Chờ xử lý</button>
                            <button class="btn btn-success" @click="updateStatus(review.id, 1)" v-else>Đang hiển thị</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return{
            reviews:[]
        }
    },
    created(){
        this.getReviews();
    },  
    methods:{
        async getReviews(){
            await axios.get(`reviews`).then(res=>{
                this.reviews = res.data;
            })
        },
        updateStatus(id, status) {
        axios.put(`reviews/${id}`, null, { params: { status } })
        .then(res => {
            console.log(res.data)
            if (res.data.success) {
                this.getReviews();
            }
        })
        .catch(error => {
            console.error('Lỗi khi cập nhật trạng thái:', error);
            // Xử lý lỗi nếu cần
        });
}

    }
}
</script>

<style scoped></style>