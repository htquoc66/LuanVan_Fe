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
        <button v-if="hasPermission(1)" class="btn-blue px-4 mt-2 mb-3" @click="exportToExcel">
          <i class="fa-solid fa-file-excel"></i> Xuất Excel
        </button>
      </div>

      <table class="myTable table table-striped">
        <thead class="">
          <tr>
            <th>Loại KH</th>
            <th >Họ tên</th>
            <th>Ngày sinh</th>
            <th style="width: 20% !important;">Giới tính</th>
            <th>Email</th>
            <th>Sđt</th>
            <th>Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(customer, index) in customers" :key="index" @click="toggleDetails(index)" >
            <td>{{ customer.type }}
              <p v-if=" customer.expanded" class="mt-2 mb-0"><strong>Số CCCD:</strong> {{ customer.idCard_number }}</p>             
            
            </td>
            <td>{{ customer.name }}         
              <p v-if=" customer.expanded" class="mt-2 mb-0"><strong>Ngày cấp:</strong> {{ customer.idCard_issued_date }}</p>

            </td>
            <td>{{ formatDate(customer.date_of_birth) }}
              <p v-if=" customer.expanded" class="mt-2 mb-0"><strong>Nơi cấp:</strong> {{ customer.idCard_issued_place }}</p>

            </td>
            <td>{{ customer.gender }}
              <p v-if=" customer.expanded" class="mt-2 mb-0"><strong>Địa chỉ:</strong> {{ customer.address }}</p>

            </td>
            <td>{{ customer.email }}
            </td>
            <td>{{ customer.phone }}</td>
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
import { formatDate, hasPermission } from '@/utils';
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
    hasPermission,
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
    toggleDetails(index) {
      console.log('Toggling details for index:', index);
  this.customers[index].expanded = !this.customers[index].expanded;
  console.log('Expanded state:', this.customers[index].expanded);

    },
    initializeDataTable() {
      if ($.fn.DataTable.isDataTable(".myTable")) {
        $(".myTable").DataTable().destroy();
      }
      this.$nextTick(() => {
        $(".myTable").DataTable({
          language: {
            search: "Tìm kiếm:",
            searchPlaceholder: "Tìm kiếm",
            loadingRecords: "Đang tải...",
            zeroRecords: "Không tìm thấy kết quả",
            lengthMenu: "Hiển thị _MENU_ dòng",
            info: "Hiển thị _START_ đến _END_ của _TOTAL_ dòng",
            infoEmpty: "",
            paginate: {
              first: "<<",
              last: ">>",
              next: ">",
              previous: "<",
            },
          },
          order: [],
          lengthMenu: [5, 10, 25, 50],
          pageLength: 5,
        });
      });
    },
    editCustomer(id) {
      this.customerIdToEdit = id;
      this.showModal = true;
    },
    async getCustomers() {
      try {
        const response = await axios.get('customers');
        this.customers = response.data.map(customer => ({
          ...customer,
          expanded: false, // Initial state for expansion
        }));
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

<style scoped>
.expand-row-btn {
  cursor: pointer;
}

.expanded-details {
  margin-top: 10px;
}
</style>
