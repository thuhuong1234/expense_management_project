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
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
        @submit.prevent="onSubmit">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <form role="form" class="text-start">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">{{ modalTitle }}</h1>
                        <button type="button" class="btn-close " data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <slot name="modal-body" />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary " data-bs-dismiss="modal">Hủy</button>
                        <button type="submit" class="btn btn-outline-primary">Lưu</button>
                    </div>
                </form>

            </div>
        </div>
    </div>
</template>