<script setup>
import { useField } from 'vee-validate';
import { computed, watch } from 'vue';
const emit = defineEmits(['update:modelValue']);

const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: ''
    },
    size: {
        type: String,
        default: 'default'
    },
    icon: {
        type: String,
        default: ''
    },
    iconDir: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'text'
    },
    isRequired: {
        type: Boolean,
        default: false
    },
    apiError: { type: String, default: '' },
    disabled: {
        type: Boolean,
        default: false
    }
});

// Sử dụng useField để lấy value và errorMessage
const { value, errorMessage } = useField(props.name);
const displayError = computed(() => errorMessage.value || props.apiError);
const getIcon = (icon) => (icon ? icon : '');
const hasIcon = (icon) => (icon ? 'input-group' : '');
const getFontSize = computed(() => {
    switch (props.size) {
        case 'sm':
            return '14px';
        case 'lg':
            return '18px';
        default:
            return '16px';
    }
});
watch(
    () => props.modelValue,
    (newValue) => {
        if (value.value !== newValue) {
            value.value = newValue;
        }
    }
)
const onInput = (event) => {
    value.value = event.target.value;
    emit('update:modelValue', value.value);
}
</script>

<template>
    <div class="form-group">
        <div :class="hasIcon(icon)">
            <span v-if="iconDir === 'left'" class="input-group-text">
                <i :class="getIcon(icon)"></i>
            </span>
            <input :id="id" :type="type" class="form-control"
                :class="{ 'is-valid': !errorMessage && value, 'is-invalid': errorMessage }"
                :style="{ fontSize: getFontSize }" :name="name" :placeholder="placeholder" :required="isRequired"
                @input="onInput" :value="value" :disabled="disabled" />
            <span v-if="iconDir === 'right'" class="input-group-text">
                <i :class="getIcon(icon)"></i>
            </span>
            <div class="invalid-feedback">{{ displayError }}</div>
        </div>
    </div>
</template>
<style scoped>
.form-group {
    font-family: 'Lora' !important;
}
</style>