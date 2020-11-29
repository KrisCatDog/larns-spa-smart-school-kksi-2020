<template>
  <nav
    id="nav"
    class="flex justify-between items-center px-6 sm:px-16 py-8 z-50"
  >
    <img src="./../assets/logo.svg" alt="larns logo" class="w-20" />

    <div class="-mr-6">
      <router-link
        :to="{ name: 'Home' }"
        class="inline-block text-black-300 font-semibold px-6"
      >
        <span class="inline-block pb-1 text-sm 2xl:text-lg">Home</span>
      </router-link>
      <router-link
        :to="{ name: 'Signin' }"
        class="inline-block text-black-300 font-semibold px-6"
      >
        <span class="inline-block pb-1 text-sm 2xl:text-lg">Sign In</span>
      </router-link>
      <router-link
        :to="{ name: 'Signup' }"
        class="inline-block text-black-300 font-semibold px-6"
      >
        <span class="inline-block pb-1 text-sm 2xl:text-lg">Sign Up</span>
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "GuestNav",
};
</script>

<style scoped>
#nav a.router-link-exact-active span {
  @apply border-b-2 border-red-500;
}
</style>