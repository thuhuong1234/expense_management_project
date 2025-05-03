<script setup>
import { ref, onMounted } from 'vue'
import AutoNumeric from 'autonumeric'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    modelValue: {
        type: Number,
        default: 0
    }
})

const inputRef = ref(null)
let anInstance

onMounted(() => {
    anInstance = new AutoNumeric(inputRef.value, props.modelValue, {
        digitGroupSeparator: '.',
        decimalCharacter: ',',
        decimalPlaces: 0,
        modifyValueOnWheel: false,
        minimumValue: '0',
    })

    inputRef.value.addEventListener('input', () => {
        emit('update:modelValue', anInstance.getNumber())
    })
})
</script>

<template>
    <input ref="inputRef" type="text" class="form-control" />
</template>
