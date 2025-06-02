<script setup>
import downArrWhite from "@/assets/img/down-arrow-white.svg";
import downArrBlack from "@/assets/img/down-arrow-dark.svg";
import image from "@/assets/img/curved8.jpg";

defineProps({
  btnBackground: {
    type: String,
    default: "",
  },
  isBlur: {
    type: String,
    default: "",
  },
  darkMode: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg top-0 z-index-3 position-absolute mt-4"
    :class="isBlur ? isBlur : 'shadow-none my-2 navbar-transparent w-100'">
    <div class="container ps-2 pe-0">
      <router-link class="navbar-brand text-lg font-weight-bolder ms-lg-0 ms-3"
        :class="darkMode ? 'text-black' : 'text-white'" to=""> RoomPay</router-link>
      <button class="shadow-none navbar-toggler ms-2" type="button" data-bs-toggle="collapse"
        data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
        <span class="mt-2 navbar-toggler-icon">
          <span class="navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </span>
      </button>
      <div id="navigation" class="pt-3 pb-2 collapse navbar-collapse w-100 py-lg-0">
        <ul class="mx-auto navbar-nav navbar-nav-hover">
          <li class="mx-2 nav-item dropdown dropdown-hover">
            <a id="dropdownMenuPages" role="button"
              class="cursor-pointer nav-link ps-2 d-flex justify-content-between align-items-center text-md"
              :class="darkMode && 'text-dark'" data-bs-toggle="dropdown" aria-expanded="false">
              Tính năng
              <img :src="downArrWhite" alt="down-arrow" class="arrow ms-1"
                :class="darkMode ? 'd-none' : 'd-lg-block d-none'" />
              <img :src="downArrBlack" alt="down-arrow" class="arrow ms-1 d-block"
                :class="darkMode ? 'd-lg-block' : 'd-lg-none'" />
            </a>
            <div class="p-3 mt-0 dropdown-menu dropdown-menu-animation dropdown-xl border-radius-xl mt-lg-3"
              aria-labelledby="dropdownMenuPages">
              <div class="row d-none d-lg-block">
                <div class="px-4 py-2 col-12">
                  <div class="row">
                    <div class="col-4 position-relative">
                      <div class="px-0 dropdown-header text-dark font-weight-bolder d-flex align-items-center">
                        <i class="ni ni-spaceship me-3 text-success"></i>
                        Giới thiệu
                      </div>
                      <router-link :to="{ name: 'Landing' }" class="dropdown-item border-radius-md">
                        <span class="ps-3">Giới thiệu</span>
                      </router-link>
                      <router-link :to="{ name: '' }" class="dropdown-item border-radius-md">
                        <span class="ps-3">Mặc định</span>
                      </router-link>
                      <hr class="vertical dark" />
                    </div>
                    <div class="col-4 position-relative">
                      <div class="px-0 dropdown-header text-dark font-weight-bolder d-flex align-items-center">
                        <i class="ni ni-badge me-3 text-success"></i>
                        Quản lý phòng
                      </div>
                      <router-link :to="{ name: '' }" class="dropdown-item border-radius-md">
                        <span class="ps-3">Danh sách phòng</span>
                      </router-link>
                      <router-link :to="{ name: '' }" class="dropdown-item border-radius-md">
                        <span class="ps-3">Chi tiết phòng</span>
                      </router-link>
                      <router-link :to="{ name: '' }" class="dropdown-item border-radius-md">
                        <span class="ps-3">Thống kê chi tiết</span>
                      </router-link>
                    </div>
                    <div class="col-4">
                      <div class="px-0 dropdown-header text-dark font-weight-bolder d-flex align-items-center">
                        <i class="ni ni-single-02 me-3 text-success"></i>
                        Tài khoản
                      </div>
                      <router-link :to="{ name: 'Tài khoản' }" class="dropdown-item border-radius-md">
                        <span class="ps-3">Tài khoản</span>
                      </router-link>
                      <router-link :to="{ name: 'Đăng nhập' }" class="dropdown-item border-radius-md">
                        <span class="ps-3">Đăng nhập</span>
                      </router-link>
                      <router-link :to="{ name: 'Đăng ký' }" class="dropdown-item border-radius-md">
                        <span class="ps-3">Đăng ký</span>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
              <!-- responsive -->
            </div>
          </li>
          <li class="mx-2 nav-item dropdown dropdown-hover">
            <a id="dropdownMenuPages" role="button"
              class="cursor-pointer nav-link ps-2 d-flex justify-content-between align-items-center text-md"
              :class="darkMode && 'text-dark'" data-bs-toggle="dropdown" aria-expanded="false">
              Tài khoản
              <img :src="downArrWhite" alt="down-arrow" class="arrow ms-1"
                :class="darkMode ? 'd-none' : 'd-lg-block d-none'" />
              <img :src="downArrBlack" alt="down-arrow" class="arrow ms-1 d-block"
                :class="darkMode ? 'd-lg-block' : 'd-lg-none'" />
            </a>
            <div class="p-3 mt-0 dropdown-menu dropdown-menu-animation dropdown-xs border-radius-xl mt-lg-3"
              aria-labelledby="dropdownMenuPages">
              <div class="row d-none d-lg-block">
                <div class="px-4 py-2">
                  <div class="row">
                    <div class="px-0 dropdown-header text-dark font-weight-bolder d-flex align-items-center">
                      <i class="ni ni-single-02 me-3 text-success"></i>
                      Tài khoản
                    </div>
                    <router-link :to="{ name: 'Đăng nhập' }" class="dropdown-item border-radius-md">
                      <span class="ps-3">Đăng nhập</span>
                    </router-link>
                    <router-link :to="{ name: 'Đăng ký' }" class="dropdown-item border-radius-md">
                      <span class="ps-3">Đăng ký</span>
                    </router-link>
                  </div>
                </div>
              </div>
              <!-- responsive -->
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- End Navbar -->
</template>
