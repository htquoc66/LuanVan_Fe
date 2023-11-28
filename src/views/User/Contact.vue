<template>
     <div class="container-lg pt-3 pb-5">
          <div class="row">
               <div class="col-md-8">
                    <div class="card h-100 px-3">
                         <div>
                              <div class="text-center">
                                   <h4 class="text-blue mt-3">LIÊN HỆ</h4>
                              </div>
                              <iframe class="mt-3"
                                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.841454377102!2d105.76804037481062!3d10.029938972519306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0895a51d60719%3A0x9d76b0035f6d53d0!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBD4bqnbiBUaMah!5e0!3m2!1svi!2s!4v1698502806871!5m2!1svi!2s"
                                   width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"
                                   referrerpolicy="no-referrer-when-downgrade"></iframe>
                              <h5 class="mt-3">VĂN PHÒNG CÔNG CHỨNG CẦN THƠ</h5>
                              <ul class="">
                                   <li class="">Địa chỉ: 01 Đường 3/2, Xuân Khánh, Ninh Kiều, Cần Thơ</li>
                                   <li class="">Điện thoại: 0909 888 999</li>
                                   <li class="">Fax: 02923 888 999</li>
                                   <li class="">Email: congchungcantho@gmail.com</li>

                              </ul>
                         </div>

                    </div>
               </div>

               <div class="col-md-4 side">
                    <div class="card px-2 h-100">
                         <div>
                              <!-- <div class="text-center">
                                   <h4 class="text-blue mt-3">ĐÁNH GIÁ</h4>
                              </div> -->
                              <div class="my-3 d-flex">
                                   <div>{{ avgRating.toFixed(1) }}</div>
                                   <div class="px-2">
                                        <i v-for="star in Math.floor(avgRating)" class="fas fa-star fa-xl text-warning"></i>
                                        <i v-if="avgRating % 1 > 0" class="fas fa-star-half-alt fa-xl text-warning"></i>
                                        <i v-for="star in 5 - Math.ceil(avgRating)" class="fas fa-star fa-xl"></i>
                                   </div>
                                   <div>
                                        {{ reviews.length }} đánh giá

                                   </div>
                              </div>

                              <div v-for="i in 5" :key="i">
                                   <div class="d-flex mt-1">
                                        <div class="d-flex align-items-center" style="width: 15%;">
                                             <h6 class="my-auto">{{ 6 - i }}</h6><i class="fas fa-star fa-xs px-1"></i>
                                        </div>
                                        <div class="col-full">
                                             <div class="bg-warning h-100" :style="{ width: ratingPercentage(6 - i) + '%' }">
                                             </div>
                                        </div>
                                        <div class="" style="width: 15%;">{{ ratingPercentage(6 - i) }}%</div>
                                   </div>
                              </div>




                              <div class="mt-3">
                                   <div class="rating">
                                        <i v-for="star in 5" :key="star" class="fas fa-star fa-lg"
                                             :class="{ 'rated': star <= review.rating, 'hovered': star <= hoverRating }"
                                             @click="review.rating = star; errors.rating = ''"
                                             @mouseover="hoverRating = star" @mouseleave="hoverRating = 0"></i>
                                        <span v-if="errors.rating" class="text-danger px-2">{{ errors.rating }}</span>
                                   </div>
                                   <div class="my-1">
                                        <textarea class="w-100 p-1" v-model="review.content"
                                             placeholder="Nhận xét của bạn..."></textarea>
                                        <div class="d-flex justify-content-end mt-1">
                                             <button class="btn-blue" @click="submitReview">Gửi đánh giá</button>
                                        </div>
                                   </div>
                              </div>

                              <div class="mt-3">
                                   <hr>
                                   <div style="min-height: 360px;">
                                        <div v-for="(review, index) in displayedReviews" class="review">
                                             <div class="review-name d-flex justify-content-between h6 m-0">
                                                  <div>{{ review.customer.name }}</div>
                                                  <div class="dropdown">
                                                       <a href="" class="px-2" data-bs-toggle="dropdown">
                                                            <i class="fa-solid fa-ellipsis-vertical"></i>
                                                       </a>
                                                       <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                            <li><a class="dropdown-item" href="#">Xóa</a></li>
                                                       </ul>
                                                  </div>
                                             </div>
                                             <div class="review-star">
                                                  <i v-for="star in review.rating" :key="star"
                                                       class="fas fa-star fa-sm text-warning"></i>
                                                  <i v-for="star in (5 - review.rating)" :key="star"
                                                       class="fas fa-star fa-sm"></i>

                                             </div>
                                             <div class="review-content">
                                                  {{ review.content }}
                                             </div>
                                             <div class="review-time">
                                                  {{ review.created_at }}
                                             </div>
                                             <hr>
                                        </div>

                                   </div>

                                   <ul class="mt-3 pagination justify-content-end">
                                        <li class="page-item" :class="{ disabled: currentPage <= 1 }">
                                             <a class="page-link" href="#" @click.prevent="goToFirstPage">
                                                  <i class="fa fa-angle-double-left" aria-hidden="true"></i>
                                             </a>
                                        </li>
                                        <li class="page-item" :class="{ disabled: currentPage <= 1 }">
                                             <a class="page-link" href="#" @click.prevent="goToPreviousPage">
                                                  <i class="fa fa-angle-left" aria-hidden="true"></i>
                                             </a>
                                        </li>
                                        <li class="page-item" v-for="pageNumber in totalPages" :key="pageNumber"
                                             :class="{ active: currentPage === pageNumber }">
                                             <a class="page-link" href="#" @click.prevent="goToPage(pageNumber)">{{
                                                  pageNumber }}</a>
                                        </li>
                                        <li class="page-item" :class="{ disabled: currentPage >= totalPages }">
                                             <a class="page-link" href="#" @click.prevent="goToNextPage">
                                                  <i class="fa fa-angle-right" aria-hidden="true"></i>
                                             </a>
                                        </li>
                                        <li class="page-item" :class="{ disabled: currentPage >= totalPages }">
                                             <a class="page-link" href="#" @click.prevent="goToLastPage">
                                                  <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                                             </a>
                                        </li>
                                   </ul>
                              </div>
                         </div>

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
               review: {
                    customer_id: '',
                    content: '',
                    rating: '',
               },
               errors: {
                    content: '',
                    rating: '',
               },
               hoverRating: 0,
               reviews: [],
               currentPage: 1,
               customer: [],
               pageSize: 3,
          }
     },

     created() {
          this.getAllReviews();
          var storeData = localStorage.getItem('store');
          this.customer = JSON.parse(storeData).user;
     },
     methods: {
          getAllReviews() {
               axios.get('reviews').then(res => {
                    this.reviews = res.data;
               })
          },
          setRating(rating) {
               this.customer.rating = rating;
               this.errors.rating = '';
          },
          submitReview() {
               if (!this.customer) {
                    alert('Đăng nhập');
               } else {
                    // Kiểm tra xem người dùng đã đánh giá chưa
                    const hasUserReviewed = this.reviews.some(review => review.customer_id === this.customer.id);
                    const check = axios.get(`check-customer/${this.customer.id}`);

                    if (hasUserReviewed) {
                         this.$swal.fire({
                              icon: 'error',
                              text: 'Bạn đã đánh giá trước đó không thể đánh giá lại!',
                         })
                    }
                    else if (this.review.rating == '') {
                         this.errors.rating = "Vui lòng chọn số sao!";
                    }
                    else if (!check.success) {
                         this.$swal.fire({
                              icon: 'error',
                              text: 'Bạn chưa sử dụng dịch vụ của chúng tôi. Vui lòng đánh giá sau!',
                         })
                    }
                    else {
                         this.review.customer_id = this.customer.id;
                         axios.post('reviews', this.review).then(res => {
                              console.log(res.data);
                              if (res.data.success) {
                                   this.getAllReviews();
                              }
                         });
                    }
               }
          },

          ratingPercentage(star) {
               if (this.reviews.length === 0) {
                    return 0;
               }
               const starCount = this.reviews.filter((review) => review.rating === star).length;
               return Math.round((starCount / this.reviews.length) * 100);
          },

          goToFirstPage() {
               this.currentPage = 1;
          },
          goToLastPage() {
               this.currentPage = this.totalPages;
          },
          goToPreviousPage() {
               if (this.currentPage > 1) {
                    this.currentPage -= 1;
               }
          },
          goToNextPage() {
               if (this.currentPage < this.totalPages) {
                    this.currentPage += 1;
               }
          },
          goToPage(pageNumber) {
               if (pageNumber >= 1 && pageNumber <= this.totalPages) {
                    this.currentPage = pageNumber;
               }
          },
     },
     computed: {
          avgRating() {
               if (this.reviews.length === 0) {
                    return 0;
               }
               const totalRating = this.reviews.reduce((total, review) => total + review.rating, 0);
               return totalRating / this.reviews.length;
          },

          displayedReviews() {
               const startIndex = (this.currentPage - 1) * this.pageSize;
               const endIndex = startIndex + this.pageSize;
               return this.reviews.slice(startIndex, endIndex);
          },
          totalPages() {
               return Math.ceil(this.reviews.length / this.pageSize);
          },
     },
};
</script>
   
<style scoped>
.rating {
     cursor: pointer;
}

.rating i.rated {
     color: rgb(255, 193, 7);
}

.rating i.hovered,
.rating i.hovered.rated {
     color: rgb(255, 193, 7);
}

.col-full {
     width: 70% !important;
     height: 8px;
     margin: auto 0;
     margin-right: 6px;
     border: 1px solid #cacaca;
     border-radius: 4px;
}

.review-time {
     padding-top: 4px;
     color: #555;
     font-size: 14px;
}
</style>
   