<template>
    <!-- NAVBAR -->
    <nav>
        <div>
            <i id="menuIcon" class='bx bx-menu'></i>
            <span v-if="admin" class="px-3">
                {{ admin.name }}
            </span>
        </div>
        <div class="d-flex align-items-center ">
            <div class="dropdown ">

                <div class="notification" data-bs-toggle="dropdown">
                    <i class='bx bxs-bell'></i>
                    <span v-if="unreadCount > 0" class="num">{{ unreadCount }}</span>
                </div>

                <div class="notification-wrap dropdown-menu">
                    <h5 class="my-2">Thông báo</h5>
                    <ul class="notification-list">
                        <hr class="m-0">

                        <li class="item" v-for="(notification, index) in notifications" :key="index">
                            <a class="p-3 d-block" :href="link" 
                                @click="updateStatus(notification)">
                                <div :class="{ 'fw-bold': notification.read === 0 }">{{ notification.message }}</div>
                                <small>{{ formatDateTime(notification.created_at) }}</small>
                            </a>
                            <hr class="m-0">
                        </li>
                        <div v-if="notifications.length == 0">
                            Không có thông báo
                        </div>
                    </ul>
                </div>
            </div>

            <div class="dropdown">
                <div class="profile" data-bs-toggle="dropdown">
                    <img src="@/assets/default-avatar.png" alt="">
                </div>
                <ul class="dropdown-menu">
                    <li>
                        <a class="dropdown-item" href="#">Thông tin cá nhân</a>
                    </li>
                    <li @click="logout()">
                        <a class="dropdown-item" href="#">Đăng xuất</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <!-- NAVBAR -->

    <!-- <div class="modal-container" v-show="showNocatification">
        <div class="modal-overlay" @click="showNocatification = false"></div>
        <div class="modal-notification text-center">
            <h4 class="text-danger">Hồ sơ mới</h4>
            <div>Có hồ sơ mới chờ bạn duyệt!</div>
            <div class="d-flex justify-content-center mt-3">
                <RouterLink to="/admin/notarizedDocuments/list" @click="showNocatification = false">
                    <button class="btn btn-danger">Xem hồ sơ</button>
                </RouterLink>
                &nbsp;
                <button class="btn btn-secondary" @click="showNocatification = false">Để sau</button>
            </div>
        </div>
    </div> -->
</template>

<script>
import axios from 'axios';
import Pusher from 'pusher-js'
export default {
    data() {
        return {
            messages: [],
            admin: [],
            notifications: [],
            link: null
            // showNocatification: false

        }
    },
    created() {
        
        // Lấy giá trị admin từ localStorage
        var storeData = localStorage.getItem('store');
        this.admin = JSON.parse(storeData).admin;

        this.getNotifications(this.admin.id);


        if (this.unreadCount > 0) {
            this.showNocatification = true;
        }
    },
    mounted() {
        Pusher.logToConsole = true;
        const pusher = new Pusher('965655c9440315eaef47', {
            cluster: 'ap1',
        });

        const channel = pusher.subscribe('notification');
        channel.bind('notification', (data) => {
            if (data.receiverId == this.admin.id) {
                this.messages.push(data);
                this.getNotifications(this.admin.id);
            }
        });
    },
    methods: {
        getNotifications($id) {
            axios.get(`getNotification/user-${$id}`).then(res => {
                this.notifications = res.data;
            })
        },
        logout() {
            localStorage.removeItem('tokenAdmin');
            this.$store.dispatch("logoutAdmin");

        },
        updateStatus($notifacation) {
            axios.post(`/notification/updateStatus-${$notifacation.id}`)
            if($notifacation.message == "Hồ sơ mới chờ duyệt"){
                this.link = 'http://localhost:8080/admin/notarizedDocuments/list';
            }
            else if($notifacation.message == "Thêm bản lưu trữ"){
                this.link = 'http://localhost:8080/admin/storages';             
            }
            else if($notifacation.message.includes('bị hủy')){
                this.link = 'http://localhost:8080/admin/notarizedDocuments/listCancelled';             
            }
            else if($notifacation.message.includes('Lịch hẹn lúc')){
                this.link = 'http://localhost:8080/admin/appointments/myAppointment';             
            }
        },
        formatDateTime(inputDate) {
            // Chuyển đổi chuỗi ngày giờ thành ngày
            const date = new Date(inputDate);

            // Lấy giờ và phút
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');

            // Lấy ngày, tháng và năm
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng trong JavaScript bắt đầu từ 0
            const year = date.getFullYear();

            // Tạo chuỗi định dạng mới và trả về
            return `${hours}:${minutes} - ${day}/${month}/${year}`;
        },
    },
    computed: {
        unreadCount() {
            return this.notifications.filter(notification => !notification.read).length;
        }
    },
    // watch: {
    //     unreadCount(newCount) {
    //         this.showNocatification = newCount > 0;
    //     }
    // }
}
</script>

<style scoped>
.notification {
    position: relative;
}

.notification-wrap {
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    width: 400px;
    padding: 18px;
    margin-top: 8px;
}

.notification-list {
    padding: 0;
    max-height: 300px;
    overflow-y: auto;
}

.notification-list .item {
    border-radius: 4px;
}

.notification-list .item:hover {
    background-color: rgb(247, 251, 254);
}
</style>