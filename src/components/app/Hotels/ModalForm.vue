<template>
  <Button @click="visible = true" text>
    <slot />
  </Button>

  <Dialog
    v-model:visible="visible"
    modal
    :style="{ width: '50vw' }"
    pt:root:class="!border-0 !bg-transparent"
    pt:mask:class="backdrop-blur-sm"
  >
    <template #container>
      <div
        class="p-8 gap-y-2 flex flex-col rounded-xl"
        style="
          background-image: radial-gradient(
            circle at left top,
            var(--p-blue-200),
            var(--p-blue-400)
          );
        "
      >
        <h1 class="text-center font-bold text-blue-900 text-2xl">
          {{ `${hotel ? "Editar " : "Crear "} Hotel` }}
        </h1>
        <div class="flex flex-col">
          <label for="name" class="font-semibold">Nombre del Hotel</label>
          <InputText
            id="name"
            v-model="hotelForm.name"
            class="flex-auto"
            autocomplete="off"
          />
        </div>
        <div class="flex flex-col">
          <label for="location" class="font-semibold">Dirección</label>
          <InputText
            id="location"
            class="flex-auto"
            v-model="hotelForm.location"
            autocomplete="off"
          />
        </div>
        <div class="flex flex-col">
          <label for="city" class="font-semibold">Ciudad</label>
          <InputText
            id="city"
            class="flex-auto"
            v-model="hotelForm.city"
            autocomplete="off"
          />
        </div>
        <div class="flex flex-col">
          <label for="nit" class="font-semibold">Nit</label>
          <InputText
            id="nit"
            class="flex-auto"
            v-model="hotelForm.nit"
            autocomplete="off"
          />
        </div>
        <div class="flex flex-col">
          <label for="total_rooms" class="font-semibold">Total de Habitaciones</label>
          <InputNumber
            id="total_rooms"
            class="flex-auto"
            v-model="hotelForm.total_rooms"
            autocomplete="off"
          />
        </div>
        <div class="flex justify-end gap-2">
          <Button
            type="button"
            label="Cancel"
            severity="secondary"
            @click="visible = false"
          ></Button>
          <Button type="button" label="Guardar" @click="submit"></Button>
        </div>
      </div>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import type { Hotel } from "@/types";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import { ref } from "vue";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import HotelService from "@/services/Hotels";

const hotelService = new HotelService();

interface Props {
  hotel?: Hotel;
}
const props = defineProps<Props>();

const hotelForm = ref({
  id: props.hotel?.id || "",
  name: props.hotel?.name || "",
  location: props.hotel?.location || "",
  city: props.hotel?.city || "",
  nit: props.hotel?.nit || "",
  total_rooms: props.hotel?.total_rooms || 1,
});

const submit = async () => {
  if (props.hotel) {
    if (await hotelService.update(hotelForm.value)) {
      visible.value = false;
    }
    return;
  }

  if (await hotelService.create(hotelForm.value)) {
    visible.value = false;
  }
};

const visible = ref(false);
</script>
