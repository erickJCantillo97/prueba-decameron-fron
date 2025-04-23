<template>
  <div>
    <!-- <IndexMenu v-model="sidebarOpen"></IndexMenu> -->

    <div class="px-2 mx-2">
      <Index v-model="sidebarOpen"></Index>
      <main class="py-10">
        <div class="px-4 lg:px-2">
          <!-- Your content -->
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import IndexMenu from "@/components/app/Sections/Menu/IndexMenu.vue";
import Index from "@/components/app/Sections/NavBar/Index.vue";

const sidebarOpen = ref(false);
</script>
