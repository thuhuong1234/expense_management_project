<script setup>
</script>
<template>
    <nav class="navbar navbar-main navbar-expand-lg shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
        <div id="navbar" class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4 justify-content-between">
            <div class="pe-md-3 d-flex align-items-center ">
                <div class="input-group">
                    <span class="input-group-text text-body">
                        <i class="fas fa-search" aria-hidden="true"></i>
                    </span>
                    <input type="text" placeholder="Tìm kiếm..." class="form-control" />
                </div>
            </div>
            <div class="pe-md-3 d-flex align-items-center ">
                <div class="input-group">
                    <slot name="nav-child-item" />
                </div>
            </div>
        </div>
    </nav>
</template>

