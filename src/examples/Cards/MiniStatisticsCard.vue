<script setup>
import { computed } from "vue";
const props = defineProps({
  rowReverse: {
    type: Boolean,
    default: false,
  },
  title: {
    type: [Object, String],
    required: true,
    text: {
      type: String,
    },
    color: {
      type: String,
    },
  },
  description: {
    type: String,
    default: "",
  },
  value: {
    type: [Object, String, Number],
    required: true,
    text: {
      type: [String, Number],
    },
    color: {
      type: String,
    },
  },
  percentage: {
    type: [Object, String],
    value: {
      type: String,
    },
    color: {
      type: String,
    },
    default: () => ({
      color: "success",
    }),
  },
  icon: {
    type: [String, Object],
    component: {
      type: String,
    },
    background: {
      type: String,
    },
    shape: {
      type: String,
    },
    default: () => ({
      background: "bg-white",
      shape: " border-radius-md",
    }),
  },
  classContent: {
    type: String,
    default: "",
  },
  unit: {
    type: String,
    default: "",
  },
});
const valueColor = computed(() => {
  if (typeof props.value === 'object' && props.value.color) return props.value.color;
  if (typeof props.value === 'number' && props.value > 0) return 'text-success';
  if (typeof props.value === 'number' && props.value < 0) return 'text-danger';
})
const formatCurrency = (val) => {
  if (typeof val === 'number') return val.toLocaleString('vi-VN')+' '+ props.unit;
  if (typeof val === 'string' && !isNaN(val)) return Number(val).toLocaleString('vi-VN') +' '+props.unit;
  return val;
};
</script>
<template>
  <div class="mb-3 card">
    <div class="p-3 card-body">
      <div class="d-flex" :class="rowReverse ? '' : 'flex-row-reverse justify-content-between'">
        <div class="text-center shadow icon icon-shape" :class="[
          typeof icon === 'object'
            ? `${icon.background} ${icon.shape}`
            : 'border-radius-md',
          rowReverse ? 'me-2' : '',
        ]">
          <i class="text-lg opacity-10" :class="typeof icon === 'string' ? icon : icon.component"
            aria-hidden="true"></i>
        </div>
        <div :class="classContent">
          <div class="numbers">
            <p class="mb-0 text-sm text-uppercase font-weight-bold" :class="title.color">
              {{ typeof title === "string" ? title : title.text }}
            </p>
            <h6 :class="`mb-0 font-weight-bolder ${valueColor}`">
              {{ formatCurrency(value && typeof value === 'object' ? value.text : value) }}
              <span v-if="percentage && typeof percentage === 'string'" class="text-sm font-weight-bolder">
                {{ percentage }}
              </span>
              <span v-if="percentage && typeof percentage === 'object'"
                :class="`text-sm font-weight-bolder text-${percentage.color}`">
                {{ percentage.value }}
              </span>
            </h6>
            <!--  eslint-disable-next-line vue/no-v-html -->
            <p v-if="description" class="mt-2 mb-0" v-html="description"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
