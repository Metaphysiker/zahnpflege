<script setup lang="ts">
import { Ref, onMounted, ref } from "vue";
import type { IHorse } from "../../shared/interfaces/IHorse";
import { Horse } from "../../shared/classes/Horse";
import { DateFormatter } from "../../helpers/DateFormatter";
import { DateHelper } from "../../helpers/DateHelper";
const dateHelper = new DateHelper();
const horses: Ref<IHorse[]> = ref([]);
const dateFormatter = new DateFormatter();
const availableTableDataHeaders = ref([
  { key: "name", title: "Name", selected: true },
  { key: "lastTimeBeschlagen", title: "Letzer Beschlag", selected: true },
  { key: "nextTimeBeschlagen", title: "nächstes Mal", selected: true },
  { key: "action", title: "Aktion", selected: true },
]);

const calculateNextBeschlag = (horse: IHorse) => {
  const nextTimeBeschlag = dateHelper.addDays(
    horse.lastTimeBeschlagen,
    horse.numberOfWeeksUntilNextBeschlag * 7
  );
  return nextTimeBeschlag;
};

const isSpecialColumn = (header: string) => {
  return ["lastTimeBeschlagen", "action"].includes(header);
};

onMounted(() => {
  const horse1 = new Horse();
  horse1.name = "Horse 1";
  horse1.lastTimeBeschlagen = new Date();
  horse1.numberOfWeeksUntilNextBeschlag = 1;
  const horse2 = new Horse();
  const horse3 = new Horse();
  horses.value = [horse1, horse2, horse3];
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
          </div>
          <div v-if="row.item && !row.item.hasOwnProperty(header.key)">
            <template v-if="header.key === 'nextTimeBeschlagen'">
              {{
                dateFormatter.dddotmmdotyyyy(calculateNextBeschlag(row.item))
              }}
            </template>
          </div>
        </td>
      </tr>
    </template></v-data-table
  >
</template>
