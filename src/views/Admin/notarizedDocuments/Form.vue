<template>
    <div class="mb-3">
        <div class="d-flex justify-content-between align-items-center py-2">
            <div class="fs-5 text-blue">
                <i class="fa-solid fa-file-lines px-2"></i>Thông tin hồ sơ
            </div>
            <div class="d-flex">
                <div>
                    <div>Kế toán viên:</div>
                    <div v-if="notarized_document.accountant.name" class="text-blue">
                        {{ notarized_document.accountant.name }}
                    </div>
                    <div v-else class="text-center text-blue">
                        ---
                    </div>
                </div>
                <div class="px-5">
                    <div>Công chứng viên:</div>
                    <div v-if="notarized_document.notary.name" class="text-blue">
                        {{ notarized_document.notary.name }}
                    </div>
                    <div v-else class="text-center text-blue">
                        ---
                    </div>
                </div>
                <!-- <div>
                    <div>Thư ký nghiệp vụ:</div>
                    <div v-if="notarized_document.secretary.name" class="text-blue">
                        {{ notarized_document.secretary.name }}
                    </div>
                    <div v-else class="text-center text-blue">
                        ---
                    </div>
                </div> -->

            </div>
        </div>
        <hr class="m-0">
        <div v-if="hasPermission(2)" class="row mt-3">
            <div class="col-4">
                <div class="row mb-3">
                    <div class="form-group col-6">
                        <h6 class="text-blue">Số hồ sơ</h6>
                        <input v-model="notarized_document.id" type="text" disabled class="form-control">
                    </div>
                    <div class="form-group col-6">
                        <h6 class="text-blue">Ngày tạo</h6>
                        <input v-model="notarized_document.date" type="text" disabled class="form-control">
                    </div>
                </div>
                <div class="mb-3">
                    <h6 class="text-blue">Bên A:</h6>
                    <div class="selected" v-if="notarized_document.customersA.length != 0"
                        v-for="customerA in notarized_document.customersA">
                        <div>
                            <div>{{ customerA.name }} - Số cccd: {{ customerA.idCard_number }}</div>
                            <small>Địa chỉ: {{ customerA.address }}</small>
                        </div>
                    </div>
                </div>
                <div>
                    <h6 class="text-blue">Bên B:</h6>
                    <div class="selected" v-if="notarized_document.customersB.length != 0"
                        v-for="customerB in notarized_document.customersB">
                        <div>
                            <div>{{ customerB.name }} - Số cccd: {{ customerB.idCard_number }}</div>
                            <small>Địa chỉ: {{ customerB.address }}</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="form-group mb-3">
                    <h6 class="text-blue">Loại hồ sơ</h6>
                    <input v-model="notarized_document.category.name" type="text" disabled class="form-control">
                </div>
                <div class="form-group mb-3">
                    <h6 class="text-blue">Tên hồ sơ</h6>
                    <input v-model="notarized_document.name" type="text" disabled class="form-control">
                </div>

                <div class="dropdown form-group mb-3">
                    <h6 class="text-blue">Phí ký ngoài</h6>
                    <div class="costs-wrap" data-bs-toggle="dropdown">
                        <div class="selected-costs">
                            <div v-for="(cost, index) in selectedCost1" :key="index" class="item">
                                {{ cost.name }}
                                <i @click="removeFromSelectedCost(cost, selectedCost1)"
                                    class="fa-solid fa-circle-xmark delete"></i>
                            </div>

                        </div>
                        <div class="icon">
                            <i class="fa-solid fa-chevron-down"></i>
                        </div>
                    </div>
                    <div class="cost-list dropdown-menu">
                        <div v-for="(cost, index) in getCostsByCostTypeId(1)" :key="index"
                            @click="addToSelectedCost(cost, selectedCost1)" class="cost-list-item">
                            <div>{{ cost.name }}</div>
                            <div>+ {{ formatPrice(cost.price) }} đ</div>
                        </div>
                    </div>
                </div>

                <div class="dropdown form-group mb-3">
                    <h6 class="text-blue">Phí niêm yết</h6>
                    <div class="costs-wrap" data-bs-toggle="dropdown">
                        <div class="selected-costs">
                            <div v-for="(cost, index) in selectedCost2" :key="index" class="item">
                                {{ cost.name }}
                                <i @click="removeFromSelectedCost(cost, selectedCost2)"
                                    class="fa-solid fa-circle-xmark delete"></i>
                            </div>
                        </div>
                        <div class="icon">
                            <i class="fa-solid fa-chevron-down"></i>
                        </div>
                    </div>
                    <div class="cost-list dropdown-menu">
                        <div v-for="(cost, index) in getCostsByCostTypeId(2)" :key="index"
                            @click="addToSelectedCost(cost, selectedCost2)" class="cost-list-item">
                            <div>{{ cost.name }}</div>
                            <div>+ {{ formatPrice(cost.price) }} đ</div>
                        </div>
                    </div>
                </div>

                <div>
                    <h6 class="text-blue">#Các dịch vụ khác</h6>
                    <div class="list-costs">
                        <div v-for="(cost, index) in getCostsByCostTypeId(3)" :key="index"
                            class="border py-1 px-2 mb-2 d-flex justify-content-between">
                            <input class="form-check-input" type="checkbox" :value="cost.id" :id="cost.id"
                                @change="checkboxChange(cost, selectedCost3)">
                            <label class="form-check-label px-2 flex-grow-1" :for="cost.id">
                                {{ cost.name }} + {{ formatPrice(cost.price) }} đ
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="form-group mb-3">
                    <h6 class="text-blue">Phí hồ sơ</h6>
                    <input :value="formatPrice(notarized_document.category.price) + ' đ'" type="text" disabled
                        class="form-control">
                </div>
                <div class="form-group mb-3">
                    <h6 class="text-blue">Phí kí ngoài</h6>
                    <input :value="formatPrice(calculateTotalPrice(selectedCost1)) + ' đ'" type="text" disabled
                        class="form-control">
                </div>
                <div class="form-group mb-3">
                    <h6 class="text-blue">Phí niêm yết</h6>
                    <input :value="formatPrice(calculateTotalPrice(selectedCost2)) + ' đ'" type="text" disabled
                        class="form-control">
                </div>
                <div class="form-group mb-3">
                    <h6 class="text-blue">Phí dịch vụ khác</h6>
                    <input :value="formatPrice(calculateTotalPrice(selectedCost3)) + ' đ'" type="text" disabled
                        class="form-control">
                </div>
                <div class="form-group mb-3">
                    <h6 class="text-blue">Tiền miễn giảm</h6>
                    <input type="text" class="form-control">
                </div>
                <div class="form-group mb-3">
                    <h6 class="text-blue">Tổng chi phí</h6>
                    <input :value="formatPrice(notarized_document.total_cost) + ' đ'" type="text" disabled
                        class="form-control">
                </div>

                <div class="text-center mt-4">
                    <button @click="save(4)" class="btn-blue w-50">Cập nhật hồ sơ</button>
                </div>
            </div>


        </div>
        <div v-else class="row mt-5">
            <div class="col-3">
                <div class="form-group mb-3">
                    <label for="" class="h6">Ngày tạo</label>
                    <input disabled v-model="notarized_document.date" :min="new Date().toISOString().split('T')[0]" type="date" class="form-control">
                </div>
                <div v-if="notarized_document.status > 1" class="form-group mb-3">
                    <label for="" class="h6">Loại hồ sơ</label>
                    <input disabled v-model="notarized_document.category.name" type="text" class="form-control">
                </div>
                <div v-else class="form-group mb-3">
                    <label for="" class="h6">Loại hồ sơ</label>
                    <select  @change="filterForms" v-model="notarized_document.category_id" class="form-select"
                    v-bind:class="{ 'is-invalid': errors.category }">
                        <option value="">--Chọn loại hồ sơ--</option>
                        <option v-for="(category, index) in categories" :value="category.id" :key="index">
                            {{ category.name }}
                        </option>
                    </select>
                    <div class="invalid-feedback" v-if="errors.category">{{ errors.category }}</div>

                </div>
                <div v-if="notarized_document.status > 1" class="form-group mb-3">
                    <label for="" class="h6">Tên hồ sơ</label>
                    <input disabled v-model="notarized_document.name" type="text" class="form-control">
                </div>
                <div v-else class="form-group mb-3">
                    <label for="" class="h6">Tên hồ sơ</label>
                    <input v-model="notarized_document.name" type="text" class="form-control" v-bind:class="{ 'is-invalid': errors.name }">
                    <div class="invalid-feedback" v-if="errors.name">{{ errors.name }}</div>
                
                </div>
         

                <div  class="form-group mb-3">
                    <label for="" class="h6">Căn cứ pháp luật:</label>
                    <select v-if="notarized_document.status < 2" @change="selectedLawText($event)" class="form-select"
                    v-bind:class="{ 'is-invalid': errors.selectedLawTexts }">
                        <option value="">--Chọn căn cứ pháp luật--</option>
                        <option v-for="(lawText, index) in lawTexts" :value="lawText.id">
                            {{ lawText.name }}
                        </option>
                    </select>
                    <div class="invalid-feedback" v-if="errors.selectedLawTexts">{{ errors.selectedLawTexts }}</div>

                </div>

                <div class="selected" v-for="(lawText, index) in notarized_document.selectedLawTexts" :key="index">
                    <div  v-if="notarized_document.status < 2" class="selected-delete" @click="deleteSelectedLawText(index)">
                        <i class="fa-solid fa-circle-xmark"></i>
                    </div>
                    <a target="_blank" :href="'http://127.0.0.1:8000/storage/lawTexts/' + lawText.file">{{ lawText.name }}</a>
                </div>
            </div>

            <div class="col-5">

                <div  class="mt-4">
                    <button v-if="notarized_document.status < 2" @click="showListCustomers('A')" class="btn btn-success mt-2">Thêm bên A</button>
                    
                    <h6 v-else class="text-success">Khách hàng bên A:</h6>
                    <div class="selected" v-if="notarized_document.customersA.length != 0"
                        v-for="customerA in notarized_document.customersA">
                        <div  v-if="notarized_document.status < 2" class="selected-delete" @click="deleteSelectedCustomer('A', index)">
                            <i class="fa-solid fa-circle-xmark"></i>
                        </div>
                        <div>
                            <div>{{ customerA.name }} - Số cccd: {{ customerA.idCard_number }}</div>
                            <small>Địa chỉ: {{ customerA.address }}</small>
                        </div>
                    </div>
                    <div class="invalid-feedback d-block" v-if="errors.customersA">{{ errors.customersA }}</div>

                </div>
                <div class="mt-3">
                    <button v-if="notarized_document.status < 2" @click="showListCustomers('B')" class="btn btn-danger mt-1">Thêm bên B</button>
                    <h6 v-else class="text-danger">Khách hàng bên B:</h6>                    
                    <div class="selected" v-if="notarized_document.customersB.length > 0"
                        v-for="customerB in notarized_document.customersB">
                        <div  v-if="notarized_document.status < 2" class="selected-delete" @click="deleteSelectedCustomer('B', index)">
                            <i class="fa-solid fa-circle-xmark"></i>
                        </div>
                        <div>
                            <div>{{ customerB.name }} - Số cccd: {{ customerB.idCard_number }}</div>

                            <small>Địa chỉ: {{ customerB.address }}</small>
                        </div>
                    </div>
                    <div class="invalid-feedback d-block" v-if="errors.customersB">{{ errors.customersB }}</div>

                </div>
            </div>

            <div class="col-4 mt-3">
                <div v-if="hasPermission(1) && notarized_document.status == 2 " class="form-group mb-3">
                    <label for="" class="h6">Kế toán:</label>
                    <select v-model="notarized_document.accountant" class="form-select">
                        <option v-for="accountant in accountants" :value="accountant">
                            {{ accountant.name }}
                        </option>
                    </select>
                </div>

                <div class="mt-3 p-4" v-if="notarized_document.file != ''">
                    <a target="_blank" :href="'https://docs.google.com/document/d/' + notarized_document.file" class="">
                        <i class="fa-solid fa-file-word fa-2x"></i>
                        Xem hồ sơ
                    </a>
                </div>

                <div v-if="(hasPermission(3) && notarized_document.status < 2)">
                    <div class="form-group mb-3">
                        <label for="" class="h6">Thêm hồ sơ</label>
                        <select class="form-select" v-model="editOnline">
                            <option :value=false>Tải hồ sơ trực tiếp</option>
                            <option :value=true>Chỉnh sửa hồ sơ online</option>
                        </select>
                    </div>


                    <div v-if="editOnline">
                        <div class="form-group mb-3">
                            <label for="" class="h6">Chọn biểu mẫu</label>
                            <select class="form-select" v-model="selectedForm">
                                <option value="">--Chọn biểu mẫu--</option>
                                <option v-for="(form, index) in filteredForms" :value="form">
                                    {{ form.name }}
                                </option>
                            </select>
                        </div>
                        <div class="mb-3" v-show="!linkFromChild">
                            <button v-if="selectedForm != null && (selectedForm.id == 1 || selectedForm.id == 2 || selectedForm.id == 3)"
                             @click="showAddContent()" class="btn btn-dark">+ Nội dung</button>
                            <button v-else  class="btn btn-success" @click="callFunctionInAddContent">Tạo hồ sơ</button>

                        </div>

                        <div class="">
                            <a target="_blank" v-show="linkFromChild" :href="'https://docs.google.com/document/d/' + linkFromChild" class="">
                                <i class="fa-solid fa-file-word fa-2x"></i>
                                Hồ sơ vừa tạo
                            </a>
                        </div>

                    </div>
                    <div v-else>
                        <div class="form-group mb-3">
                            <label for="" class="h6">Tải biểu mẫu</label>
                            <select class="form-select" @change="downloadFile($event.target.value)">
                                <option value="0">--Chọn tệp--</option>
                                <option v-for="(form, index) in filteredForms" :value="form.file">
                                    {{ form.name }}
                                </option>
                            </select>
                        </div>

                        <div class="form-group mb-3">
                            <label for="" class="h6">Upload hồ sơ (.docx):</label>
                            <input @change="onFileChange" type="file" class="form-control">
                        </div>

                    </div>
                </div>

            </div>

            <hr class="mt-5">
            <div v-if="(hasPermission(3) && notarizedDocumentId != null && notarized_document.status < 2) || notarizedDocumentId == null"
                class="d-flex justify-content-end">
                <!-- <button v-if="hasPermission(4)" @click="save(1)" class="btn-icon">Lưu hồ sơ</button> -->
                <button v-if="hasPermission(3)" @click="save(1)" class="btn-icon">Lưu hồ sơ</button>
                &nbsp;
                <button v-if="hasPermission(3)" @click="save(2)" class="btn-blue">Cập nhật hồ sơ & chuyển cho trưởng
                    phòng</button>

            </div>
            <div class="d-flex justify-content-end">
                <button v-if="hasPermission(1) && notarized_document.status == 2" @click="cancel(notarized_document)" class="btn-icon">Hủy hồ sơ</button>
                &nbsp;
                <button v-if="hasPermission(1) && notarized_document.status == 2" @click="save(3)" class="btn-blue">Duyệt hồ
                    sơ & chuyển cho kế toán</button>
            </div>
        </div>

    </div>

    <div class="modal-container" v-show="showList">
        <div class="modal-overlay" @click="showList = false"></div>
        <div class="modal-content" style="width: 65vw;">
            <span class="modal-close" @click="showList = false"><i class="fa-solid fa-circle-xmark"></i></span>
            <h4 class="text-center my-3 text-blue">Danh sách khách hàng</h4>

            <div class="d-flex justify-content-between mt-4">
                <div class="col-6">
                    <input v-model="searchKeyword" type="text" placeholder="Tìm kiếm" class="form-control">
                </div>
                <div class="">
                    <button @click="showModal = true" class="btn-blue px-4 mt-2 mb-3">
                        <i class="fa-solid fa-plus"></i> Thêm mới
                    </button>
                </div>
            </div>

            <FormCustomer :showModal="showModal" @closeModal="showModal = false" :getCustomers="getCustomers" />

            <div class="list-customers">
                <hr class="m-0">
                <div @click="selectedCustomer(customer)" class="customer pt-3"
                    v-for="(customer, index) in paginatedCustomers" :key="index" >
                    <!-- Hiển thị thông tin khách hàng ở đây -->
                    <p class="px-4"> {{ customer.name }} - <i>{{ customer.address }}</i></p>
                    <p class="px-4"> {{ customer.phone }} - {{ customer.email }}</p>
                    <hr class="m-0">
                </div>
            </div>

            <ul class="pagination justify-content-end">
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
                    <a class="page-link" href="#" @click.prevent="goToPage(pageNumber)">{{ pageNumber }}</a>
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
    <AddContent ref="addContentRef" :showModalAddContent="showModalAddContent" @close="showModalAddContent = false" :selectedForm="selectedForm"
        :notarizedDocument="notarized_document" @send-link="linkFromChild = $event" />
</template>

<script>
import axios from 'axios';
import FormCustomer from '../Customers/Form.vue'
import AddContent from './AddContent.vue';
import { formatPrice, hasPermission } from '@/utils';
export default {
    components: {
        FormCustomer,
        AddContent
    },
    data() {
        return {
            linkFromChild: null,
            selectedButton: null,
            showList: false,
            showModalAddContent: false,
            showModal: false, //formStaff
            accountants: [],
            categories: [],
            selectedForm: null,
            forms: [],
            filteredForms: [],
            customers: [],
            lawTexts: [],
            costs: [],
            searchKeyword: '',
            notarized_document: {
                category_id: '',
                name: '',
                file: '',
                status: '',
                date: '',
                total_cost: 1,
                manager: {
                    id: 1,
                    name: 'Trưởng phòng'
                },
                notary: {
                    id: '',
                    name: '',
                },
                accountant: {
                    id: '',
                    name: '',
                },
                selectedLawTexts: [],
                customersA: [],
                customersB: [],
                costs: [],
                category: []
            },
            notification: {
                receiverId: null,
                message: ''
            },
            currentPage: 1,
            itemsPerPage: 3,
            admin: [],
            notarizedDocumentId: null,
            selectedCost1: [],
            selectedCost2: [],
            selectedCost3: [],
            editOnline: false,
            errors: {
                name: '',
                file: '',    
                notary: '',
                accountant:'',
                selectedLawTexts: '',
                customersA: '',
                customersB: '',
                costs: '',
                category: ''
            },
            isValid: true,

        }
    },
    created() {
        // Lấy giá trị admin từ localStorage
        var storeData = localStorage.getItem('store');
        this.admin = JSON.parse(storeData).admin;


        this.notarizedDocumentId = this.$route.query.id;
        if (this.notarizedDocumentId) {
            this.getNotarizedDocument(this.notarizedDocumentId)

        } else {
            const currentDate = new Date();
            // Định dạng ngày tháng để gán vào trường ngày
            const formattedDate = currentDate.toISOString().split('T')[0];
            // Gán ngày tháng cho trường notarized_document.date
            this.notarized_document.date = formattedDate;
        }
        // vai trò ccv
        if (this.hasPermission(3)) {
            this.notarized_document.notary = this.admin
        }

        // vai trò trưởng phòng
        if (this.hasPermission(1)) {
            this.getStaffOfRole(2, this.accountants);

        }

        // vai trò kế toán
        if (this.hasPermission(2)) {
            this.getCosts();
        }

        this.getCategories();
        this.getForms();
        this.getLawTexts();
        this.getCustomers();
    },
    methods: {
        formatPrice, hasPermission,
        validate(){
            this.errors = {
                name: '',
                file: '',    
                notary: '',
                accountant:'',
                selectedLawTexts: '',
                customersA: '',
                customersB: '',
                costs: '',
                category: ''
            }
            if(this.notarized_document.category_id == ''){
                this.errors.category = "Vui lòng chọn loại hồ sơ!";
                this.isValid = false;
            }
            if(this.notarized_document.name == ''){
                this.errors.name = "Vui lòng nhập tên hồ sơ!";
                this.isValid = false;
            }
            if(this.notarized_document.selectedLawTexts.length == 0){
                this.errors.selectedLawTexts = "Vui lòng chọn văn bản pháp luật";
                this.isValid = false;
            }
            if(this.notarized_document.customersA.length == 0){
                this.errors.customersA = "Vui lòng chọn khách hàng bên A";
                this.isValid = false;
            }
            if(this.notarized_document.customersB.length == 0){
                this.errors.customersB = "Vui lòng chọn hách hàng bên B";
                this.isValid = false;
            }
        },
        callFunctionInAddContent() {
            this.$refs.addContentRef.taohoso();
        },
        showAddContent() {
            if (this.selectedForm == '') {
                alert("Chọn biểu mẫu")
            } else {
                this.showModalAddContent = true;
            }
        },
        filterForms() {            
            const selectedCategoryId = this.notarized_document.category_id;
            if (selectedCategoryId) {
                // Nếu đã chọn loại hồ sơ, lọc danh sách để hiển thị
                this.filteredForms = this.forms.filter(form => form.category_id === selectedCategoryId);
            }
        },
        addToSelectedCost(cost, selectedCost) {
            // Kiểm tra xem mục đã tồn tại trong mảng selectedCost hay chưa
            const existingCost = selectedCost.find(item => item.name === cost.name);
            // Nếu mục chưa tồn tại, thêm nó vào mảng và cộng giá trị của cost vào tổng tiền
            if (!existingCost) {
                selectedCost.push(cost);
                this.notarized_document.total_cost += cost.price;
            }
        },
        removeFromSelectedCost(cost, selectedCost) {
            // Sử dụng indexOf để tìm vị trí của mục trong mảng
            const index = selectedCost.indexOf(cost);
            // Nếu mục tồn tại trong mảng, loại bỏ nó
            if (index !== -1) {
                selectedCost.splice(index, 1);
                this.notarized_document.total_cost -= cost.price;
            }
        },
        checkboxChange(cost, selectedCost) {
            const isChecked = event.target.checked;
            if (isChecked) {
                this.addToSelectedCost(cost, selectedCost);
            } else {
                this.removeFromSelectedCost(cost, selectedCost);
            }
        },
        calculateTotalPrice(selectedCost) {
            // Sử dụng reduce để tính tổng giá tiền của các mục trong selectedCost
            const totalPrice = selectedCost.reduce((total, cost) => total + cost.price, 0);
            return totalPrice;

        },
        save(status) {
            this.validate();
           if(this.isValid){
            this.notarized_document.status = status;
            
            if (this.hasPermission(1)) {
                this.notification.receiverId = this.notarized_document.accountant.id;
            }
            if (this.hasPermission(3)) {
                this.notification.receiverId = this.notarized_document.manager.id;
                const category = this.categories.find(cat => cat.id === this.notarized_document.category_id);
                this.notarized_document.total_cost = category.price;
            }
       
            this.notification.message = "Hồ sơ mới chờ duyệt";
            if (this.linkFromChild != null) {
                    this.notarized_document.file = this.linkFromChild;
                }
            if (this.notarizedDocumentId == null) {
         
                axios.post('notarizedDocuments', this.notarized_document, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                }).then(res => {
                    console.log(res.data)
                    if (res.data.success) {
                        if (this.hasPermission(3) && status == 1) {
                            this.$router.push('/admin/notarizedDocuments/list')
                        }
                        if ((this.hasPermission(3) && status == 2) || (this.hasPermission(1) && status == 3)) {
                            this.$router.push('/admin/notarizedDocuments/listMoved')
                            axios.post('sendNotification', this.notification);
                        }
                    }
                })
            }
            else {
                if (status == 4) {
                    this.notarized_document.costs = this.selectedCost1.concat(this.selectedCost2, this.selectedCost3);
                }
                axios.post(`notarizedDocuments/${this.notarizedDocumentId}`, this.notarized_document, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                }).then(res => {
                    if (res.data.success) {
                        if ((this.hasPermission(3) && status == 1)) {
                            this.$router.push('/admin/notarizedDocuments/list')
                        }
                        if ((this.hasPermission(3) && status == 2) || (this.hasPermission(1) && status == 3)
                            || this.hasPermission(2) && status == 4) {
                            this.$router.push('/admin/notarizedDocuments/listMoved')
                           
                            if (status != 4) {
                                axios.post('sendNotification', this.notification);
                            }
                            if(status == 4){
                                this.notification.receiverId = this.notarized_document.manager.id;
                                this.notification.message = "Thêm bản lưu trữ";
                                axios.post('sendNotification', this.notification);
                                axios.post('storages', { notarized_document_id: this.notarizedDocumentId })
                            }
                        }
                        
                    }
                })
            }
           } else{ alert('sai')}
        },
        cancel(data){
            axios.put(`cancelDocument/${data.id}`).then(res=>{
                if(res.data.success){
                    this.notification.message ='Hồ sơ ' + data.id + ' bị hủy';
                    this.notification.receiverId = data.notary.id;
                    axios.post('sendNotification', this.notification);
                    this.$router.push('/admin/notarizedDocuments/listAll')

                }
            })
        },
        onFileChange(event) {
            this.notarized_document.file = event.target.files[0];
        },
        async getCosts() {
            await axios.get('costs').then(res => {
                this.costs = res.data.filter(cost => cost.deleted === 0);

            })
        },
        getCostsByCostTypeId(costTypeId) {
            // Sử dụng filter để lọc các chi phí theo cost_type.id
            return this.costs.filter((cost) => cost.cost_type_id === costTypeId);
        },
        async getNotarizedDocument(id) {
            await axios.get(`notarizedDocuments/${id}`).then(res => {
                this.notarized_document = res.data;

                // if (res.data.secretary.length > 0) {
                //     this.notarized_document.secretary = res.data.secretary[0];
                // }
                if (res.data.accountant.length > 0) {
                    this.notarized_document.accountant = res.data.accountant[0];
                } else {
                    this.notarized_document.accountant = ''
                }

                this.notarized_document.notary = res.data.notary[0];
                this.notarized_document.manager = res.data.manager[0];

                this.notarized_document.category_id = res.data.category.id;
                this.notarized_document.selectedLawTexts = res.data.lawTexts;      

            })
        },
        async getLawTexts() {
            await axios.get('lawTexts').then(res => {
                this.lawTexts = res.data;
            })
        },
        async getCustomers() {
            await axios.get("customers")
                .then(res => {
                    this.customers = res.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        async getStaffOfRole(id, resultArray) {
            try {
                const response = await axios.get('get-staff-with-permission', {
                    params: {
                        permission_id: id
                    }
                });

                // Xóa toàn bộ phần tử trong resultArray và thêm các phần tử mới
                resultArray.length = 0;
                resultArray.push(...response.data);
            } catch (error) {
                console.error(error);
            }
        },
        async getCategories() {
            await axios.get('categories')
                .then(res => {
                    this.categories = res.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        async getForms() {
            await axios.get('forms')
                .then(res => {
                    this.forms = res.data;
                    this.filterForms()
                })
                .catch(error => {
                    console.error(error);
                });
        },
        downloadFile(value) {
            window.location.href = 'http://127.0.0.1:8000/storage/forms/' + value;
        },
        showListCustomers(buttonName) {
            this.selectedButton = buttonName;
            this.showList = true;
            this.currentPage = 1;
        },
        selectedLawText(event) {
            const selectedLawTextId = event.target.value;
            const selectedLawText = this.lawTexts.find(lawText => lawText.id === parseInt(selectedLawTextId));
            if (selectedLawText && !this.notarized_document.selectedLawTexts.some(item => item.id === selectedLawText.id)) {
                this.notarized_document.selectedLawTexts.push({
                    id: selectedLawText.id,
                    name: selectedLawText.name
                });
            }
        },

        // selectedAccountant(event) {
        //     const selectedAccountantId = event.target.value;
        //     const selectedAccountant = this.accountants.find(accountant => accountant.id === parseInt(selectedAccountantId));
        //     this.notarized_document.accountant = {
        //         id: selectedAccountant.id,
        //         name: selectedAccountant.name
        //     };
        // },
        deleteSelectedLawText(index) {
            this.notarized_document.selectedLawTexts.splice(index, 1);
        },
        selectedCustomer(customer) {
            const buttonKey = this.selectedButton;
            const targetArray = this.notarized_document[`customers${buttonKey}`];

            // Kiểm tra xem khách hàng đã tồn tại trong mảng đã chọn hay chưa
            const customerExists = targetArray.some(existingCustomer => existingCustomer.id === customer.id);
            if (!customerExists) {
                targetArray.push(customer);
                // Xóa khách hàng đã chọn khỏi danh sách this.customers
                const customerIndex = this.customers.findIndex(cust => cust.id === customer.id);
                if (customerIndex !== -1) {
                    this.customers.splice(customerIndex, 1);
                }
            }

            this.showList = false;
        },
        deleteSelectedCustomer(buttonKey, index) {
            const targetArray = this.notarized_document[`customers${buttonKey}`];
            const removedCustomer = targetArray.splice(index, 1)[0];

            // Thêm lại khách hàng đã xóa vào danh sách this.customers
            this.customers.push(removedCustomer);
        },

        //  Các hàm phân trang list-customers
        goToPage(pageNumber) {
            this.currentPage = pageNumber;
        },
        goToFirstPage() {
            this.currentPage = 1;
        },
        goToLastPage() {
            this.currentPage = Math.ceil(this.filteredCustomers.length / this.itemsPerPage);
        },
        goToNextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        goToPreviousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
    },
    computed: {
        
        paginatedCustomers() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.filteredCustomers.slice(startIndex, endIndex);
        },
        filteredCustomers() {
            const keyword = this.searchKeyword.toLowerCase();
            if (!keyword) {
                return this.customers; // Trả về toàn bộ danh sách nếu không có từ khóa tìm kiếm
            }

            return this.customers.filter(customer => {
                return (
                    customer.name.toLowerCase().includes(keyword) ||
                    customer.address.toLowerCase().includes(keyword) ||
                    customer.phone.includes(keyword) ||
                    customer.email.toLowerCase().includes(keyword)
                );
            });
        },
        totalPages() {
            return Math.ceil(this.filteredCustomers.length / this.itemsPerPage);
        },
    }
}
</script>

<style scoped>
.list-customers {
    height: 320px;
    cursor: pointer;
}

.list-customers .customer:hover {
    background-color: #f3f0f0;
}

.selected {
    position: relative;
    margin-top: 10px;
    padding: 8px;
    background-color: #f8f9fa;
}

.selected-delete {
    position: absolute;
    top: -8px;
    right: -4px;
    cursor: pointer;
    font-size: 18px;
    color: #3872b2;
}

.selected-delete:hover {
    opacity: 0.8;
}

.list-costs {
    height: 120px;
    overflow-y: auto;
}

.costs-wrap {
    min-height: 38px;
    width: 100%;
    margin: 0;
    border: 1px solid #ddd;
    border-radius: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.costs-wrap .icon {
    display: flex;
    padding: 0 6px;
    justify-content: center;
    align-items: center;
}

.costs-wrap .icon:hover {
    cursor: pointer;
    opacity: 0.6;
}

.selected-costs .item {
    display: inline-block;
    font-size: 14px;
    border-radius: 4px;
    padding: 2px 12px;
    background-color: #ddd;
    position: relative;
    margin: 4px 6px 0px 6px;
}

.selected-costs .item .delete {
    position: absolute;
    color: #666;
    top: -4px;
    right: -6px;
    cursor: pointer;
}

.selected-costs .item .delete:hover {
    opacity: 0.8;
}

.cost-list {
    height: 146px;
    overflow-y: auto;
    width: 100%;
}

.cost-list-item {
    display: flex;
    justify-content: space-between;
    padding: 4px 12px;
}

.cost-list-item:hover {
    cursor: pointer;
    background-color: #1371d5;
    color: #fff;
}
</style>