<script setup lang="ts">
import { Ref, inject, onMounted, ref } from "vue";
import type { IHorse } from "../../shared/interfaces/IHorse";
import { DateFormatter } from "../../helpers/DateFormatter";
import { HorseService } from "../../services/HorseService";
import type { AxiosStatic } from "axios";
const axios: AxiosStatic | undefined = inject("axios");
const horseService = new HorseService(axios);
const horses: Ref<IHorse[]> = ref([]);
const dateFormatter = new DateFormatter();
const availableTableDataHeaders = ref([
  { key: "name", title: "Name", selected: true },
  { key: "lastTimeBeschlagen", title: "Letzer Beschlag", selected: true },
  { key: "nextTimeBeschlagen", title: "nächstes Mal", selected: true },
  {
    key: "numberOfWeeksUntilNextBeschlag",
    title: "Wochen bis nächster Beschlag",
    selected: true,
  },
  { key: "action", title: "Aktion", selected: true },
]);

const isSpecialColumn = (header: string) => {
  return ["lastTimeBeschlagen", "nextTimeBeschlagen", "action"].includes(
    header
  );
};

onMounted(() => {
  horseService.findAll().then((data) => {
    horses.value = data;
  });
});
</script>

<template>
  <v-data-table
    :headers="availableTableDataHeaders.filter((h) => h.selected)"
    :items="horses"
  >
    <template v-slot:item="row">
      <tr>
        <td
          v-for="header in availableTableDataHeaders.filter((h) => h.selected)"
          :key="header.key"
        >
          <div v-if="row.item && row.item.hasOwnProperty(header.key)">
            <template v-if="!isSpecialColumn(header.key)">
              {{ row.item[header.key as keyof IHorse] }}
            </template>
            <template v-if="header.key === 'lastTimeBeschlagen'">
              {{ dateFormatter.dddotmmdotyyyy(row.item["lastTimeBeschlagen"]) }}
            </template>
            <template v-if="header.key === 'nextTimeBeschlagen'">
              {{ dateFormatter.dddotmmdotyyyy(row.item["nextTimeBeschlagen"]) }}
            </template>
          </div>
        </td>
      </tr>
    </template></v-data-table
  >
</template>
