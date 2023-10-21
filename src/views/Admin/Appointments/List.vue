<template>
  <div>
    <h4 class="text-center text-blue py-3">DANH SÁCH LỊCH HẸN</h4>
    <table class="myTable table table-striped  table-bordered ">
      <thead class="">
        <tr>
          <th style="width:50px">STT</th>
          <th>Tên khách hàng</th>
          <th>Ngày hẹn</th>
          <th>Giờ hẹn</th>
          <th>Nội dung</th>
          <th>Trạng thái</th>
          <th style="width:220px">Tùy chọn</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(appointment, index) in appointments" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ appointment.customer.name }}</td>
          <td>{{ appointment.date.date_field }}</td>
          <td>{{ appointment.time.time_field }}</td>
          <td>{{ appointment.content }}</td>
          <td class="text-danger">
            Chờ xác nhận
          </td>
          <td class="text-center">
            <button @click="confirm(appointment)" class="btn-blue">Xác nhận</button>
            &nbsp;
            <button class="btn-icon">Hủy</button>

          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import { initializeDataTable, formatDate } from '@/utils'

export default {
  data() {
    return {
      appointments: [],
      myAppointments: [],
      admin: [],
      appointment: {
        user_id: '',
        status: 2
      }
    }
  },
  created() {
    this.getAppointments();
    // Lấy giá trị admin từ localStorage
    var storeData = localStorage.getItem('store');
    this.admin = JSON.parse(storeData).admin;

    this.getAppointmentsByUser();
  },
  methods: {
    initializeDataTable, formatDate,
    async getAppointments() {
      await axios.get('appointments').then(res => {
        this.appointments = res.data.filter(appointment => appointment.status == 1);
        this.initializeDataTable();
      });
    }
    ,
    async getAppointmentsByUser() {
      const response = await axios.get('myAppointments', {
        params: { user_id: this.admin.id }
      });
      this.myAppointments = response.data;
    },
    confirm(appointment) {
      const isAvailable = this.myAppointments.every(myAppointment => {
        return (
          myAppointment.date.date_field !== appointment.date.date_field ||
          myAppointment.time.time_field !== appointment.time.time_field
        );
      });
      if (isAvailable) {
        this.appointment.user_id = this.admin.id;
        axios.put(`appointments/${appointment.id}`, this.appointment).then(res => {
          if (res.data.success) {
            this.$swal.fire('Cuộc hẹn đã được xác nhận!', '', 'success');
            this.getAppointments();
            this.getAppointmentsByUser();
          }
        });
      } else {
        this.$swal.fire({
          icon: 'error',
          html: 'Bạn đã có cuộc hẹn khác vào lúc: ' + appointment.time.time_field +
            '<br>Ngày: ' + this.formatDate(appointment.date.date_field),
        });
      }
    }
  }
}
</script>

<style scoped></style>