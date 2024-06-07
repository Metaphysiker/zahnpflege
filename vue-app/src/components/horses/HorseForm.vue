<script setup lang="ts">
import { Ref, ref, watch } from "vue";
import { IHorse } from "../../shared/interfaces/IHorse";
import DateSelecter from "../dates/DateSelecter.vue";
import { Horse } from "../../shared/classes/Horse";
import { HorseHelper } from "../../helpers/HorseHelper";
import { DateFormatter } from "../../helpers/DateFormatter";
const dateFormatter = new DateFormatter();
const horseHelper = new HorseHelper();
const horseToBeEdited = defineModel({
  required: true,
  type: Object as () => IHorse,
});
const numberOfWeeksUntilNextBeschlagenChanged = () => {
  if (horseToBeEdited.value) {
    horseHelper.calculateAndSetNextTimeBeschlagen(horseToBeEdited.value);
  }
};
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
    label="Hufpflegerhythmus in Wochen"
    v-model="horseToBeEdited.numberOfWeeksUntilNextBeschlagen"
    variant="underlined"
    type="number"
    :change="numberOfWeeksUntilNextBeschlagenChanged()"
  ></v-text-field>
  <div class="my-2">
    Nächstex Mal beschlagen am:
    {{ dateFormatter.dddotmmdotyyyy(horseToBeEdited.nextTimeBeschlagen) }}
  </div>
</template>
