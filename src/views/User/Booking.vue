<template>
  <div class="container-xl">
    <div class="heading">ĐẶT LỊCH CÔNG CHỨNG</div>
    <div class="">
      <div class="mb-3">
        <div class="calendar d-flex">
          <button class="btn-blue" @click="previousWeek">&lt;</button>
          <input type="date" :min="minDate" v-model="selectedDate" @change="dateSelected" class="mx-3 px-3">
          <button class="btn-blue" @click="nextWeek">&gt;</button>
        </div>
      </div>
      <div class="table-responsive">
        <table class="booking-table table table-bordered table-striped text-center">
          <thead>
            <tr>
              <th></th>
              <th v-for="(item, index) in weekWithDates.slice(1)" :key="index">
                <div class="table-text">{{ item.day }}</div>
                <div class="table-text">{{ formatDate(item.date) }}</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="timeSlot in timeSlots" :key="timeSlot">
              <td>
                <h6 class="table-text">{{ timeSlot.time }}</h6>
              </td>
              <td v-for="(day, index) in weekWithDates.slice(1)" :key="index">
                <div v-if="isTimeDateConflict(timeSlot.id, day.date)">
                  <button @click="showBooking(day.date, timeSlot)" class="btn-booking" v-if="day.date >= minDate">
                    <i class="fa-solid fa-plus"></i>
                  </button>
                </div>
                <div v-else>
                  full
                </div>
              </td>
              <!-- <td v-for="(day, index) in weekWithDates.slice(1)" :key="index">
              <div v-for="appointment in appointments" :key="appointment.id">
                <div
                  v-if="appointment.date.date_field === day.date && appointment.time_id === timeSlot.id && appointment.customer_id == customer.id">
                  <div>Nội dung: {{ appointment.content }}</div>
                </div>
              </div>
            </td> -->

            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>

  <div class="modal-container" v-if="showModal">
    <div class="modal-overlay" @click="showModal = false"></div>
    <div class="modal-content" style="width: 60vw;">
      <h4 class="text-blue text-center mb-3">Thông tin lịch hẹn</h4>
      <div class="form-groups mb-3">
        <h6>Tên khách hàng:</h6>
        <input :value="customer.name" disabled type="text" class="form-control">
      </div>
      <div class="form-groups mb-3">
        <h6>Ngày hẹn:</h6>
        <input :value="formatDate(appointment.date)" disabled type="text" class="form-control">
      </div>
      <div class="form-groups mb-3">
        <h6>Giờ hẹn:</h6>
        <input :value="selectedTime" disabled type="text" class="form-control">
      </div>
      <div class="form-groups mb-4">
        <h6>Nội dung:</h6>
        <textarea v-model="appointment.content" class="form-control" rows="3" @blur="validate()"
          v-bind:class="{ 'is-invalid': errors.content }"></textarea>
        <div class="invalid-feedback" v-if="errors.content">{{ errors.content }}</div>

      </div>
      <div class="d-flex justify-content-end ">
        <button @click="booking()" class="btn btn-success">Xác nhận</button>
        &nbsp;
        <button @click="showModal = false" class="btn btn-danger">Hủy</button>
      </div>
    </div>
  </div>
</template>

<script>
import { startOfWeek, addDays } from 'date-fns';
import { formatDate } from '@/utils';
import axios from 'axios';
export default {
  data() {
    return {
      weekWithDates: [],
      timeSlots: [
        { id: 1, time: '8h-9h' },
        { id: 2, time: '9h-10h' },
        { id: 3, time: '10h-11h' },
        { id: 4, time: '13h-14h' },
        { id: 5, time: '14h-15h' },
        { id: 6, time: '15h-16h' },
        { id: 7, time: '16h-17h' },
      ],
      selectedDate: this.formatDateForInput(new Date()),
      minDate: this.formatDateForInput(new Date()),
      showModal: false,
      customer: [],
      selectedTime: null,
      appointment: {
        customer_id: '',
        date: null,
        time: null,
        content: '',
        status: 1,
      },
      errors: {
        content: '',

      },
      appointments: [],
      myAppointment: []

    };
  },
  created() {
    this.calculateWeekWithDates();
    this.getAppointments();
    var storeData = localStorage.getItem('store');
    this.customer = JSON.parse(storeData).user;
    if (this.customer) {

      this.getMyAppointments();
    }
  },
  methods: {
    formatDate,
    validate() {
      let isValid = true;
      this.errors = {
        content: ''
      }
      if (!this.appointment.content) {
        this.errors.content = "Nội dung hẹn không được bỏ trống!";
        isValid = false;
      }
      return isValid;

    },
    async getMyAppointments() {
      const response = await axios.get('myAppointments', {
        params: { customer_id: this.customer.id }
      });
      this.myAppointments = response.data;
    },

    isTimeDateConflict(timeId, date) {
      let count = 0;
      // Duyệt qua danh sách lịch hẹn
      for (const appointment of this.appointments) {
        if (appointment.time_id === timeId && appointment.date.date_field === date) {
          count++;
        }
      }
      if (count < 2) { // thay 3 bằng sl ccv
        return true; // chưa đủ lịch hẹn

      } else {
        return false; // đã đủ lịch hẹn

      }
    },
    async getAppointments() {
      await axios.get('appointments').then(res => {
        this.appointments = res.data;
      })
    },
    showBooking(Date, Time) {
      if (localStorage.getItem('tokenUser') == null) {
        this.$router.push('/login');
      } else {
        const isAvailable = !this.myAppointments.some(myAppointment => {
          return (
            myAppointment.date.date_field === Date &&
            myAppointment.time.id === Time.id
          );
        });
        if (isAvailable) {
          this.appointment.customer_id = this.customer.id
          this.appointment.date = Date;
          this.appointment.time = Time.id;
          this.selectedTime = Time.time;
          this.showModal = true;
        }
        else {
          this.$swal.fire({
            icon: 'error',
            html: 'Bạn đã có cuộc hẹn vào lúc: ' + Time.time +
              '<br>Ngày: ' + formatDate(Date),
          })
        }
      }


    },
    booking() {
      this.validate();
      if(this.validate()){
        axios.post('appointments', this.appointment).then(res => {
        if (res.data.success) {
          this.showModal = false;
          this.$swal.fire('Đặt lịch thành công!', '', 'success');
          this.getAppointments();
          this.getMyAppointments();

          this.appointment = {
            customer_id: '',
            date: null,
            time: null,
            content: '',
            status: 1,
          }
        }
      })
      }
    },
    formatDateForInput(date) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    formatDay(date) {
      const dayOfWeek = date.getDay();
      const weekDays = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
      return weekDays[dayOfWeek];
    },

    previousWeek() {
      const selectedDate = new Date(this.selectedDate);
      const newDate = addDays(selectedDate, -7);
      this.selectedDate = this.formatDateForInput(newDate);
      this.calculateWeekWithDates();
    },

    nextWeek() {
      const selectedDate = new Date(this.selectedDate);
      const newDate = addDays(selectedDate, 7);
      this.selectedDate = this.formatDateForInput(newDate);
      this.calculateWeekWithDates();
    },
    dateSelected() {
      this.calculateWeekWithDates();
    },
    calculateWeekWithDates() {
      const selectedDate = new Date(this.selectedDate);
      const startOfWeekDate = startOfWeek(selectedDate);
      const weekWithDates = [];
      for (let i = 0; i < 7; i++) {
        const currentDate = addDays(startOfWeekDate, i);
        weekWithDates.push({
          day: this.formatDay(currentDate),
          date: this.formatDateForInput(currentDate),
        });
      }
      this.weekWithDates = weekWithDates;
    },
  },


};
</script>

<style scoped></style>
