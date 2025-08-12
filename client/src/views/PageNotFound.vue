<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 class="text-6xl font-bold text-red-500 mb-4">404</h1>
    <h2 class="text-2xl font-semibold mb-2">Page Not Found</h2>
    <p class="text-gray-600 mb-6">Sorry, the page you are looking for does not exist.</p>
    <router-link to="/" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Go Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'PageNotFound'
}
</script>