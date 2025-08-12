<template>
  <div class="max-w-4xl mx-auto p-8 text-center">
    <h1 class="text-4xl font-bold mb-8 text-gray-800">{{ msg }}</h1>
    <p class="text-lg text-gray-600 mb-12 leading-relaxed">
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a 
        href="https://cli.vuejs.org" 
        target="_blank" 
        rel="noopener"
        class="text-blue-600 hover:text-blue-800 underline transition-colors duration-300"
      >
        vue-cli documentation
      </a>.
    </p>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <h3 class="text-xl font-semibold mb-4 text-gray-800">Installed CLI Plugins</h3>
        <ul class="space-y-2">
          <li>
            <a 
              href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" 
              target="_blank" 
              rel="noopener"
              class="text-emerald-600 hover:text-emerald-800 transition-colors duration-300"
            >
              babel
            </a>
          </li>
          <li>
            <a 
              href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" 
              target="_blank" 
              rel="noopener"
              class="text-emerald-600 hover:text-emerald-800 transition-colors duration-300"
            >
              eslint
            </a>
          </li>
        </ul>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <h3 class="text-xl font-semibold mb-4 text-gray-800">Essential Links</h3>
        <ul class="space-y-2">
          <li>
            <a 
              href="https://vuejs.org" 
              target="_blank" 
              rel="noopener"
              class="text-emerald-600 hover:text-emerald-800 transition-colors duration-300"
            >
              Core Docs
            </a>
          </li>
          <li>
            <a 
              href="https://forum.vuejs.org" 
              target="_blank" 
              rel="noopener"
              class="text-emerald-600 hover:text-emerald-800 transition-colors duration-300"
            >
              Forum
            </a>
          </li>
          <li>
            <a 
              href="https://chat.vuejs.org" 
              target="_blank" 
              rel="noopener"
              class="text-emerald-600 hover:text-emerald-800 transition-colors duration-300"
            >
              Community Chat
            </a>
          </li>
          <li>
            <a 
              href="https://twitter.com/vuejs" 
              target="_blank" 
              rel="noopener"
              class="text-emerald-600 hover:text-emerald-800 transition-colors duration-300"
            >
              Twitter
            </a>
          </li>
          <li>
            <a 
              href="https://news.vuejs.org" 
              target="_blank" 
              rel="noopener"
              class="text-emerald-600 hover:text-emerald-800 transition-colors duration-300"
            >
              News
            </a>
          </li>
        </ul>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <h3 class="text-xl font-semibold mb-4 text-gray-800">Ecosystem</h3>
        <ul class="space-y-2">
          <li>
            <a 
              href="https://router.vuejs.org" 
              target="_blank" 
              rel="noopener"
              class="text-emerald-600 hover:text-emerald-800 transition-colors duration-300"
            >
              vue-router
            </a>
          </li>
          <li>
            <a 
              href="https://vuex.vuejs.org" 
              target="_blank" 
              rel="noopener"
              class="text-emerald-600 hover:text-emerald-800 transition-colors duration-300"
            >
              vuex
            </a>
          </li>
          <li>
            <a 
              href="https://github.com/vuejs/vue-devtools#vue-devtools" 
              target="_blank" 
              rel="noopener"
              class="text-emerald-600 hover:text-emerald-800 transition-colors duration-300"
            >
              vue-devtools
            </a>
          </li>
          <li>
            <a 
              href="https://vue-loader.vuejs.org" 
              target="_blank" 
              rel="noopener"
              class="text-emerald-600 hover:text-emerald-800 transition-colors duration-300"
            >
              vue-loader
            </a>
          </li>
          <li>
            <a 
              href="https://github.com/vuejs/awesome-vue" 
              target="_blank" 
              rel="noopener"
              class="text-emerald-600 hover:text-emerald-800 transition-colors duration-300"
            >
              awesome-vue
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>
