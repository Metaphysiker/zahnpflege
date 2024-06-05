<template>
  <v-app>
    <v-app-bar app :elevation="2">
      <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>Hufpflege</v-app-bar-title>
    </v-app-bar>
    <v-main> <RouterView /></v-main>
  </v-app>
</template>

<script setup lang="ts">
//
</script>
