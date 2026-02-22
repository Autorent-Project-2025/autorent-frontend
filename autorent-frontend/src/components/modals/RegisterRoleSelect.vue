<script setup lang="ts">
import { ref, computed } from "vue";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import Button from "../ui/Button.vue";

type UserRole = "client" | "partner";
const router = useRouter();
const selectedRole = ref<UserRole | null>(null);

const select = (role: UserRole) => {
    selectedRole.value = role;
};

const next = () => {
    if (!selectedRole.value) {
      return;   
    }
    router.push({ name:selectedRole.value === "client" ? "register-client" : "register-partner" });
};

const roles: {
  icon: string;
  title: string;
  description: string;
  role: UserRole;
}[] = [
  {
    icon: "tabler:users",
    title: "Клиент",
    description: "Бронируйте авто за минуту",
    role: "client",
  },
  {
    icon: "tabler:building-community",
    title: "Партнёр",
    description: "Добавляйте авто и управляйте доходом",
    role: "partner",
  },
];
</script>

<template>
  <div class="flex flex-col gap-6">
    <div
      v-for="role in roles"
      :key="role.role"
      @click="select(role.role)"
      class="border-2 flex items-center gap-4 card bg-bg-light transition-all duration-200 cursor-pointer"
      :class="{ 'border-blue-500 bg-blue-500/20 scale-102': selectedRole === role.role }"
    >
      <Icon
        :icon="role.icon"
        class="w-16 h-16 p-3 border-3 border-blue-500 rounded-xl text-blue-500 transition-all duration-200"
        :class="{ 'bg-blue-500 shadow-(--shadow-s) text-white': selectedRole === role.role }"
      />
      <span>
        <h3>{{ role.title }}</h3>
        <p>{{ role.description }}</p>
      </span>
    </div>
  </div>

  <Button :disabled="!selectedRole" @click="next">Далее</Button>
</template>
