<script setup lang="ts">
import { Ref, ref, watch } from "vue";
import { IHorse } from "../../shared/interfaces/IHorse";
import DateSelecter from "../dates/DateSelecter.vue";
import { Horse } from "../../shared/classes/Horse";
const horseClass = new Horse();

const horseToBeEdited = defineModel({
  required: true,
  type: Object as () => IHorse,
});
</script>
<template>
  <v-text-field
    label="Name"
    v-model="horseToBeEdited.name"
    variant="underlined"
  ></v-text-field>
  <DateSelecter
    label="Letzter Beschlag"
    v-model="horseToBeEdited.lastTimeBeschlagen"
  />
  <v-text-field
    label="Wochen bis nächster Beschlag"
    v-model="horseToBeEdited.numberOfWeeksUntilNextBeschlagen"
    variant="underlined"
    type="number"
  ></v-text-field>
</template>
