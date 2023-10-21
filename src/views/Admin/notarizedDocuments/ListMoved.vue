<template>
  <div>
    <h4 class="text-center text-blue mt-2">DANH SÁCH HỒ SƠ</h4>
      <button v-if="selectedNotarizedDocuments.length > 0" @click="taophieuthu()">Tạo phiếu thu</button>

    <table v-if="hasPermission(2)" class="myTable table table-striped  table-bordered ">
      <thead class="">
        <tr>
          <th data-orderable="false" class="text-center no-sort">
            <input type="checkbox" v-model="selectAll" @click="toggleSelectAll">
          </th>
          <th>Số HS</th>
          <th>Loại</th>
          <th>Tên hồ sơ</th>
          <th>CCV</th>
          <th>Tổng phí</th>
          <th>Trạng thái</th>
          <th>Ngày tạo</th>
          <th v-if="hasPermission(1)">Tùy chọn</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(notarizedDocument, index) in notarizedDocuments" :key="index">
          <td class="text-center">
            <input type="checkbox" v-model="notarizedDocument.checked" @change="handleCheckboxChange(notarizedDocument)">
          </td>
          <td>{{ notarizedDocument.id }}</td>
          <td>{{ notarizedDocument.category.name }}</td>
          <td>{{ notarizedDocument.name }}</td>
          <td>{{ notarizedDocument.notary[0].name }}</td>
          <td>{{ formatPrice(notarizedDocument.total_cost) }} đ</td>
          <td>
            <span class="text-danger" v-if="notarizedDocument.status == 4">Đang cập nhật</span>
          </td>
          <td>{{ notarizedDocument.date }}</td>
          <td v-if="hasPermission(1)">
            <RouterLink class="text-a" :to="{ name: 'formNotarizedDocuments', query: { id: notarizedDocument.id } }">
              <button class="btn-icon">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
            </RouterLink>
          </td>
        </tr>

      </tbody>
    </table>

    <table v-else class="myTable table table-striped  table-bordered ">
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
          <th >Tùy chọn</th>
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
            <span class="text-danger" v-if="notarizedDocument.status == 2">Chờ trưởng phòng duyệt</span>
            <span class="text-danger" v-if="notarizedDocument.status == 3">Chờ kế toán duyệt</span>
          </td>
          <td>{{ formatDate(notarizedDocument.date) }}</td>
          <td  class="text-center">
            <!-- <button class="btn-icon">
              <i class="fa-solid fa-trash"></i>
            </button> -->
            <RouterLink class="text-a" :to="{ name: 'formNotarizedDocuments', query: { id: notarizedDocument.id } }">
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
import { formatDate, formatPrice, initializeDataTable, hasPermission } from '@/utils';

export default {
  data() {
    return {
      notarizedDocuments: [],
      admin: [],
      selectedNotarizedDocuments: [],
      selectAll: false,
    }

  },
  created() {
    // Lấy giá trị admin từ localStorage
    var storeData = localStorage.getItem('store');
    this.admin = JSON.parse(storeData).admin;

    // Kiểm tra quyền để lấy danh sách hồ sơ
    if (this.hasPermission(3)) {
      this.getNotarizedDocuments(2, this.admin.id);
    }
    if (this.hasPermission(1)) {
      this.getNotarizedDocuments(3, this.admin.id);
    }
    if (this.hasPermission(2)) {
      this.getNotarizedDocuments(4, this.admin.id);
    }

  },
  methods: {
    formatDate, formatPrice, initializeDataTable, hasPermission,
    taophieuthu(){
      this.$store.dispatch('setSelectedNotarizedDocuments', this.selectedNotarizedDocuments);                
      this.$router.push({ name: 'Invoice' })
    },
    toggleSelectAll() {
      this.selectAll = !this.selectAll;
      if (this.selectAll) {
        this.selectedNotarizedDocuments = [...this.notarizedDocuments];
      } else {
        this.selectedNotarizedDocuments = [];
      }
      this.notarizedDocuments.forEach((notarizedDocument) => {
        notarizedDocument.checked = this.selectAll;
      });
    },


    handleCheckboxChange(notarizedDocument) {
      if (notarizedDocument.checked) {
        // Nếu checkbox được chọn, thêm hồ sơ vào mảng selectedNotarizedDocuments
        this.selectedNotarizedDocuments.push(notarizedDocument);
      } else {
        // Nếu checkbox bị hủy chọn, loại bỏ hồ sơ khỏi mảng selectedNotarizedDocuments
        const index = this.selectedNotarizedDocuments.findIndex((doc) => doc.id === notarizedDocument.id);
        if (index !== -1) {
          this.selectedNotarizedDocuments.splice(index, 1);
        }
      }
    },

    getNotarizedDocuments(statusValue, userId) {
      // Truy vấn các tài liệu công chứng có trạng thái tương ứng và liên kết với người dùng cụ thể
      axios.get(`notarizedDocuments/status-${statusValue}/user-${userId}`)
        .then((res) => {
          this.notarizedDocuments = res.data;
          this.initializeDataTable();
        })
    }
  },


}
</script>

<style lang="css" scoped>
.no-sort {
  padding: 7px 0 !important;
}


.no-sort::before {
  display: none !important;
}

.no-sort::after {
  display: none !important;
}
</style>