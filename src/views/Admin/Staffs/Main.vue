<template>
    <div class="card p-3">
        <div class="d-flex main">
            <div class="item"
            :class="{ active: $route.path === '/admin/staffs/listStaffs' }">
                <RouterLink class="text-dark" to="/admin/staffs/listStaffs">
                    <i class="fa-solid fa-users px-2"></i> Nhân viên
                </RouterLink>
            </div>
            <div class="item"
            :class="{ active: $route.path === '/admin/staffs/listRoles' }">
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
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>