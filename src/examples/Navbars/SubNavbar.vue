<script setup>
import PlusIcon from "@/assets/img/48-e-add-2.svg";
import ExportIcon from "@/assets/img/48-upload-2.svg";
import GridIcon from "@/assets/img/48-grid-interface.svg";
import ListIcon from "@/assets/img/48-paragraph.svg";

const emits = defineEmits(['add', 'export', 'toggle']);
const props = defineProps({
    showBtnAdd: { type: Boolean, default: true },
    showBtnExport: { type: Boolean, default: true },
    showBtnView: { type: Boolean, default: true },
    isShowGrid: { type: Boolean, default: true },
})
</script>
<template>
    <div class="d-lg-flex w-100 align-items-center justify-content-between py-3">
        <div class="input-group w-40">
            <span class="input-group-text text-body">
                <i class="fas fa-search" aria-hidden="true"></i>
            </span>
            <input type="text" class="form-control" placeholder="Nhập tìm kiếm..." />
        </div>
        <div class=" d-flex align-items-center justify-content-end gap-2">
            <div v-if="showBtnView" class="btn btn-custom p-1 border-1 btn-color" @click.stop="emits('toggle')">
                <img :src="isShowGrid ? GridIcon : ListIcon" width="20px">
            </div>
            <div v-if="showBtnAdd" class="btn btn-custom p-1 border-1 btn-color" @click.stop="emits('add')">
                <img :src="PlusIcon" width="20px"><span class="ms-2 fw-bold text-sm" v-if="titleAdd">{{ titleAdd
                }}</span>
            </div>
            <div v-if="showBtnExport" class="btn btn-custom p-1 border-1  btn-color" @click.stop="emits('export')">
                <img :src="ExportIcon" width="20px"><span class="ms-2 fw-bold text-sm " v-if="titleExport">{{
                    titleExport }}</span>
            </div>
            <slot name="btn" />
        </div>
    </div>
</template>
<style scoped>
.btn-color {
    color: #ee3672 !important;
    border: #ee3672 solid 2px !important;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0 !important;
}
</style>