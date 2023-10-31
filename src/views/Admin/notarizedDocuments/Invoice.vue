<template>
  <div>
    <h4 class="text-center text-blue py-3">Tạo phiếu thu</h4>
    <div class="border mb-5 mt-3 p-3">
      <div class="row">
        <div class="col-8 wrap">
          <div v-for="(notarizedDocument, index) in selectedNotarizedDocuments" :key="index">
            <h6 class="text-danger">Hồ sơ {{ notarizedDocument.id }}</h6>
            <div>Loại hồ sơ: {{ notarizedDocument.category.name }}</div>
            <div>Tên hồ sơ: {{ notarizedDocument.name }}</div>
            <div>Tổng chi phí: {{ notarizedDocument.total_cost }}</div>
            <div class="row mt-4">
              <div class="col-6">
                <h6>Bên A</h6>
                <div @click="addSelectedCustomer(customerA)" class="customer"
                  v-for="(customerA, index) in notarizedDocument.customersA">
                  <div>{{ customerA.name }}</div>
                  <div>Số cccd: {{ customerA.idCard_number }}</div>
                  <div>Địa chỉ: {{ customerA.address }}</div>
                </div>
              </div>
              <div class="col-6">
                <h6>Bên B</h6>
                <div @click="addSelectedCustomer(customerB)" class="customer"
                  v-for="(customerB, index) in notarizedDocument.customersB">
                  <div>{{ customerB.name }}</div>
                  <div>Số cccd: {{ customerB.idCard_number }}</div>
                  <div>Địa chỉ: {{ customerB.address }}</div>
                </div>
              </div>
            </div>
            <hr>
          </div>

        </div>
        <div class="col-4">
          <div class="form-group mb-3">
            <h6>Tổng chi phí:</h6>
            <input :value="formatPrice(invoices.cost) + ' đ'" disabled type="text" class="form-control">
          </div>
          <div class="form-group mb-3">
            <h6>Phương thức thanh toán:</h6>
            <select v-model="invoices.payment_method" class="form-select">
              <option value="Tiền mặt">Tiền mặt</option>
              <option value="Chuyển khoản">Chuyển khoản</option>
            </select>
          </div>
          <div class="form-group mb-4">
            <h6>Ngày:</h6>
            <input :value="formatDate(invoices.date)" disabled type="text" class="form-control">
          </div>
          <div class="text-center">
            <!-- <button class="btn-blue" @click="printfPDF()">
              <i class="fa-solid fa-print"></i>&nbsp;In phiếu thu
            </button>
            &nbsp; -->
            <button class="btn-blue" @click="generatePDF()">
              <i class="fa-solid fa-check"></i>&nbsp;Xác nhận tạo phiếu thu
            </button>
          </div>
        </div>
      </div>
    </div>


    <div id="id1" class="border p-5">
      <div class="d-flex justify-content-between">
        <div class="d-flex">
          <div class="">
            <img class="logo" src="@/assets/logo.png" width="100" alt="">
          </div>
          <div class="mt-3">
            Văn phòng Công Chứng Cần Thơ
            <br>
            01 Đường 3/2, Xuân Khánh, Ninh Kiều, Cần Thơ
            <br>
            Hotline: 0909 888 999 - Email: congchungcantho@gmail.com
          </div>
        </div>
        <div class="text-center">
          <div><b>Mẫu số 01 - TT</b></div>
          <div>
            <i>(Ban hành theo thông tư 200/2014/TT-BTC <br>
              Ngày 22/12/2014 của Bộ Tài chính)</i>
          </div>
        </div>
      </div>

      <div class="text-center mt-3">
        <h4>Phiếu thu</h4>
        <i>Ngày: {{ formatDate(invoices.date) }}</i>
      </div>

      <div class="mt-4">
        <div>Họ tên người nộp tiền: {{ selectedCustomer.name }}</div>
        <div>Địa chỉ: {{ selectedCustomer.address }}</div>
        <div>Lý do nộp: {{ invoices.content }}</div>
        <div>Số tiền: {{ formatPrice(invoices.cost) }} đ</div>
        <div>Viết bằng chữ: {{ convertNumberToWords(invoices.cost) }} </div>
      </div>

      <div class="mt-5  d-flex justify-content-between">
        <div class="text-center">
          <div class="pb-5">
            <b>Giám đốc</b>
            <br>
            <i>(Ký, họ tên, đóng dấu)</i>
          </div>
          <div class="mt-5 pt-5">
            <b>Giám Văn Đốc</b>
          </div>
        </div>

        <div class="text-center">
          <div class="pb-5">
            <b>Kế toán trưởng</b>
            <br>
            <i>(Ký, họ tên)</i>
          </div>
          <div class="mt-5 pt-5">
            <b>Nguyễn Thị A</b>
          </div>
        </div>
        <div class="text-center">
          <div class="pb-5">
            <b>Người nộp tiền</b>
            <br>
            <i>(Ký, họ tên)</i>
          </div>
          <div class="mt-5 pt-5">
            <b>{{ selectedCustomer.name }}</b>
          </div>
        </div>
        <div class="text-center">
          <div class="pb-5">
            <b>Người lâp phiếu</b>
            <br>
            <i>(Ký, họ tên)</i>
          </div>
          <div class="mt-5 pt-5">
            <b>{{ admin.name }}</b>
          </div>
        </div>
        <div class="text-center">
          <div class="pb-5">
            <b>Thủ quỹ</b>
            <br>
            <i>(Ký, họ tên)</i>
          </div>
          <div class="mt-5 pt-5">
            <b>Tên thủ quỹ</b>
          </div>
        </div>
      </div>
    </div>
    <hr class="page-break">
    <div id="id2" class="border mt-5 p-5">
      <div class="d-flex justify-content-between">
        <div class="d-flex">
          <div class="">
            <img class="logo" src="@/assets/logo.png" width="100" alt="">
          </div>
          <div class="mt-3">
            Văn phòng Công Chứng Cần Thơ
            <br>
            01 Đường 3/2, Xuân Khánh, Ninh Kiều, Cần Thơ
            <br>
            Hotline: 0909 888 999 - Email: congchungcantho@gmail.com
          </div>
        </div>
        <div class="text-center mt-3">
          <i>Ngày: {{ formatDate(invoices.date) }}</i>
        </div>
      </div>

      <div class="text-center mt-3">
        <h4>Phí và thù lao công chứng</h4>
      </div>
      <div class="mt-3">
        Khách hàng: {{ selectedCustomer.name }}
        <br>
        Địa chỉ: {{ selectedCustomer.address }}
        <br>
        Nội dung: {{ invoices.content }}
      </div>

      <div class="mt-3">
        <table id="table1" class="table table-bordered table-striped">
          <thead>
            <tr>
              <th class="text-center">Nội dung phí và thù lao</th>
              <th class="text-center">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Phí hồ sơ</td>
              <td class="text-right">{{ formatPrice(calculateTotalPrice()) }}</td>

            </tr>
            <tr>
              <td>Phí ký ngoài</td>
              <td class="text-right">{{ formatPrice(calculateTotalCostType('cost_1')) }}</td>
            </tr>
            <tr>
              <td>Phí niêm yết</td>
              <td class="text-right">{{ formatPrice(calculateTotalCostType('cost_2')) }}</td>

            </tr>
            <tr v-for="(cost, index) in costs_3" :key="index">
              <td>{{ cost.name }}</td>
              <td class="text-right">{{ formatPrice(cost.totalPrice) }}</td>
            </tr>
            <tr>
              <td colspan="2" class="text-right">
                Tổng tiền phí: <b>{{ formatPrice(invoices.cost) }}</b>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>


  </div>
</template>
  
<script>
import { mapGetters } from 'vuex'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
import { formatPrice, formatDate, convertNumberToWords } from '@/utils';
export default {
  data() {
    return {
      admin: [],
      selectedCustomer: '',
      invoices: {
        customer_id: '',
        user_id: '', // nhân viên
        content: '',
        date: '',
        cost: '',
        payment_method: 'Tiền mặt',
        file_pdf: '',
        notarizedDocument_id: [],
      },
      fileName: ''

    };
  },
  created() {
    // tạo nội dung phiếu thu
    this.createContent();

    // Lấy giá trị admin từ localStorage
    var storeData = localStorage.getItem('store');
    this.admin = JSON.parse(storeData).admin;
    this.invoices.user_id = this.admin.id;
    this.calculateTotalCost(); // tính tổng tiền các hồ sơ trong phiếu thu

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    this.invoices.date = formattedDate;

  },
  methods: {
    formatPrice, formatDate,
    convertNumberToWords,
    generatePDF() {
      if (this.selectedCustomer === '') {
        alert('Chọn khách hàng');
      } else {
        // Tạo một đối tượng jsPDF với cấu hình đã chỉ định
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
          format: 'a4',
          putOnlyUsedFonts: true,
          floatPrecision: 16,
          precision: 16,
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const element1 = document.getElementById('id1');
        const element2 = document.getElementById('id2');
        element1.style.fontSize = '16px';
        element2.style.fontSize = '16px';

        const html2canvasConfig = {
          scale: 2,
        };

        // Sử dụng Promise.all để đảm bảo cả hai trang đã hoàn tất trước khi tiếp tục
        Promise.all([
          html2canvas(element1, html2canvasConfig),
          html2canvas(element2, html2canvasConfig),
        ]).then(([canvas1, canvas2]) => {
          const imgData1 = canvas1.toDataURL('image/jpeg', 0.9);
          const imgData2 = canvas2.toDataURL('image/jpeg', 0.9);

          pdf.addImage(imgData1, 'JPEG', 0, 0, pageWidth, pageHeight);
          pdf.addPage();
          pdf.addImage(imgData2, 'JPEG', 0, 0, pageWidth, pageHeight);

          // Sau khi tạo xong tệp PDF, gửi nó đến backend
          const pdfData = pdf.output('blob');
          const formData = new FormData();
          formData.append('file_pdf', pdfData, this.fileName);
          formData.append('customer_id', this.invoices.customer_id);
          formData.append('user_id', this.invoices.user_id);
          formData.append('date', this.invoices.date);
          formData.append('cost', this.invoices.cost);
          formData.append('content', this.invoices.content);
          formData.append('payment_method', this.invoices.payment_method);
          formData.append('notarizedDocument_id', JSON.stringify(this.invoices.notarizedDocument_id));

          console.log(formData.file_pdf)
          axios.post('/invoices', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
            .then(response => {
              console.log(response.data);
              if (response.data.success) {
                this.$router.push('/admin/notarizedDocuments/listInvoices')

              }
            })
            .catch(error => {
              console.error(error);
            });
        });
      }
    },
    // tạo nội dung phiếu thu và tên file pdf
    createContent() {
      this.fileName = "PhieuThu-HoSo";
      this.selectedNotarizedDocuments.reverse();
      this.selectedNotarizedDocuments.forEach(document => {
        this.fileName += '-' + document.id;
        // gán id hồ sơ vào mảng
        this.invoices.notarizedDocument_id.push(document.id);
        // nội dung phiếu thu
        this.invoices.content += document.name + '; ';
      });
      this.fileName = this.fileName + '.pdf'
    },

    // Tổng phí công chứng
    calculateTotalPrice() {
      let total = 0;
      for (let i = 0; i < this.selectedNotarizedDocuments.length; i++) {
        const document = this.selectedNotarizedDocuments[i];
        if (document && document.category && document.category.price) {
          total += parseFloat(document.category.price);
        }
      }
      return total;
    },
    // Tổng phí theo từng loại
    calculateTotalCostType(costType) {
      let totalCost = 0;
      this.selectedNotarizedDocuments.forEach(document => {
        document[costType].forEach(cost => {
          totalCost += cost.price;
        });
      });
      return totalCost;
    },
    // Tổng phí các hồ sơ
    calculateTotalCost() {
      let totalCost = 0;
      this.selectedNotarizedDocuments.forEach((document) => {
        totalCost += document.total_cost;
      });
      this.invoices.cost = totalCost;
    },

    addSelectedCustomer(customer) {
      // Thêm khách hàng đã chọn vào mảng selectedCustomer
      this.selectedCustomer = customer
      this.invoices.customer_id = this.selectedCustomer.id;
    },


  },
  computed: {
    ...mapGetters(['selectedNotarizedDocuments']),
    costs_3() {
      const costMap = new Map();
      this.selectedNotarizedDocuments.forEach(document => {
        document.cost_3.forEach(cost => {
          if (costMap.has(cost.name)) {
            const existingCost = costMap.get(cost.name);
            existingCost.totalPrice += cost.price;
          } else {
            costMap.set(cost.name, { name: cost.name, totalPrice: cost.price });
          }
        });
      });

      return Array.from(costMap.values());
    },
  }
};
</script>

<style>
.wrap {
  height: 300px;
  overflow-y: auto;
}

.logo {
  margin-left: -18px;
}

.customer {
  background-color: rgb(243, 243, 243);
  padding: 6px 12px;
  margin-top: 6px;
}

.customer:hover {
  cursor: pointer;
  opacity: 0.8;
  background-color: rgb(248, 248, 248);

}

.page-break {
  page-break-before: always;
  margin: 0;
  color: #fff;
}

</style>
  