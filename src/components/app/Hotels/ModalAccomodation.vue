<template>
  <Button text size="small" severity="info" @click="visible = true">
    <HotelIcon class="size-4" />
  </Button>

  <Dialog
    v-model:visible="visible"
    modal
    :style="{ width: '70vw' }"
    pt:root:class="!border-0 !bg-transparent"
    pt:mask:class="backdrop-blur-sm"
  >
    <template #container>
      <div
        class="p-8 gap-y-2 flex flex-col rounded-xl"
        style="
          background-image: radial-gradient(
            circle at left top,
            var(--p-zinc-200),
            var(--p-zinc-400)
          );
        "
      >
        <div
          @click="visible = false"
          class="absolute cursor-pointer text-white -top-4 -right-4 w-auto p-2 rounded-full justify-end flex bg-red-400 hover:scale-75 hover:border-2 border-red-500"
        >
          <X />
        </div>
        <div class="flex justify-between w-full">
          <h1 class="font-bold text-blue-900 text-2xl">
            Habitaciones del hotel {{ hotel.name }}
          </h1>
          <p>
            {{ calculateTotalRooms() }} / {{ hotel.total_rooms }} Habitaciones Registradas
          </p>
        </div>
        <div class="grid grid-cols-4 gap-4">
          <div
            v-for="room in hotel.rooms"
            :key="room.id"
            class="bg-white rounded-xl py-2 px-2 flex flex-col gap-y-2 text-sm"
          >
            <div class="flex justify-center font-bold w-full mr-4 items-center">
              <h1 class="text-lg">{{ room.total_rooms }} Habitaciones</h1>
            </div>
            <div class="flex justify-between w-full items-center">
              <h1 class="text-xs font-semibold">
                {{ room.room_type }} - {{ room.accommodation }}
              </h1>
              <Button
                text
                label="Eliminar"
                @click="hotelService.deleteRoom(room.id)"
                severity="danger"
                size="small"
              ></Button>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-4 gap-2 mt-12 border p-2 rounded-lg bg-white">
          <IftaLabel>
            <InputNumber
              placeholder="Cuantas Habitaciones Son?"
              :min="1"
              id="total_rooms"
              :max="calculateTotalRoomsAvailable"
              v-model="accommodationForm.total_rooms"
            ></InputNumber>
            <label for="total_rooms">Habitaciones</label>
          </IftaLabel>
          <IftaLabel>
            <Select
              class="w-full"
              v-model="accommodationForm.room_type"
              placeholder="Selecione un tipo de habitación"
              :options="['ESTANDAR', 'JUNIOR', 'SUITE']"
            ></Select>
            <label for="">Tipo de Habitación</label>
          </IftaLabel>
          <IftaLabel>
            <Select
              class="w-full"
              placeholder="Seleccoinar Acomodación"
              v-model="accommodationForm.accommodation"
              :options="optionsAccommodation[accommodationForm.room_type]"
            ></Select>
            <label for="">Acomodación</label>
          </IftaLabel>
          <div class="flex justify-between items-center">
            <Button
              severity="success"
              label="Agregar"
              :disabled="accommodationForm.total_rooms == 0"
              @click="submit"
            >
            </Button>
          </div>
        </div>
      </div>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import type { Hotel } from "@/types";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import { computed, ref } from "vue";
import { Hotel as HotelIcon, Plus, X } from "lucide-vue-next";
import InputNumber from "primevue/inputnumber";
import HotelService from "@/services/Hotels";
import Select from "primevue/select";
import IftaLabel from "primevue/iftalabel";

const hotelService = new HotelService();

interface Props {
  hotel: Hotel;
}
const props = defineProps<Props>();

const accommodationForm = ref<{
  total_rooms: number;
  room_type: keyof typeof optionsAccommodation;
  accommodation: string;
}>({
  total_rooms: 0,
  room_type: "ESTANDAR",
  accommodation: "",
});

const submit = () => {
  hotelService.addRoom(props.hotel.id, {
    id: "", // Temporary ID that will be replaced by backend
    hotel_id: props.hotel.id,
    ...accommodationForm.value,
  });
};

const visible = ref(false);

const calculateTotalRooms = () => {
  let total = 0;
  props.hotel.rooms?.forEach((room) => {
    total += room.total_rooms;
  });
  return total;
};

const optionsAccommodation: Record<"ESTANDAR" | "JUNIOR" | "SUITE", string[]> = {
  ESTANDAR: ["SENCILLA", "DOBLE"],
  JUNIOR: ["TRIPLE", "CUADRUPLE"],
  SUITE: ["SENCILLA", "DOBLE", "TRIPLE"],
};

const calculateTotalRoomsAvailable = computed(() => {
  return props.hotel.total_rooms - calculateTotalRooms();
});
</script>
