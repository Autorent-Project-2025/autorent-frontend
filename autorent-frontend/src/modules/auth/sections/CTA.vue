<script setup lang="ts">
import { Icon } from "@iconify/vue";
import Button from "@/shared/ui/Button.vue";
</script>

<template>
  <section class="card m-[5%]">
    <div class="flex flex-col items-center gap-2 text-center">
      <h2>Начните прямо сейчас!</h2>
      <p>
        Бронируйте в один клик - скачайте приложение или зарегистрируйтесь на
        сайте
      </p>

      <div class="flex justify-center flex-wrap shrink-0 gap-4">
        <Button
          ><span class="flex gap-2 items-center"
            ><Icon icon="tabler:brand-appstore" class="text-3xl" />Загрузите в
            App Store</span
          ></Button
        >
        <Button
          ><span class="flex gap-2 items-center"
            ><Icon icon="tabler:brand-google-play" class="text-3xl" />Загрузите
            в App Store</span
          ></Button
        >
      </div>
      <span>или</span>
      <Button variant="outline">Зарегистрируйтесь на сайте</Button>
    </div>
  </section>
</template>
