<template>
  <div>
    <FormCategory :showModal="showModal" @closeModal="showModal = false" :categoryIdToEdit="categoryIdToEdit"
      :getCategories="getCategories" @resetCategoryId="categoryIdToEdit = null" />

    <div class="card py-5 px-4">
      <h4 class="text-center text-blue">DANH SÁCH DANH MỤC</h4>
      <div>
        <button class="btn-blue px-4 mt-2 mb-3" @click="showModal = true">
          <i class="fa-solid fa-plus"></i> Thêm mới
        </button>
      </div>
      <table class="myTable table table-striped  table-bordered ">
        <thead class="">
          <tr>
            <th>STT</th>
            <th>Tên loại</th>
            <th>Phí hồ sơ</th>
            <th>Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(category, index) in categories" :key="index">
            <th>{{ index + 1 }}</th>
            <td>{{ category.name }}</td>
            <td>{{ formatPrice(category.price) }}</td>

            <td>
              <button class="btn-icon" @click="deleteCategory(category.id)">
                <i class="fa-solid fa-trash"></i>
              </button>
              &nbsp;
              <button class="btn-icon mt-1" @click="editCategory(category.id)">
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
import FormCategory from './Form.vue';
import {initializeDataTable, formatPrice} from '@/utils'

export default {
  name: 'ListCategories',
  components: {
    FormCategory,
  },
  data() {
    return {
      categories: [],
      showModal: false,
      categoryIdToEdit: null,
    }
  },
  created() {
    this.getCategories();
  },
  methods: {
    initializeDataTable, formatPrice,
    editCategory(id) {
      this.categoryIdToEdit = id;
      this.showModal = true;
    },
    deleteCategory(id) {
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
          axios.delete(`categories/${id}`).then(res => {
            if (res.data.success) {
              this.$swal.fire('Đã xóa thành công!', '', 'success');
              this.getCategories();
            }
          });
        }
      });
    },
    async getCategories() {
        const response = await axios.get('categories');
        this.categories = response.data;
        this.initializeDataTable();        
     
    }
  }
}
</script>

<style scoped></style>