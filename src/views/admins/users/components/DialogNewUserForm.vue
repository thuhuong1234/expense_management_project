<script setup>
import { defineProps } from "vue";
const props = defineProps({
    modalTitle: {
        type: String,
        default: ""
    },
    onSubmit: {
        type: Function,
        default: () => { }
    }
})
</script>

<template>
    <div class="modal fade" id="userModal" tabindex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <form role="form" class="text-start" @submit.prevent="onSubmit">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="userModalLabel">{{ modalTitle }}</h1>
                        <button type="button" class="btn-close " data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <slot name="modal-body" />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary " data-bs-dismiss="modal">Hủy</button>
                        <button type="submit" class="btn btn-outline-primary btn-save">Lưu</button>
                    </div>
                </form>

            </div>
        </div>
    </div>
</template>

<style scss scoped>
.btn-save {
    border: #ee3672 solid 2px;
    color: #ee3672;

    &:hover {
        color: #ee3672 !important;
    }
}
</style>