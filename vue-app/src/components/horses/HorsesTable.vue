<script setup lang="ts">
import { Ref, inject, onMounted, ref } from "vue";
import type { IHorse } from "../../shared/interfaces/IHorse";
import { DateFormatter } from "../../helpers/DateFormatter";
import { UrgencyHelper } from "../../helpers/UrgencyHelper";
const urgencyHelper = new UrgencyHelper();
const dateFormatter = new DateFormatter();
const availableTableDataHeaders = ref([
  { key: "name", title: "Name", selected: true },
  { key: "lastTimeBeschlagen", title: "Letzer Beschlag", selected: true },
  { key: "nextTimeBeschlagen", title: "nächstes Mal", selected: true },
  {
    key: "numberOfWeeksUntilNextBeschlagen",
    title: "Hufpflegerhythmus in Wochen",
    selected: true,
  },
  { key: "action", title: "Aktion", selected: true },
]);

const isSpecialColumn = (header: string) => {
  return ["lastTimeBeschlagen", "nextTimeBeschlagen", "action"].includes(
    header
  );
};

const props = defineProps({
  horses: {
    required: true,
    type: Object as () => IHorse[],
  },
});

const clickOnBeschlagen = (horse: IHorse) => {
  emit("clickOnBeschlagen", horse);
};

const clickOnDelete = (horse: IHorse) => {
  emit("clickOnDelete", horse);
};

const clickOnEdit = (horse: IHorse) => {
  emit("clickOnEdit", horse);
};

const emit = defineEmits(["clickOnBeschlagen", "clickOnDelete", "clickOnEdit"]);
</script>

<template>
  <v-data-table
    :headers="availableTableDataHeaders.filter((h) => h.selected)"
    :items="horses"
    hide-default-footer
    :items-per-page="100"
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
              <div
                class="rounded pa-1 text-center"
                :class="urgencyHelper.getClassForUrgency(row.item)"
              >
                {{
                  dateFormatter.dddotmmdotyyyy(row.item["nextTimeBeschlagen"])
                }}
              </div>
            </template>
          </div>
          <template v-if="header.key === 'action'">
            <div class="d-flex">
              <v-btn
                color="primary"
                class="me-2"
                @click="clickOnBeschlagen(row.item)"
                >Beschlagen</v-btn
              >
              <v-btn color="green" class="me-2" @click="clickOnEdit(row.item)"
                ><v-icon> mdi-pencil </v-icon></v-btn
              >

              <v-btn color="red" @click="clickOnDelete(row.item)"
                ><v-icon> mdi-close-circle-outline </v-icon></v-btn
              >
            </div>
          </template>
        </td>
      </tr>
    </template></v-data-table
  >
</template>
