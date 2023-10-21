<template>
    <div class="card p-3">
        <div class="d-flex main">
            <div class="item" :class="{ active: $route.path === '/admin/appointments/listAppointments' }">
                <RouterLink class="text-dark" to="/admin/appointments/listAppointments">
                    <i class="fa-solid fa-users px-2"></i> Lịch hẹn chờ xác nhận
                </RouterLink>
            </div>
            <div class="item" :class="{ active: $route.path === '/admin/appointments/myAppointment' }">
                <RouterLink class="text-dark" to="/admin/appointments/myAppointment">
                    <i class="fa-solid fa-users-rectangle px-2"></i>Lịch hẹn của tôi
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
import { hasPermission } from '@/utils';

export default {

}
</script>

<style lang="scss" scoped></style>