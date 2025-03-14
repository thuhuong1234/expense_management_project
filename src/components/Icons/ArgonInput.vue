<script setup>
import { useField } from 'vee-validate';
const emit = defineEmits(['update:modelValue']);

const props = defineProps({
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
    oldValue: {
        type: String,
        default: ''
    }
});

// Sử dụng useField để lấy value và errorMessage
const { value, errorMessage } = useField(props.name);

const getIcon = (icon) => (icon ? icon : '');
const hasIcon = (icon) => (icon ? 'input-group' : '');
</script>

<template>
    <div class="form-group">
        <div :class="hasIcon(icon)">
            <span v-if="iconDir === 'left'" class="input-group-text">
                <i :class="getIcon(icon)"></i>
            </span>
            <input :id="id" :type="type" class="form-control"
                :class="{ 'is-valid': !errorMessage && value, 'is-invalid': errorMessage }" :name="name" v-model="value"
                :placeholder="placeholder" :required="isRequired" @input="emit('update:modelValue', value)" />
            <span v-if="iconDir === 'right'" class="input-group-text">
                <i :class="getIcon(icon)"></i>
            </span>
            <div class="invalid-feedback">{{ errorMessage }}</div>
        </div>
    </div>
</template>
