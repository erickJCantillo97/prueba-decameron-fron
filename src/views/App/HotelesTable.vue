<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center">
      <div class="">
        <h1 class="text-base font-semibold text-gray-900">Hoteles</h1>
        <div class="flex gap-x-4">
          <p class="mt-2 text-xs text-gray-700 p-2 bg-gray-100 rounded-lg">
            {{ hotels.length }} Hoteles Registrados
          </p>
          <p class="mt-2 text-xs text-gray-700 p-2 bg-gray-100 rounded-lg">
            {{ hotels.reduce((acc, hotel) => acc + hotel.total_rooms, 0) }} Habitaciones
            en Total
          </p>
        </div>
      </div>

      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex items-center gap-x-2">
        <Modal> Nuevo Hotel </Modal>
      </div>
    </div>

    <div class="-mx-4 mt-6 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
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
          <tr v-if="hotels.length === 0">
            <td class="px-2" v-for="i in 5" :key="i">
              <Skeleton height="1rem" class="m-2"></Skeleton>
            </td>
          </tr>
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
              <ModalAccomodation :hotel="hotel"></ModalAccomodation>
              <Modal :hotel="hotel">
                <Pencil class="size-4"></Pencil>
              </Modal>

              <Button
                text
                severity="danger"
                size="small"
                @click="hotelService.delete(hotel.id)"
              >
                <Trash2 class="size-4"></Trash2>
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Pencil, Trash2 } from "lucide-vue-next";
import HotelService from "@/services/Hotels";
import { onMounted } from "vue";
import { useHotelsStore } from "@/stores/hotels";
import { storeToRefs } from "pinia";
import Button from "primevue/button";
import Modal from "@/components/app/Hotels/ModalForm.vue";
import ModalAccomodation from "../../components/app/Hotels/ModalAccomodation.vue";
import Skeleton from "primevue/skeleton";

const hotelStore = useHotelsStore();
const hotelService = new HotelService();

const { hotels } = storeToRefs(hotelStore);

onMounted(async () => {
  await hotelService.get();
});
</script>
