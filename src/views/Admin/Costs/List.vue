<template>
  <FormCost :showModal="showModal" @closeModal="showModal = false" :costIdToEdit="costIdToEdit"
    @resetCostId="costIdToEdit = null" :getCosts="getCosts" />

  <div class="card py-5 px-4">
    <h4 class="text-center text-blue">DANH SÁCH CHI PHÍ</h4>
    <div>
      <button class="btn-blue px-4 mt-2 mb-3" @click="showModal = true">
        <i class="fa-solid fa-plus"></i> Thêm mới
      </button>
    </div>

    <table class="myTable table table-striped  table-bordered ">
      <thead class="">
        <tr>
          <th>STT</th>
          <th>Loại chi phí</th>
          <th>Tên chi phí</th>
          <th>Chi phí</th>
          <th>Tùy chọn</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cost, index) in costs" :key="index">
          <th>{{ index + 1 }}</th>
          <td>{{ cost.cost_type.name }}</td>
          <td>{{ cost.name }}</td>
          <td>{{ formatPrice(cost.price) }}</td>
          <td>
            <button class="btn-icon" @click="deleteCost(cost.id)">
              <i class="fa-solid fa-trash"></i>
            </button>
            &nbsp;
            <button class="btn-icon mt-1" @click="editCost(cost.id)">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
          </td>

        </tr>


      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import { formatPrice, initializeDataTable } from '@/utils.js'
import FormCost from './Form.vue'
export default {
  name: 'ListCosts',
  components: {
    FormCost,
  },
  data() {
    return {
      costs: [],
      showModal: false,
      costIdToEdit: null,
    }
  },
  created() {
    this.getCosts()
  },
  methods: {
    formatPrice,initializeDataTable,
    async getCosts() {
      await axios.get('costs').then(res => {
        this.costs = res.data;
        this.initializeDataTable();
      })
    },
    editCost(id) {
      this.costIdToEdit = id;
      this.showModal = true;
    },
    deleteCost(id) {
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
          axios.delete(`costs/${id}`).then(res => {
            if (res.data.success) {
              this.$swal.fire('Đã xóa thành công!', '', 'success');
              this.getCosts();
            }
          });
        }
      });
    }
  }

}
</script>

<style lang="scss" scoped></style>