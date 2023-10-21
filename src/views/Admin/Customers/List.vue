<template>
  <div>
    <FormCustomer :showModal="showModal" @closeModal="showModal = false" :getCustomers="getCustomers"
      :customerIdToEdit="customerIdToEdit" @reset-customer-id="customerIdToEdit = null" />

    <div class="card py-5 px-4">
      <h4 class="text-center text-blue">DANH SÁCH KHÁCH HÀNG</h4>
      <div class="">
        <button class="btn-blue px-4 mt-2 mb-3" @click="showModal = true">
          <i class="fa-solid fa-plus"></i> Thêm mới
        </button>
        &nbsp;
        <button class="btn-blue px-4 mt-2 mb-3" @click="exportToExcel">
          <i class="fa-solid fa-file-excel"></i> Xuất Excel
        </button>

      </div>

      <table class="myTable table table-striped  table-bordered ">
        <thead class="">
          <tr>
            <th>Loại KH</th>
            <th style="width: 15% !important;">Họ tên</th>
            <th>Số CCCD</th>
            <th>Ngày cấp</th>
            <th>Nơi cấp</th>
            <th>Giới tính</th>
            <th>Ngày sinh</th>
            <th>Sđt</th>
            <th>Email</th>
            <th style="width: 20% !important;">Địa chỉ</th>
            <th>Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(customer, index) in customers" :key="index">
            <td>{{ customer.type }}</td>
            <td>{{ customer.name }}</td>
            <td>{{ customer.idCard_number }}</td>
            <td>{{ formatDate(customer.idCard_issued_date) }}</td>
            <td>{{ customer.idCard_issued_place }}</td>
            <td>{{ customer.gender }}</td>
            <td>{{ formatDate(customer.date_of_birth) }}</td>
            <td>{{ customer.phone }}</td>
            <td>{{ customer.email }}</td>
            <td>{{ customer.address }}</td>
            <td>
              <button class="btn-icon" @click="deleteCustomer(customer.id)">
                <i class="fa-solid fa-trash "></i>
              </button>
              &nbsp;
              <button class="btn-icon mt-1" @click="editCustomer(customer.id)">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import $ from 'jquery';
import FormCustomer from './Form.vue';
import { formatDate, initializeDataTable } from '@/utils';
import ExcelJS from 'exceljs';

export default {
  name: 'ListCustomers',
  components: {
    FormCustomer,
  },
  data() {
    return {
      customers: [],
      showModal: false,
      customerIdToEdit: null,
    };
  },
  created() {
    this.getCustomers();
  },
  methods: {
    async exportToExcel() {
      try {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Khách hàng');

        // Định nghĩa tiêu đề cho tệp Excel 
        worksheet.columns = [
          { header: 'Loại KH', key: 'type', width: 18 },
          { header: 'Họ tên', key: 'name', width: 20 },
          { header: 'Số CCCD', key: 'idCard_number', width: 15 },
          { header: 'Ngày cấp CCCD', key: 'idCard_issued_date', width: 15 },
          { header: 'Nơi cấp CCCD', key: 'idCard_issued_place', width: 15 },
          { header: 'Giới tính', key: 'gender', width: 10 },
          { header: 'Ngày sinh', key: 'date_of_birth', width: 15 },
          { header: 'Số điện thoại', key: 'phone', width: 15 },
          { header: 'Email', key: 'email', width: 22 },
          { header: 'Địa chỉ', key: 'address', width: 20 },
        ];





        // Thêm dữ liệu từ mảng khách hàng của bạn
        this.customers.forEach(customer => {
          worksheet.addRow(customer);
        });

        // Tạo một Blob từ tệp Excel
        const blob = await workbook.xlsx.writeBuffer();

        // Tạo một URL cho Blob
        const url = window.URL.createObjectURL(new Blob([blob]));

        // Tạo một liên kết để tải tệp Excel
        const a = document.createElement('a');
        a.href = url;
        a.download = 'danh_sach_khach_hang.xlsx';
        a.click();

        // Dọn dẹp
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error(error);
      }
    },



    formatDate,
    initializeDataTable,
    editCustomer(id) {
      this.customerIdToEdit = id;
      this.showModal = true;
    },
    async getCustomers() {
      try {
        const response = await axios.get('customers');
        this.customers = response.data;
        this.initializeDataTable();

      } catch (error) {
        console.log(error);
      }
    },
    deleteCustomer(id) {
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
          axios.delete(`customers/${id}`).then(res => {
            if (res.data.success) {
              this.$swal.fire('Đã xóa thành công!', '', 'success');
              this.getCustomers();
            }
          });
        }
      });
    },
  },

};
</script>

<style scoped></style>
