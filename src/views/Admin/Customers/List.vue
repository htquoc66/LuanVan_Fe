<template>
  <div v-if="hasPermission(1) || hasPermission(3) || hasPermission(6)">
    <FormCustomer :showModal="showModal" @closeModal="showModal = false" :getCustomers="getCustomers"
      :customerIdToEdit="customerIdToEdit" @reset-customer-id="customerIdToEdit = null" />

    <div class="card py-5 px-4">
      <h4 class="text-center text-blue">DANH SÁCH KHÁCH HÀNG</h4>
      <div class="">
        <button v-show="hasPermission(7)" class="btn-blue px-4 mt-2 mb-3" @click="showModal = true">
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
            <th>Họ tên</th>
            <th>Ngày sinh</th>
            <th>Email</th>
            <th>Giới tính</th>
            <th>Sđt</th>
            <th>Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(customer, index) in customers" :key="index" @click="toggleDetails(index)">
            <td>{{ customer.type }}
              <p v-if="customer.expanded" class="mt-2 mb-0"><strong>Số CCCD:</strong> {{ customer.idCard_number }}</p>

            </td>
            <td>{{ customer.name }}
              <p v-if="customer.expanded" class="mt-2 mb-0"><strong>Ngày cấp:</strong> {{ customer.idCard_issued_date }}
              </p>

            </td>
            <td>{{ formatDate(customer.date_of_birth) }}
              <p v-if="customer.expanded" class="mt-2 mb-0"><strong>Nơi cấp:</strong> {{ customer.idCard_issued_place }}
              </p>

            </td>
            <td>{{ customer.email }}
              <p v-if="customer.expanded" class="mt-2 mb-0"><strong>Địa chỉ:</strong> {{ customer.address }}</p>

            </td>
            <td>{{ customer.gender }}
            </td>
            <td>{{ customer.phone }}</td>
            <td>
              <!-- <button class="btn-icon" @click="deleteCustomer(customer.id)">
                <i class="fa-solid fa-trash "></i>
              </button> -->
              <button class="btn-icon mt-1" @click="showDetail(customer)">
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
              &nbsp;
              <button v-show="hasPermission(8)" class="btn-icon mt-1" @click="editCustomer(customer.id)">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else class="not-have-access">
        <div class="text-center">
            <h3>Bạn không đủ quyền truy cập!</h3>
            <RouterLink to="/admin/dashboard" class="mt-3 btn btn-success">Trở về trang chủ</RouterLink>
        </div>
    </div>

  <div class="modal-container" v-show="showList">
    <div class="modal-overlay" @click="showList = false"></div>
    <div class="modal-content">
      <span class="modal-close" @click="showList = false"><i class="fa-solid fa-circle-xmark"></i></span>

      <h4 class="text-blue text-center py-3">Danh sách hồ sơ</h4>
      <div>Tên khách hàng: {{ selectedCustomer.name }}</div>
      <div class="mb-2">Số điện thoại: {{ selectedCustomer.phone }}</div>
      <table class="myTable table table-striped  table-bordered ">
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
</template>

<script>
import axios from 'axios';
import $ from 'jquery';
import FormCustomer from './Form.vue';
import { formatDate, hasPermission, formatPrice } from '@/utils';
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
      showList: false,
      documents: [],
      selectedCustomer:''
    };
  },
  created() {
    this.getCustomers();
  },
  methods: {
    hasPermission,formatPrice,
    showDetail(customer) {
      this.selectedCustomer = customer;
      axios.get(`notarizedDocuments/customer-${customer.id}`).then(res => {
        this.documents = res.data;
        this.initializeDataTable();
      })
      this.showList = true;
    },
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
