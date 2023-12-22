<template>
     <div class="container-lg pt-3 pb-5">
          <div class="row">
               <div class="col-md-8">
                    <div class="card h-100 pb-4">
                         <div class="text-blue text-center px-3 pt-3">
                              <h5>CÁC VĂN BẢN PHÁP LUẬT LIÊN QUAN</h5>
                         </div>
                         <div class="input-group my-3 px-5" style="width: 400px;">
                              <input v-model="searchKeyword" @input="searchDocuments" type="text" class="form-control"
                                   placeholder="Nhập từ khóa cần tìm ..." />
                              <div class="btn-search">
                                   <i class="fas fa-search"></i>
                              </div>
                         </div>

                         <div class="px-5" v-for="(category, index) in groupedLawTexts" :key="index">
                              <h6>{{ index + 1 }}. {{ category.name }}</h6>
                              <div class="px-3" v-for="(item, itemIndex) in category.documents" :key="itemIndex">
                                   <a class="" target="_blank" :href="'http://127.0.0.1:8000/storage/lawTexts/' + item.file">
                                        => {{ item.name }}
                                   </a>
                              </div>
                         </div>
                    </div>
               </div>

               <div class="col-md-4 side">
                    <div class="card px-2">
                         <div class="text-center text-blue py-3">
                              <h5>LIÊN KẾT TRANG</h5>
                         </div>
                         <a target="_blank" class="text-dark  mb-3 d-block" href="https://www.moj.gov.vn/Pages/home.aspx">
                              <img src="@/assets/home/img5.jpg" style="width: 100%;" alt="">
                         </a>
                         <a target="_blank" class="text-dark mb-3 d-block" href="http://cantho.gov.vn/wps/portal/sotp/">
                              <img src="@/assets/home/img6.jpg" style="width: 100%;" alt="">
                         </a>
                         <a target="_blank" class="text-dark mb-3 d-block" href="https://www.cantho.gov.vn/wps/portal/home">
                              <img src="@/assets/home/img7.jpg" style="width: 100%;" alt="">
                         </a>
                         <a target="_blank" class="text-dark mb-3 d-block" href="https://cna.org.vn/">
                              <img src="@/assets/home/img8.jpg" style="width: 100%;" alt="">
                         </a>
                         <a target="_blank" class="text-dark mb-3 d-block" href="http://cantho.gov.vn/wps/portal/sotnmt/">
                              <img src="@/assets/home/img9.jpg" style="width: 100%;" alt="">
                         </a>
                         <a target="_blank" class="text-dark mb-3 d-block" href="http://cantho.gov.vn/wps/portal/sokhdt/">
                              <img src="@/assets/home/img10.jpg" style="width: 100%;" alt="">
                         </a>

                    </div>
               </div>
          </div>
     </div>
</template>

<script>
import axios from 'axios';

export default {
     data() {
          return {
               lawTexts: [],
               searchKeyword: '',
               filteredDocuments: [], // Add this line
          };
     },
     created() {
          this.getLawTexts();
     },
     methods: {
          getLawTexts() {
               axios.get('lawTexts').then(res => {
                    this.lawTexts = res.data;
                    this.searchDocuments();
               });
          },
          searchDocuments() {
               this.filteredDocuments = this.lawTexts.filter((document) => {
                    return (
                         document.name.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
                         document.category.name.toLowerCase().includes(this.searchKeyword.toLowerCase())
                    );
               });
          },
     },
     computed: {
          groupedLawTexts() {
               const grouped = {};
               this.filteredDocuments.forEach((item) => {
                    if (!grouped[item.category.name]) {
                         grouped[item.category.name] = [];
                    }
                    grouped[item.category.name].push(item);
               });

               // Sort the categories based on category.id in ascending order
               const sortedCategories = Object.keys(grouped).sort((a, b) => {
                    const categoryA = grouped[a][0].category.id;
                    const categoryB = grouped[b][0].category.id;
                    return categoryA - categoryB;
               });

               // Create the result array with sorted categories
               return sortedCategories.map((key) => ({
                    name: key,
                    documents: grouped[key],
               }));
          },

     },
     watch: {
          searchKeyword: {
               handler: 'searchDocuments',
               immediate: true,
          },
     },
};
</script>

<style scoped>
.btn-search {
     display: flex;
     justify-content: center;
     align-items: center;
     padding: 0 14px;
     background-color: #3279c6;
     border-top-right-radius: 12px;
     border-bottom-right-radius: 12px;
     color: #fff;
}
</style>


