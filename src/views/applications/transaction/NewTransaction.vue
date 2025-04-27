<script setup>
import { onMounted } from "vue";
import flatPickr from "vue-flatpickr-component";
import Choices from "choices.js";
import ArgonInput from "@/components/Icons/ArgonInput.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
const date = "";
const config = {
    allowInput: true,
};
onMounted(() => {
    if (document.getElementById("choices-multiple-remove-button")) {
        var element = document.getElementById("choices-multiple-remove-button");
        const example = new Choices(element, {
            removeItemButton: true,
            allowHTML: true,
        });
        example.setChoices(
            [
                {
                    value: "One",
                    label: "Label One",
                    disabled: true,
                },
                {
                    value: "Two",
                    label: "Label Two",
                    selected: true,
                },
                {
                    value: "Three",
                    label: "Label Three",
                },
            ],
            "value",
            "label",
            false
        );
    }
});
</script>
<template>
    <DashboardLayout>
        <div class="py-4 container-fluid">
            <div class="row">
                <div class="mx-auto col-lg-10 col-12">
                    <div class="mt-4 card card-body">
                        <h6 class="mb-0 font-weight-bolder text-dark">Ghi chú mới</h6>
                        <p class="mb-4 text-sm">Thông tin chi tiết</p>
                        <div class="d-flex align-items-center">
                            <label for="amount" class="w-20 form-label text-sm">Số tiền</label>
                            <argon-input id="amount" class="w-80 text-sm" name="amount" type="number"
                                placeholder="Amount" value="0" />
                        </div>
                        <hr class="my-0 dark" />
                        <div class="d-flex align-items-center">
                            <label for="amount" class="w-20 form-label text-sm"> Mô tả</label>
                            <argon-input id="description" class="w-80 text-sm" name="description" type="text"
                                placeholder="Mô tả..." />
                        </div>
                        <hr class="my-0 dark" />
                        <div class="d-flex align-items-center">
                            <label for="amount" class="w-20 form-label text-sm"> Ngày chi</label>
                            <flat-pickr v-model="date" class="mb-3 w-80 form-control datetimepicker text-sm"
                                placeholder="Ngày chi" :config="config"></flat-pickr>
                        </div>
                        <div class="p-2">
                            <ul class="nav nav-tabs nav-fill" id="myTab" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link active font-weight-bold text-sm" id="expense-tab"
                                        data-bs-toggle="tab" data-bs-target="#expense-tab-pane" type="button" role="tab"
                                        aria-controls="expense-tab-pane" aria-selected="true">Người sử dụng</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link font-weight-bold text-sm" id="income-tab"
                                        data-bs-toggle="tab" data-bs-target="#income-tab-pane" type="button" role="tab"
                                        aria-controls="income-tab-pane" aria-selected="false">Danh mục</button>
                                </li>
                            </ul>
                            <div class="tab-content" id="myTabContent">
                                <div class="tab-pane fade show active" id="expense-tab-pane" role="tabpanel"
                                    aria-labelledby="expense-tab" tabindex="0">
                                    <select id="choices-multiple-remove-button" class="form-control"
                                        name="choices-multiple-remove-button" multiple>
                                        <option value="Choice 1" selected>Choice 1</option>
                                        <option value="Choice 2">Choice 2</option>
                                        <option value="Choice 3">Choice 3</option>
                                        <option value="Choice 4">Choice 4</option>
                                    </select>
                                </div>
                                <div class="tab-pane fade" id="income-tab-pane" role="tabpanel"
                                    aria-labelledby="income-tab" tabindex="0">
                                    Danh sách danh mục
                                    <!-- <category :categories="categories" type="Income" /> -->
                                </div>
                            </div>
                        </div>

                        <div class="mt-4 d-flex justify-content-end">
                            <button type="button" name="button" class="m-0 btn btn-light">
                                Hủy
                            </button>
                            <button type="button" name="button" class="m-0 btn bg-gradient-success ms-2">
                                Lưu
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </DashboardLayout>

</template>
<style scss scoped>
::v-deep(input.form-control) {
    border: none !important;
}

::v-deep .nav-tabs {
    .nav-item {
        .nav-link {
            border: none !important;
            color: #6d7992 !important;

            &.active {
                border: none !important;
                border-bottom: 2px solid blue !important;
                color: #344767 !important;
            }
        }
    }

}
</style>