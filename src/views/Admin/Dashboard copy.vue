<template>
  <div>
    <div class="row mb-3">
      <div class="col-4">
        <div class="card py-3">
          <div class="d-flex">
            <div class="mx-3 mb-0 alert alert-primary">
              <i class="fa-3x text-primary fa-regular fa-calendar-days"></i>
            </div>
            <div>
              <h3>0</h3>
              <p>Lịch hẹn hôm nay</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card py-3">
          <div class="d-flex">
            <div class="mx-3 mb-0 alert alert-success">
              <i class="fa-3x text-success fa-solid fa-file-invoice"></i>
            </div>
            <div>
              <h3>0</h3>
              <p>Hồ sơ hôm nay</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card py-3">
          <div class="d-flex">
            <div class="mx-3 mb-0 alert alert-warning">
              <i class="fa-3x text-warning fa-solid fa-users"></i>
            </div>
            <div>
              <h3>0</h3>
              <p>Tổng số khách hàng</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-5">
        <div class="card p-2">
          <div>
            Từ ngày: <input @input="updateChartData" v-model="minDate1" type="date">
            đến <input @input="updateChartData" v-model="maxDate1" type="date">
          </div>
          <div class="p-5">
            <canvas id="chartPie"></canvas>
          </div>
        </div>
      </div>
      <div class="col-7">
        <div class="card p-3 mb-3">
          <canvas id="chartLine"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';
import Chart from 'chart.js/auto';
import { addDays, format } from 'date-fns';

export default {
  data() {
    const currentDate = new Date();
    const minDate = addDays(currentDate, -30);
    return {
      minDate1: format(minDate, 'yyyy-MM-dd'),
      maxDate1: format(currentDate, 'yyyy-MM-dd'),
      notarizedDocuments: [],
      categories: [],
    };
  },
  created() {
    this.getCategories().then(() => {
      this.createChartLine();
      this.createChartPie();
    });
  },
  methods: {
    updateChartData() {
      this.createChartPie();
    },
    async getCategories() {
      await axios.get('categories').then((res) => {
        this.categories = res.data;
      });
    },
    async getNotarizedDocuments() {
      return await axios.get('notarizedDocuments').then((res) => {
        this.notarizedDocuments = res.data;
      });
    },
    countDocumentsByCategory(categoryId, minDate, maxDate) {
      return this.notarizedDocuments.filter((document) => {
        return (
          document.category_id === categoryId &&
          document.date >= minDate &&
          document.date <= maxDate
        );
      }).length;
    },
    createChartLine() {
      const ctx = document.getElementById('chartLine');
      const labels = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
      ];
      const data = {
        labels: labels,
        datasets: [
          {
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      };

      const config = {
        type: 'line',
        data: data,
      };
      new Chart(ctx, config);
    },
    async createChartPie() {
      await this.getNotarizedDocuments();
      const ctx = document.getElementById('chartPie');
      const data = {
        labels: [],
        datasets: [
          {
            label: ' Số hồ sơ',
            data: [],
            hoverOffset: 4,
          },
        ],
      };

      this.categories.forEach((category) => {
        const count = this.countDocumentsByCategory(
          category.id,
          this.minDate1,
          this.maxDate1
        );
        data.labels.push(category.name);
        data.datasets[0].data.push(count);
      });

      const config = {
        type: 'pie',
        data: data,
      };

      new Chart(ctx, config);
    },
  },
};
</script>
  
<style scoped></style>
  