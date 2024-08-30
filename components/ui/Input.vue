<template>
  <input
    :type="type"
    :value="modelValue"
    @input="handleInput"
    :class="inputClass"
    v-bind="$attrs"
    v-on="$listeners"
    class="text-2xl p-4 bg-white/[0.08] rounded-[24px] border-transparent outline-none hover:bg-white/[0.24] focus:bg-white/[0.16] transition-colors duration-300 ease-in-out"
  />
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  inputClass: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const localValue = ref(props.modelValue);

const handleInput = (event) => {
  localValue.value = event.target.value;
  emit("update:modelValue", localValue.value);
};

watch(
  () => props.modelValue,
  (newVal) => {
    localValue.value = newVal;
  }
);
</script>