<template>
    <div>
        <div class="row mb-3">
            <div class="col-4">
                <div class="card py-3 ">
                    <div class="d-flex">
                        <div class="mx-3 mb-0 alert alert-primary">
                            <i class="fa-3x text-primary  fa-regular fa-calendar-days"></i>
                        </div>
                        <div>
                            <h3>0</h3>
                            <p>Lịch hẹn hôm nay</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="card py-3 ">
                    <div class="d-flex">
                        <div class="mx-3 mb-0 alert alert-success">
                            <i class=" fa-3x text-success fa-solid fa-file-invoice"></i>
                        </div>
                        <div>
                            <h3>{{ document_today }}</h3>
                            <p>Hồ sơ hôm nay</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="card py-3 ">
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
        <div>

        </div>

        <div class="row">
            <div class="d-flex justify-content-end">
                <button class="btn-blue mb-3" @click="exportToExcel">
                    <i class="fa-solid fa-file-excel"></i> Xuất Excel
                </button>
            </div>
            <div class="col-4">
                <div class="card cardChar p-3">
                    <div>
                        Từ ngày: <input v-model="minDate1" type="date" @change="updateChart">
                        đến <input v-model="maxDate1" type="date" @change="updateChart">
                    </div>
                    <div class="p-4">
                        <canvas id="chartPie"></canvas>
                    </div>
                </div>
            </div>
            <div class="col-8">
                <div class="card cardChar p-3">
                    <div class="p-4">
                        <canvas id="chartBar"></canvas>
                    </div>
                </div>



            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12">
                <div class="card">
                    <div class="p-4">
                        <canvas height="100px" id="chartLine"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import Chart from 'chart.js/auto';
import { addDays, format } from 'date-fns';
import ExcelJS from 'exceljs';

export default {
    data() {
        const currentDate = new Date();
        const minDate = addDays(currentDate, -30);
        return {
            document_today: null,
            minDate1: format(minDate, 'yyyy-MM-dd'),
            maxDate1: format(currentDate, 'yyyy-MM-dd'),
            dataCharPie: [],
            dataCharLine: [],
            dataCharBar: [],
            chartPie: null,
            chartLine: null,
            chartBar: null,
        };
    },
    mounted() {
        this.getCountDocumentToday();
        this.createChartLine();
        this.createChartPie();
        this.createChartBar(); // Thêm dòng này để tạo biểu đồ Bar khi component được mounted

    },
    methods: {
        // exportToExcel() {
        //     try {
        //         const workbook = new ExcelJS.Workbook();
        //         const worksheet = workbook.addWorksheet('Biểu đồ dữ liệu');
        //         worksheet.addRow(['Thống kê từ ngày', this.minDate1, 'đến', this.maxDate1]);
        //         worksheet.addRow([]);

        //         // Định nghĩa các dòng dữ liệu trong tệp Excel
        //         worksheet.addRow(['Doanh thu theo ngày']);
        //         worksheet.addRow(['Ngày', 'Doanh thu']);
        //         this.dataCharLine.forEach(item => {
        //             worksheet.addRow([item.date, item.total_revenue]);
        //         });
        //         worksheet.addRow([]);

        //         worksheet.addRow(['Doanh thu theo từng loại']);
        //         worksheet.addRow(['Loại', 'Doanh thu']);
        //         this.dataCharBar.forEach(item => {
        //             worksheet.addRow([item.category_name, item.total_revenue]);
        //         });
        //         worksheet.addRow([]);

        //         worksheet.addRow(['Số lượng hồ sơ theo loại']);
        //         worksheet.addRow(['Loại', 'Số lượng hồ sơ']);
        //         this.dataCharPie.forEach(item => {
        //             worksheet.addRow([item.category_name, item.document_count]);
        //         });

        //         // Tạo một Blob từ tệp Excel
        //         workbook.xlsx.writeBuffer().then(data => {
        //             const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        //             // Tạo một URL cho Blob
        //             const url = window.URL.createObjectURL(blob);

        //             // Tạo một liên kết để tải tệp Excel
        //             const a = document.createElement('a');
        //             a.href = url;
        //             a.download = 'du_lieu_bieu_do.xlsx';
        //             a.click();

        //             // Dọn dẹp
        //             window.URL.revokeObjectURL(url);
        //         });
        //     } catch (error) {
        //         console.error(error);
        //     }
        // },
        exportToExcel() {
            try {
                const workbook = new ExcelJS.Workbook();
                const worksheet = workbook.addWorksheet('Biểu đồ dữ liệu');
                worksheet.addRow(['Thống kê từ ngày', format(new Date(this.minDate1), 'dd/MM/yyyy'), 'đến', format(new Date(this.maxDate1), 'dd/MM/yyyy')]);
                worksheet.addRow([]);

                worksheet.addRow(['Doanh thu theo ngày']);
                worksheet.addRow(['Ngày', 'Doanh thu']);
                this.dataCharLine.forEach(item => {
                    worksheet.addRow([format(new Date(item.date), 'dd/MM/yyyy'), item.total_revenue]);
                });
                worksheet.addRow([]);

                worksheet.addRow(['Doanh thu theo loại']);
                worksheet.addRow(['Loại', 'Doanh thu']);
                this.dataCharBar.forEach(item => {
                    worksheet.addRow([item.category_name, item.total_revenue]);
                });
                worksheet.addRow([]);

                worksheet.addRow(['Số lượng hồ sơ theo loại']);
                worksheet.addRow(['Loại', 'Số lượng']);
                this.dataCharPie.forEach(item => {
                    worksheet.addRow([item.category_name, item.document_count]);
                });

                // Calculate column widths based on the maximum length of text in each column
                worksheet.columns.forEach((column, i) => {
                    let maxLength = 0;
                    worksheet.eachRow({ includeEmpty: true }, (row) => {
                        const cellValue = row.getCell(i + 1).value;
                        const cellText = cellValue !== null ? cellValue.toString() : '';
                        maxLength = Math.max(maxLength, cellText.length);
                    });
                    column.width = maxLength < 10 ? 10 : maxLength + 2; // Set a minimum width
                });

                worksheet.addRow([]);

                // Continue with the rest of your code

                // Create a Blob from the Excel file
                workbook.xlsx.writeBuffer().then(data => {
                    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

                    // Create a URL for the Blob
                    const url = window.URL.createObjectURL(blob);

                    // Create a link to download the Excel file
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'du_lieu_bieu_do.xlsx';
                    a.click();

                    // Clean up
                    window.URL.revokeObjectURL(url);
                });
            } catch (error) {
                console.error(error);
            }
        }
        ,

        getCountDocumentToday() {
            axios.get('documentCountToday').then(res => {
                this.document_today = res.data
            })
        },
        updateChart() {
            if (this.chartPie) {
                this.chartPie.destroy();
            }
            if (this.chartLine) {
                this.chartLine.destroy();
            }
            this.createChartLine();
            this.createChartPie();
            this.createChartBar(); // Thêm dòng này để tạo biểu đồ Bar khi ngày thay đổi
        },
        createChartBar() {
            axios.get(`revenueByCategory/${this.minDate1}/${this.maxDate1}`).then((res) => {
                this.dataCharBar = res.data;
                console.log(this.dataCharBar);

                // Lấy danh sách tên loại và doanh thu từ dữ liệu
                const labels = this.dataCharBar.map((item) => item.category_name);
                const revenue = this.dataCharBar.map((item) => item.total_revenue);

                const ctx = document.getElementById('chartBar');

                const backgroundColors = [
                    'rgb(54, 162, 235, 0.7)',
                    'rgb(255, 99, 132, 0.7)',
                    'rgb(75, 192, 192, 0.7)',
                    'rgb(255, 205, 86, 0.7)',
                    'rgb(153, 102, 255, 0.7)',
                    'rgb(255, 159, 64, 0.7)',
                    'rgb(128, 128, 128, 0.7)',
                    'rgb(255, 0, 0, 0.7)',
                    'rgb(0, 128, 0, 0.7)',
                    'rgb(0, 0, 255, 0.7)',
                ];

                const dataBar = {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Doanh thu theo loại',
                            data: revenue,
                            backgroundColor: backgroundColors,
                        },
                    ],
                };

                const config = {
                    type: 'bar',
                    data: dataBar,
                };
                if (this.chartBar) {
                    this.chartBar.destroy(); // Hủy biểu đồ Line cũ nếu nó tồn tại
                }
                // Tạo và hiển thị biểu đồ Bar Chart
                this.chartBar = new Chart(ctx, config);
            });
        },

        createChartLine() {
            axios.get(`revenueByDateRange/${this.minDate1}/${this.maxDate1}`).then((res) => {
                this.dataCharLine = res.data;

                const ctx = document.getElementById('chartLine');
                const labels = this.dataCharLine.map((item) => format(new Date(item.date), 'dd/MM/yyyy')); // Định dạng ngày
                const data = {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Doanh thu',
                            data: this.dataCharLine.map((item) => item.total_revenue),
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

                if (this.chartLine) {
                    this.chartLine.destroy(); // Hủy biểu đồ Line cũ nếu nó tồn tại
                }
                this.chartLine = new Chart(ctx, config); // Lưu trữ biểu đồ Line mới
            });
        },


        createChartPie() {
            axios.get(`documentCountsByCategory/${this.minDate1}/${this.maxDate1}`).then((res) => {
                this.dataCharPie = res.data;
                const ctx = document.getElementById('chartPie');

                const backgroundColors = [
                    'rgb(54, 162, 235)',
                    'rgb(255, 99, 132)',
                    'rgb(75, 192, 192)',
                    'rgb(255, 205, 86)',
                    'rgb(153, 102, 255)',
                    'rgb(255, 159, 64)',
                    'rgb(128, 128, 128)',
                    'rgb(255, 0, 0)',
                    'rgb(0, 128, 0)',
                    'rgb(0, 0, 255)',
                ];

                const data = {
                    labels: [],
                    datasets: [
                        {
                            label: ' Số hồ sơ',
                            data: [],
                            hoverOffset: 4,
                            backgroundColor: backgroundColors,

                        },
                    ],
                };
                this.dataCharPie.forEach((item) => {
                    data.labels.push(item.category_name);
                    data.datasets[0].data.push(item.document_count);
                });
                const config = {
                    type: 'pie',
                    data: data,
                };
                if (this.chartPie) {
                    this.chartPie.destroy(); // Hủy biểu đồ cũ nếu tồn tại
                }
                this.chartPie = new Chart(ctx, config); // Lưu trữ biểu đồ mới
            });
        },
    },
};
</script>

<style scoped>
.cardChar {
    height: 500px;
}
</style>
  