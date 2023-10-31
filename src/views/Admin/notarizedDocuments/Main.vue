<template>
    <div class="card pb-4">
        <div v-if="$route.path !== '/admin/notarizedDocuments/invoice' && $route.path !== '/admin/notarizedDocuments/form'" class="px-4 py-2">
            <div class="main d-flex justify-content-between">
                <div class="d-flex">
                    <div v-if="hasPermission(1)" class="item" :class="{ active: $route.path === '/admin/notarizedDocuments/listAll' }">
                        <RouterLink class="text-dark" to="/admin/notarizedDocuments/listAll">
                            <i class="fa-solid fa-file px-2"></i>
                            <span >Tất cả hồ sơ</span>

                        </RouterLink>
                    </div>
                    <div class="item" :class="{ active: $route.path === '/admin/notarizedDocuments/list' }">
                        <RouterLink class="text-dark" to="/admin/notarizedDocuments/list">
                            <i class="fa-solid fa-file px-2"></i>
                            <span v-if="hasPermission(2)">Hồ sơ đang xử lý</span>
                            <span v-if="hasPermission(1)">Hồ chờ duyệt</span>
                            <span v-if="hasPermission(3)">Hồ sơ lưu</span>

                        </RouterLink>
                    </div>
                    <div class="item" :class="{ active: $route.path === '/admin/notarizedDocuments/listMoved' }">
                        <RouterLink class="text-dark" to="/admin/notarizedDocuments/listMoved">
                            <i class="fa-solid fa-file-import px-2"></i>
                            <span v-if="hasPermission(2)">Hồ sơ đang cập nhật</span>
                            <span v-if="hasPermission(1)">Đã chuyển cho kế toán</span>
                            <span v-if="hasPermission(3)">Đã chuyển cho trưởng phòng</span>
                        </RouterLink>
                    </div>

                    <div v-if="hasPermission(2) || hasPermission(1)" class="item" :class="{ active: $route.path === '/admin/notarizedDocuments/listInvoices' }">
                        <RouterLink class="text-dark" to="/admin/notarizedDocuments/listInvoices">
                            <i class="fa-solid fa-print px-2"></i>
                            <span>Phiếu thu & hóa đơn</span>
                        </RouterLink>
                    </div>
                </div>

                <RouterLink v-if="hasPermission(3)" to="/admin/notarizedDocuments/form">
                    <button class="btn-blue px-4 mt-2 mb-3">
                        <i class="fa-solid fa-plus"></i> Thêm mới
                    </button>
                </RouterLink>         
            </div>
            <hr class="m-0">
        </div>
        <div class="px-3">
            <RouterView></RouterView>
        </div>

    </div>
</template>

<script>
import {hasPermission} from "@/utils"
export default {
    data() {
        return {
            admin: [],
        }
    },
    created() {
        var storeData = localStorage.getItem('store');
        this.admin = JSON.parse(storeData).admin;
    },
    methods: {
        hasPermission,
    }
}
</script>

<style scoped></style>