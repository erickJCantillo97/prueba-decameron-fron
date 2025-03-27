<template>
  <div class="sticky top-0 z-40 shadow-xl rounded-b-lg bg-white px-2">
    <div
      class="flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none"
    >
      <button
        type="button"
        class="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        @click="sidebarOpen = true"
      >
        <span class="sr-only">Open sidebar</span>
        <Bars3Icon class="size-6" aria-hidden="true" />
      </button>

      <!-- Separator -->
      <div class="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

      <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 items-center">
        <div
          class="size-full bg-white pl-8 text-lg text-gray-700 sm:text-sm/6 flex items-center"
        >
          <p>Hola bienvenido al portal de proveedores</p>
        </div>

        <div class="flex items-center gap-x-4 lg:gap-x-6">
          <!-- Separator -->
          <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />

          <!-- Profile dropdown -->
          <Menu as="div" class="relative">
            <MenuButton class="-m-1.5 flex items-center p-1.5">
              <span class="sr-only">Open user menu</span>

              <span class="hidden lg:flex lg:items-center">
                <span
                  class="text-sm/6 font-semibold text-gray-900 text-nowrap"
                  aria-hidden="true"
                  >{{ user?.name }}</span
                >
                <ChevronDownIcon class="ml-2 size-5 text-gray-400" aria-hidden="true" />
              </span>
            </MenuButton>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute divide-y divide-gray-200 right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
              >
                <MenuItem
                  v-for="item in userNavigation"
                  :key="item.name"
                  class="p-2 hover:bg-gray-100 text-sm"
                >
                  <button
                    @click="item.action"
                    class="cursor-pointer w-full text-left hover:bg-gray-50 outline-none"
                  >
                    {{ item.name }}
                  </button>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { Bars3Icon } from "@heroicons/vue/24/outline";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import { useAuthStore } from "@/stores/Auth";
import { storeToRefs } from "pinia";
import AuthService from "@/services/Auth";

const services = new AuthService();

const { user } = storeToRefs(useAuthStore());
const sidebarOpen = defineModel<boolean>({
  default: false,
});

const userNavigation = [
  { name: "Your profile", action: () => console.log("Your profile") },
  { name: "Sign out", action: () => services.logout() },
];
</script>
