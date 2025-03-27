<template>
  <button
    class="w-full p-2 rounded-md text-white"
    :class="[
      color[severity],
      disabled || loading ? 'cursor-not-allowed opacity-70' : 'cursor-pointer',
    ]"
    :disabled="disabled || loading"
  >
    <div class="flex justify-center items-center font-bold gap-x-2">
      <div v-if="loading" class="animate-spin">
        <Loader />
      </div>
      <slot v-else />
      <span v-if="text">
        {{ text }}
      </span>
    </div>
  </button>
</template>
<script setup lang="ts">
import { Loader } from "lucide-vue-next";
defineProps({
  text: String,
  severity: {
    type: String as () => keyof typeof color,
    default: "primary",
  },
  disabled: Boolean,
  loading: Boolean,
});

const color = {
  primary: "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600",
  secondary: "bg-gray-600 hover:bg-gray-500 focus-visible:outline-gray-600",
  success: "bg-green-600 hover:bg-green-500 focus-visible:outline-green-600",
  danger: "bg-red-600 hover:bg-red-500 focus-visible:outline-red-600",
  warning: "bg-yellow-600 hover:bg-yellow-500 focus-visible:outline-yellow-600",
  info: "bg-blue-600 hover:bg-blue-500 focus-visible:outline-blue-600",
  light: "bg-gray-300 hover:bg-gray-200 focus-visible:outline-gray-300",
  dark: "bg-gray-800 hover:bg-gray-700 focus-visible:outline-gray-800",
};
</script>
