<template>
  <MiniMenu :navigation="navigation" v-model="sidebarOpen" />
  <LargeMenu :navigation="navigation" />
</template>
<script setup lang="ts">
import LargeMenu from "./LargeMenu.vue";
import MiniMenu from "./MiniMenu.vue";
import { House } from "lucide-vue-next";
// import { HomeIcon } from "@heroicons/vue/24/outline";
// import { ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/vue/20/solid";

interface navigationItem {
  name: string;
  href: string;
  icon: unknown;
  current: boolean;
}

const sidebarOpen = defineModel<boolean>({
  default: false,
});

const navigation: navigationItem[] = [
  {
    name: "Inicio",
    href: "/",
    icon: House,
    current: true,
  },
];
</script>
