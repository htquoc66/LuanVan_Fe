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
                        <span v-if="notarizedDocument.status == 0">Bị hủy</span>
                       
                    </td>
                    <td>{{ formatDate(notarizedDocument.date) }}</td>
                    <td class="text-center">
                        <button class="btn-icon" v-if="hasPermission(3) || hasPermission(4)">
                            <i class="fa-solid fa-trash"></i>
                        </button>
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
import { formatDate,initializeDataTable, hasPermission } from '@/utils';
import axios from 'axios';
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

  
    this.getNotarizedDocuments(0, this.admin.id);

  },
  methods: {
    formatDate,initializeDataTable,hasPermission,
    getNotarizedDocuments(statusValue, userId) {
      // Truy vấn các tài liệu công chứng có trạng thái tương ứng và liên kết với người dùng cụ thể
      axios.get(`notarizedDocuments/status-${statusValue}/user-${userId}`)
        .then((res) => {
          this.notarizedDocuments = res.data;
          this.initializeDataTable();        

        })
        .catch((error) => {
          console.error(error);
        });
    },
    deleteNotarizedDocument(id) {
      this.$swal.fire({
        title: 'Bạn có chắc chắn muốn xóa?',
        icon: 'warning',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy',
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`notarizedDocuments/${id}`).then(res => {
            if (res.data.success) {
              this.$swal.fire('Đã xóa thành công!', '', 'success');
              this.getNotarizedDocuments(1, this.admin.id);
            }
          });
        }
      });
    },

  }

}
</script>

<style scoped></style>