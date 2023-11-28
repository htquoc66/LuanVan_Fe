<template>
    <!-- SIDEBAR -->
    <section id="sidebar" class="hide">
        <a href="#" class="brand">
            <img src="@/assets/logo.png" class="m-1" width="60" alt="">
            <div class="h5 m-0">Công Chứng Cần Thơ</div>
        </a>
        <ul class="side-menu top p-0">
            <li :class="{ active: $route.path === '/admin/dashboard' }">
                <RouterLink to="/admin/dashboard">
                    <i class='bx bxs-dashboard'></i>
                    <span class="text">Dashboard</span>
                </RouterLink>
            </li>
            <li v-if="hasPermission(3)" :class="{ active:  $route.path.includes('/admin/appointments')}">
                <RouterLink to="/admin/appointments/listAppointments">
                    <i class='bx bxs-calendar'></i>
                    <span class="text">Quản lý lịch hẹn</span>
                </RouterLink>
            </li>
            <li :class="{ active: $route.path ==='/admin/customers' }">
                <RouterLink to="/admin/customers">
                    <i class='bx bxs-group'></i>
                    <span class="text">Quản lý khách hàng</span>
                </RouterLink>
            </li>
            <li :class="{ active: $route.path.includes('/admin/notarizedDocuments') }">
                <RouterLink to="/admin/notarizedDocuments/list">
                    <i class='bx bxs-file'></i>
                    <span class="text">Quản lý hồ sơ</span>
                </RouterLink>
            </li>
            <li v-show="hasPermission(1)" :class="{ active: $route.path.includes('/admin/storages') }">
                <RouterLink to="/admin/storages">
                    <i class='bx bxs-basket'></i>
                    <span class="text">Quản lý lưu trữ</span>
                </RouterLink>
            </li>

            <li :class="{ active: $route.path === '/admin/lawTexts' }">
                <RouterLink to="/admin/lawTexts">
                    <i class='bx bxs-news'></i>
                    <span class="text">Quản lý văn bản pháp luật</span>
                </RouterLink>
            </li>
            <li v-if="hasPermission(1)" :class="{ active: $route.path === '/admin/forms' }">
                <RouterLink to="/admin/forms">
                    <i class='bx bxs-book-content'></i>
                    <span class="text">Quản lý biểu mẫu</span>
                </RouterLink>
            </li>

            <li v-if="hasPermission(1) || hasPermission(2)" :class="{ active: $route.path === '/admin/costs' }">
                <RouterLink to="/admin/costs">
                    <i class='bx bxs-dollar-circle'></i>
                     <span class="text">Quản lý chi phí</span>
                </RouterLink>
            </li>

            <li v-if="hasPermission(1)" :class="{ active: $route.path.includes('/admin/staffs') }">
                <RouterLink to="/admin/staffs/listStaffs">
                    <i class='bx bxs-briefcase'></i>
                    <span class="text">Quản lý nhân viên</span>
                </RouterLink>
            </li>

            <li :class="{ active: $route.path === '/admin/categories' }">
                <RouterLink to="/admin/categories">
                    <i class='bx bxs-dashboard'></i>
                    <span class="text">Quản lý danh mục</span>
                </RouterLink>
            </li>

            <li :class="{ active: $route.path === '/admin/setting' }">
                <RouterLink to="/admin/setting">
                    <i class='bx bxs-cog text-danger'></i>
                    <span class="text">Cài đặt</span>
                </RouterLink>
            </li>


        </ul>

    </section>
    <!-- SIDEBAR -->
</template>

<script>
import { hasPermission } from '@/utils';
export default {
    methods:{
        hasPermission,
    }
}
</script>

<style scoped></style>