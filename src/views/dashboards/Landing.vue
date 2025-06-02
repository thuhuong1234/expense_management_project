<script setup>
import { onBeforeMount, onBeforeUnmount } from "vue";
import { useUiStore } from "@/stores";
import Navbar from "@/examples/PageLayout/Navbar.vue";
import PricingCard from "./components/PricingCard.vue";
import AppFooter from "@/examples/PageLayout/Footer.vue";
import AccordionItem from "./components/AccordionItem.vue";
import setNavPills from "@/assets/js/nav-pills.js";
import BgImage from "@/assets/img/pricing-header-bg.jpg";
const body = document.getElementsByTagName("body")[0];
const store = useUiStore();

onBeforeMount(() => {
    store.layout = "landing";
    store.showNavbar = false;
    store.showFooter = false;
    store.showSidenav = false;
    store.hideConfigButton = true;
    body.classList.add("landing");
    setNavPills();
});

onBeforeUnmount(() => {
    store.layout = "default";
    store.showNavbar = true;
    store.showFooter = true;
    store.hideConfigButton = false;
    body.classList.remove("landing");
    if (store.isPinned === false) {
        const sidenav_show = document.querySelector(".g-sidenav-show");
        sidenav_show.classList.remove("g-sidenav-hidden");
        sidenav_show.classList.add("g-sidenav-pinned");
        store.isPinned = true;
    }
});
</script>
<template>
    <navbar />
    <div class="page-header position-relative" :style="{
        backgroundImage: 'url(' + BgImage + ')',
        backgroundSize: 'cover',
    }">
        <span class="mask bg-gradient-success opacity-6"></span>
        <div class="container pb-10 pb-lg-9 pt-7 postion-relative z-index-2">
            <div class="row">
                <div class="mx-auto text-center col-md-6 mt-4">
                    <h3 class="text-white">Quản lý chi tiêu</h3>
                    <p class="text-white">
                        Hỗ trợ ghi chép, phân chia và thống kê chi tiêu một cách hiệu quả, minh bạch và tiện lợi
                    </p>
                </div>
            </div>
            <div class="row">
                <main class="main-content position-relative border-radius-lg">
                    <div class="container-fluid py-4">
                        <div class="row min-vh-80">
                            <div class="d-none d-lg-block">
                                <div class="col-lg-10">
                                    <div
                                        class="position-absolute p-3 border-radius-xl blur shadow-xl perspective-right z-index-3 mt-4">
                                        <router-link class="w-100" :to="{ name: 'Đăng nhập' }">
                                            <img class="w-100 border-radius-lg" src="../../assets/img/default.jpg"
                                                alt="default page" />
                                        </router-link>
                                    </div>
                                    <div
                                        class="position-absolute p-3 border-radius-xl blur shadow-xl perspective-right-sm z-index-2 mt-2">
                                        <img class="w-100 border-radius-lg" src="../../assets/img/default.jpg"
                                            alt="default page" />
                                    </div>
                                    <div
                                        class="position-absolute p-3 border-radius-xl blur shadow-xl perspective-right-xs z-index-1 mb-0">
                                        <img class="w-100 border-radius-lg" src="../../assets/img/default.jpg"
                                            alt="default page" />
                                    </div>
                                </div>
                            </div>
                            <div class="d-lg-none d-none d-md-block">
                                <div class="col-lg-10">
                                    <div class="p-3 border-radius-xl blur shadow-xl z-index-3 mt-5">
                                        <img class="w-100 border-radius-lg" src="../../assets/img/default.jpg"
                                            alt="default page" />
                                    </div>
                                    <div class="p-3 border-radius-xl blur shadow-xl z-index-2 mt-4">
                                        <img class="w-100 border-radius-lg" src="../../assets/img/default.jpg"
                                            alt="default page" />
                                    </div>
                                </div>
                            </div>
                            <div class="d-lg-none d-md-none">
                                <div class="col-lg-10">
                                    <div class="p-3 border-radius-xl blur shadow-xl z-index-3 mt-5">
                                        <img class="w-100 border-radius-lg" src="../../assets/img/default.png"
                                            alt="default page" />
                                    </div>
                                    <div class="p-3 border-radius-xl blur shadow-xl z-index-2 mt-4">
                                        <img class="w-100 border-radius-lg" src="../../assets/img/default.png"
                                            alt="default page" />
                                    </div>
                                    <div class="p-3 border-radius-xl blur shadow-xl z-index-1 mt-4">
                                        <img class="w-100 border-radius-lg" src="../../assets/img/default.png"
                                            alt="default page" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </div>
    <div class="container my-6">
        <div class="row">
            <div class="mx-auto text-center col-8">
                <h6 class="opacity-5">GIỚI THIỆU HỆ THỐNG ROOMPAY</h6>
            </div>
        </div>
        <div class="mt-2 row">
            <div class="mx-auto text-center col-md-6">
                <h2>Các câu hỏi liên quan</h2>
                <p>
                    Ghi lại, sắp xếp và thống kê chi tiêu một cách thông minh.
                    Thoát khỏi tình trạng lộn xộn và hỗn loạn - thống kê chi tiêu hệ thống bằng RoomPay.
                </p>
            </div>
        </div>
        <div class="row">
            <div class="mx-auto col-md-10">
                <div id="accordionRental" class="accordion">
                    <accordion-item accordion-id="headingOne" collapse-id="collapseOne" active>
                        <template #question>Quản lý chi tiêu là gì?</template>
                        <template #answer>
                            Quản lý chi tiêu là quá trình lập kế hoạch, theo dõi và kiểm soát việc sử dụng tiền bạc của
                            cá nhân, gia đình hoặc tổ chức nhằm đảm bảo rằng các khoản thu nhập được sử dụng một cách
                            hiệu quả, hợp lý và tránh lãng phí.
                        </template>
                    </accordion-item>
                    <accordion-item accordion-id="headingOne" collapse-id="collapseOne" active>
                        <template #question>Chức năng của hệ thống là gì?</template>
                        <template #answer>
                            Hệ thống RoomPay được xây dựng nhằm quản lý chi tiêu cho cá nhân hoặc nhóm, với các chức
                            năng chính: <strong>Quản lý chi tiêu cá nhân và nhóm, Thống kê chi tiêu, Quản lý người
                                dùng,...
                            </strong>
                        </template>
                    </accordion-item>
                    <accordion-item accordion-id="headingTwo" collapse-id="collapseTwo">
                        <template #question>Làm thế nào để sử dụng hệ thống?</template>
                        <template #answer>
                            Để sử dụng hệ thống RoomPay, người dùng cần <strong>đăng nhập, đăng ký tài khoản</strong>,
                            sau đó có
                            thể <strong>tạo hoặc tham gia nhóm chi tiêu</strong>,
                            <strong>ghi chép các khoản chi</strong>, <strong>quản lý quỹ nhóm</strong>, và <strong>theo
                                dõi thống kê chi tiêu</strong> qua biểu đồ trực quan.
                        </template>

                    </accordion-item>

                    <accordion-item accordion-id="headingThree" collapse-id="collapseThree">
                        <template #question>Hệ thống có các chức năng gì nổi bật?</template>
                        <template #answer>
                            Hệ thống có các chức năng nổi bật như: <strong>Quản lý người dùng</strong>, <strong>tạo và
                                tham gia nhóm chi tiêu</strong>,
                            <strong>ghi chép và chia sẻ khoản chi</strong>, <strong>quản lý quỹ nhóm</strong>,
                            <strong>thống kê chi tiêu bằng biểu đồ</strong>,
                            và <strong>gửi thông báo thời gian thực</strong>.
                        </template>

                    </accordion-item>
                    <accordion-item accordion-id="headingFour" collapse-id="collapseFour">
                        <template #question>Các vấn đề thường gặp phải?</template>
                        <template #answer>
                            Trong quá trình phát triển và sử dụng hệ thống RoomPay, có thể gặp phải một số vấn đề phổ
                            biến như sau:<br />
                            <strong>1. Đồng bộ và chia sẻ dữ liệu nhóm:</strong> Khi nhiều người cùng tham gia một nhóm
                            chi tiêu, việc cập nhật chi tiêu theo thời gian thực đôi khi bị trễ hoặc sai lệch nếu kết
                            nối không ổn định.<br />
                            <strong>2. Mâu thuẫn trong việc phân chia khoản chi:</strong> Việc chia đều hoặc chia theo
                            tỉ lệ chi tiêu có thể gây tranh cãi nếu không rõ ràng, đặc biệt khi không có ghi chú cụ thể
                            cho từng khoản.<br />
                            <strong>3. Quản lý quyền truy cập:</strong> Nếu không phân quyền hợp lý (ví dụ: ai được
                            chỉnh sửa, ai chỉ được xem), có thể dẫn đến sai sót hoặc chỉnh sửa nhầm lẫn trong nhóm.
                            <strong>4. Quên ghi chép chi tiêu:</strong> Người dùng có thể quên nhập chi tiêu dẫn đến
                            thiếu chính xác trong báo cáo và thống kê.<br />
                            <strong>5. Thiếu tính bảo mật:</strong> Nếu không bảo vệ tài khoản bằng xác thực mạnh hoặc
                            mã hóa dữ liệu, người dùng dễ bị lộ thông tin tài chính cá nhân.<br />
                            <strong>6. Giao diện người dùng chưa thân thiện:</strong> Với người không rành công nghệ, hệ
                            thống cần đơn giản, dễ dùng; nếu không sẽ gây khó khăn trong thao tác và ghi nhận chi
                            tiêu.<br />
                            <strong>7. Xử lý lỗi & sao lưu dữ liệu:</strong> Khi hệ thống xảy ra lỗi hoặc mất kết nối cơ
                            sở dữ liệu, nếu không có cơ chế sao lưu/phục hồi, dữ liệu có thể bị mất.<br />
                            Việc nhận diện trước các vấn đề này sẽ giúp quá trình phát triển hệ thống được định hướng
                            tốt hơn, đảm bảo trải nghiệm người dùng hiệu quả và bền vững.<br />
                        </template>

                    </accordion-item>
                </div>
            </div>
        </div>
    </div>
    <app-footer />
</template>