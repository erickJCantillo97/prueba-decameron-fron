<template>
  <div class="flex min-h-full flex-1">
    <div
      class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
    >
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <h2 class="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">
            Iniciar sesión
          </h2>
          <p class="mt-2 text-sm/6 text-gray-500">Bienvenido a Hotel Decameron</p>
        </div>

        <div class="mt-10">
          <div>
            <form @submit.prevent="submit" class="space-y-6">
              <div>
                <label for="email" class="block text-sm/6 font-medium text-gray-900"
                  >Correo electrónico</label
                >
                <div class="mt-2">
                  <input
                    v-model="form.email"
                    type="email"
                    name="email"
                    id="email"
                    autocomplete="email"
                    required
                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <label for="password" class="block text-sm/6 font-medium text-gray-900"
                  >Contraseña</label
                >
                <div class="mt-2">
                  <input
                    v-model="form.password"
                    type="password"
                    name="password"
                    id="password"
                    autocomplete="current-password"
                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex gap-3">
                  <div class="flex h-6 shrink-0 items-center">
                    <div class="group grid size-4 grid-cols-1">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        class="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                      />
                      <svg
                        class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          class="opacity-0 group-has-[:checked]:opacity-100"
                          d="M3 8L6 11L11 3.5"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          class="opacity-0 group-has-[:indeterminate]:opacity-100"
                          d="M3 7H11"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <label for="remember-me" class="block text-sm/6 text-gray-900"
                    >Remember me</label
                  >
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  text="Entrar"
                  :loading="loading"
                  severity="success"
                ></Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="relative hidden w-0 flex-1 lg:block">
      <img
        class="absolute inset-0 size-full object-cover"
        src="https://images.trvl-media.com/lodging/4000000/3470000/3462900/3462809/29e27c4c.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill"
        alt="Foto"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "@/components/ui/Button.vue";
import AuthService from "@/services/Auth/index";
import { ref } from "vue";
const services = new AuthService();

const loading = ref(false);

const form = ref({
  email: "",
  password: "",
});

async function submit() {
  loading.value = true;
  await services.login(form.value.email, form.value.password);
  loading.value = false;
}
</script>
