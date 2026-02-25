<script setup lang="ts">
import Input from '@/shared/ui/Input.vue';
import ToggleButton from '@/shared/ui/ToggleButton.vue';
import UserMenu from '@/modules/partner/components/UserMenu.vue';

</script>

<template>
  <header
    class="flex items-center justify-between px-8 py-4 bg-bg shadow-(--shadow-s)"
  >
  <Input placeholder="Поиск" type="text" icon="tabler:search" />

   <div class="flex items-center gap-5">
     <ToggleButton />
     <UserMenu :user="{ name: 'Alan', role: 'Partner', avatar: './images/user.jpeg'}" />
   </div>
  </header>
</template>


