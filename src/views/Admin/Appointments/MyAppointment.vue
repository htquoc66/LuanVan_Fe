<template>
    <div class="container">
        <h3 class="text-center text-blue py-4">Quản lý lịch hẹn</h3>
        <div class="calendar">
            <div class="mb-3">
                <div>
                    <button class="btn-blue" @click="previousWeek">&lt;</button>
                    <input type="date" v-model="selectedDate" @change="dateSelected" class="mx-3 px-3">
                    <button class="btn-blue" @click="nextWeek">&gt;</button>
                </div>
            </div>
            <table class="table table-bordered table-striped ">
                <thead>
                    <tr class="text-center">
                        <th></th>
                        <th v-for="(item, index) in weekWithDates.slice(1)" :key="index">
                            <div>{{ item.day }}</div>
                            <div>{{ formatDate(item.date) }}</div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="timeSlot in timeSlots" :key="timeSlot">
                        <td class="text-center">
                            <h6>{{ timeSlot.time }}</h6>
                        </td>
                        <td v-for="(day, index) in weekWithDates.slice(1)" :key="index">
                            <div v-for="appointment in appointments" :key="appointment.id">
                                <div v-if="appointment.date.date_field === day.date && appointment.time_id === timeSlot.id">
                                    <div>Tên khách hàng: {{ appointment.customer.name }}</div>
                                    <div>Số điện thoại: {{ appointment.customer.phone }}</div>
                                    <div>Nội dung: {{ appointment.content }}</div>
                                </div>
                            </div>
                        </td>


                    </tr>
                </tbody>
            </table>
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
            appointments: [],
            admin: [],
        }
    },
    created() {
        this.calculateWeekWithDates();
        // Lấy giá trị admin từ localStorage
        var storeData = localStorage.getItem('store');
        this.admin = JSON.parse(storeData).admin;

        this.getAppointments();

    },
    methods: {
        formatDate,
        async getAppointments() {
            const response = await axios.get('myAppointments', {
                params: { user_id: this.admin.id }
            });
            this.appointments = response.data;
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
  