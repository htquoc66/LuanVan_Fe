<template>
    <div class="card p-3" v-if="hasPermission(1) || hasPermission(23)">
        <div class="d-flex main">
            <div class="item" :class="{ active: $route.path === '/admin/staffs/listStaffs' }">
                <RouterLink class="text-dark" to="/admin/staffs/listStaffs">
                    <i class="fa-solid fa-users px-2"></i> Nhân viên
                </RouterLink>
            </div>
            <div v-show="hasPermission(27)" class="item" :class="{ active: $route.path === '/admin/staffs/listRoles' }">
                <RouterLink class="text-dark" to="/admin/staffs/listRoles">
                    <i class="fa-solid fa-users-rectangle px-2"></i>Vai trò
                </RouterLink>
            </div>
        </div>
        <hr class="m-0">
        <div class="p-3">
            <RouterView></RouterView>
        </div>

    </div>
    <div v-else class="not-have-access">
        <div class="text-center">
            <h3>Bạn không đủ quyền truy cập!</h3>
            <RouterLink to="/admin/dashboard" class="mt-3 btn btn-success">Trở về trang chủ</RouterLink>
        </div>
    </div>
</template>

<script>
import { hasPermission } from '@/utils';

export default {
    methods: {
        hasPermission
    }
}
</script>

<style scoped></style>