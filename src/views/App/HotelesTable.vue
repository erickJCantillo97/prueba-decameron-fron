<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold text-gray-900">Hoteles</h1>
        <p class="mt-2 text-sm text-gray-700">Listado de Hoteles</p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex items-center gap-x-2">
        <input
          type="date"
          class="rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
        <Button class="text-xs" severity="secondary" text="pdf">
          <FileDown class="w-4 h-4" />
        </Button>
      </div>
    </div>
    <div class="-mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
      <table class="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
            >
              Nombre
            </th>
            <th
              class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
            >
              Dirección
            </th>
            <th
              class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
            >
              Ciudad
            </th>
            <th
              class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
            >
              NIT
            </th>
            <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Habitaciones
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="hotel in hotels" :key="hotel.id">
            <td>
              <div class="text-gray-900 py-2 text-sm px-3">
                {{ hotel.name }}
              </div>
            </td>
            <td class="text-gray-900 py-2 text-sm px-3">
              {{ hotel.location }}
            </td>
            <td class="text-gray-900 py-2 text-sm px-3">
              {{ hotel.city }}
            </td>
            <td class="text-gray-900 py-2 text-sm px-3">
              {{ hotel.nit }}
            </td>
            <td class="text-gray-900 py-2 text-sm px-3">
              <div>{{ hotel.total_rooms }}</div>
            </td>
            <td class="text-gray-900 py-2 text-sm px-3 flex">
              <Button severity="transparent" class="">
                <Hotel class="text-primary size-4"></Hotel>
              </Button>
              <Button severity="transparent" class="">
                <Pencil class="text-blue-600 size-4"></Pencil>
              </Button>
              <Button
                severity="transparent"
                class=""
                @click="hotelService.delete(hotel.id)"
              >
                <Trash2 class="text-red-600 size-4"></Trash2>
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/ui/Button.vue";
import { FileDown, Hotel, Pencil, Trash2 } from "lucide-vue-next";
import HotelService from "@/services/Hotels";
import { onMounted } from "vue";
import { useHotelsStore } from "@/stores/Hotels";
import { storeToRefs } from "pinia";

const hotelStore = useHotelsStore();
const hotelService = new HotelService();

const { hotels } = storeToRefs(hotelStore);

onMounted(() => {
  hotelService.get();
});
</script>
