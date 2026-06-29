<script setup lang="ts">
import ErrorText from '@/modules/dashboard/components/ErrorText.vue';

const props = defineProps<{ 
    label?: string,
    placeholder?: string,
    validate?: (value?: string) => string 
}>();

const value = defineModel<string>('value', {
    default: ''
});

const error = defineModel<string>('error', {
    default: ''
});

const handleChange = () => {
    error.value = '';

    if(props.validate) {
        error.value = props.validate(value.value);
    }
}
</script>

<template>
    <div class="flex flex-col gap-2">
        <label v-if="label">{{ label }}</label>
        <input 
            v-model="value" 
            @change="handleChange" 
            :placeholder="placeholder"  
            class="px-4 py-2 outline-none rounded-lg border"
        />
        <ErrorText v-if="error">{{ error }}</ErrorText>
    </div>
</template>