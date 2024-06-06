<script setup lang="ts">
import NewHorse from "./NewHorse.vue";
import HorsesTable from "./HorsesTable.vue";
import { HorseService } from "../../services/HorseService";
import type { AxiosStatic } from "axios";
import { Ref, inject, onMounted, ref } from "vue";
import { IHorse } from "../../shared/interfaces/IHorse";
import { HorseHelper } from "../../helpers/HorseHelper";
const horseHelper = new HorseHelper();
const axios: AxiosStatic | undefined = inject("axios");
const horseService = new HorseService(axios);
const horses: Ref<IHorse[]> = ref([]);
const reload = () => {
  horseService.findAll().then((response) => {
    horses.value = response;
  });
};

onMounted(() => {
  reload();
});

const horseBeschlagen = (horse: IHorse) => {
  horseHelper.beschlagen(horse);
  horseService.update(horse).then(() => {
    reload();
  });
};
</script>

<template>
  <v-container fluid>
    <HorsesTable
      :horses="horses"
      @clickOnBeschlagen="(horse) => horseBeschlagen(horse)"
    />
  </v-container>
  <v-container>
    <NewHorse @created="reload()"></NewHorse>
  </v-container>
</template>
