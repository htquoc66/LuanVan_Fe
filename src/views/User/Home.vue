<template>
    <section class="banner">
        <img src="@/assets/banner.png" style="width: 100%;" alt="">
    </section>
    <section class="banner-mobile">
        <img src="@/assets/banner-mobile.png" style="width: 100%;" alt="">
    </section>
    <div class="container-sm py-5">
        <section class="pb-5">
            <div class="heading">
                DỊCH VỤ CỦA CHÚNG TÔI
                <hr class="mt-2">
            </div>
            <div class="row mt-5">
                <div class="col-xl-4 col-md-6">
                    <div class="box d-flex">
                        <div class="box-icon">
                            <i class="text-blue fa-4x fa-solid fa-book-open"></i>
                        </div>
                        <div class="box-text px-3">
                            <h4>Thủ tục nhanh chóng</h4>
                            <p>Với đội ngũ Công chứng viên, cán bộ nghiệp vụ giàu kinh nghiệm, vững nghiệp vụ và kỹ năng
                                hành
                                nghề, chúng tôi luôn sẳn sàng phục vụ quý khách với chất lượng dịch vụ tốt nhất, tiết kiệm
                                thời
                                gian và chi phí.</p>
                        </div>
                    </div>
                </div>

                <div class="col-xl-4 col-md-6">
                    <div class="box d-flex">
                        <div class="box-icon">
                            <i class="text-blue fa-4x fa-solid fa-hand-holding-heart"></i>
                        </div>
                        <div class="box-text px-3">
                            <h4>Tư vấn tận tình</h4>
                            <p>Với yêu cầu “Chất lượng – Chuyên nghiệp – Đạo đức”, Văn Phòng Công chứng Cần Thơ sẽ mang đến
                                cho quý khách những thông tin tư vấn, hướng dẫn tận tình, rõ ràng, nhanh chóng và đúng pháp
                                luật.</p>
                        </div>
                    </div>
                </div>

                <div class="col-xl-4 col-md-6">
                    <div class="box d-flex">
                        <div class="box-icon">
                            <i class="text-blue fa-4x fa-regular fa-clock"></i>
                        </div>
                        <div class="box-text px-3">
                            <h4>Tiết kiệm thời gian</h4>
                            <p>Với phong cách làm việc chuyên nghiệp của Công chứng viên, cán bộ nghiệp vụ sẽ giúp quý khách
                                hàng giải quyết công việc kịp thời, nhanh chóng và thuận lợi.</p>
                        </div>
                    </div>
                </div>





                <div class="col-xl-4 col-md-6">
                    <div class="box d-flex">
                        <div class="box-icon">
                            <i class="text-blue fa-4x fa-solid fa-handshake"></i>
                        </div>
                        <div class="box-text px-3">
                            <h4>Chính xác, đúng pháp luật</h4>
                            <p>Đặt an toàn pháp lý của khách hàng lên hàng đầu, Phòng Công chứng số 2 cam kết cung cấp dịch
                                vụ công chứng bảo đảm tính xác thực và hợp pháp.</p>
                        </div>
                    </div>
                </div>

                <div class="col-xl-4 col-md-6">
                    <div class="box d-flex">
                        <div class="box-icon">
                            <i class="text-blue fa-4x fa-solid fa-car"></i>
                        </div>
                        <div class="box-text px-3">
                            <h4>Công chứng ngoài trụ sở</h4>
                            <p>Cung cấp dịch vụ công chứng ngoài trụ sở, ngoài ngày, giờ làm việc của cơ quan hành chính nhà
                                nước để đáp ứng kịp thời yêu cầu công chứng của quý khách hàng theo đúng quy định của Luật
                                Công chứng.</p>
                        </div>
                    </div>
                </div>

                <div class="col-xl-4 col-md-6">
                    <div class="box d-flex">
                        <div class="box-icon">
                            <i class="text-blue fa-4x fa-solid fa-circle-dollar-to-slot"></i>
                        </div>
                        <div class="box-text px-3">
                            <h4>Chi phí phù hợp
                            </h4>
                            <p>Quý khách chỉ phải thanh toán phí công chứng và thù lao công chứng theo đúng quy định pháp
                                luật. Ngoài ra, quý khách không phải trả thêm bất cứ khoản chi phí nào khác.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.heading hr {
    width: 250px;
    margin: 0 auto;
    border: 1px solid #3872b2;

}

.box-icon {
    margin-right: 36px;
    transition: transform 0.5s ease;
}

.box:hover .box-icon {
    transform: rotateY(180deg);
}
</style>