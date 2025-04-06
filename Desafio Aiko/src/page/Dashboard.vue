<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import Map from '../components/Map.vue'
  import Subtitle from '../components/Subtitle.vue'
  import dataEquipmentModel from '../../../data/equipmentModel.json'
  import dataEquipmentState from '../../../data/equipmentState.json'
  import { formatData } from '../service/formatData'
  import type { Equipment, MultiSelect } from '../interface/Imap'

  const equipment = ref<Equipment[]>(formatData())
  const dataStateOption = ref<MultiSelect[]>(
    dataEquipmentState.map((s) => {
      return {
        id: s.id,
        name: s.name,
      }
    }),
  )
  const dataModelOption = ref<MultiSelect[]>(
    dataEquipmentModel.map((m) => {
      return {
        id: m.id,
        name: m.name,
      }
    }),
  )
  const dataState = ref<MultiSelect[]>([])
  const dataStateModel = ref<MultiSelect[]>([])
  const valueSearch = ref<string>('')
  onMounted(() => {
    console.log(formatData())
  })
</script>

<template>
  <section class="container-main">
    <section class="container-filters">
      <section>
        <MultiSelect
          v-model="dataState"
          :options="dataStateOption"
          optionLabel="name"
          class="multiselect"
          placeholder="Selecione os estados"
          :maxSelectedLabels="2"
        />
      </section>
      <section>
        <MultiSelect
          v-model="dataStateModel"
          :options="dataModelOption"
          optionLabel="name"
          class="multiselect"
          placeholder="Selecione os modelos"
          :maxSelectedLabels="2"
        />
      </section>
      <section class="search-wrapper">
        <InputText
          type="text"
          placeholder="Pesquisar..."
          v-model="valueSearch"
          class="search-input"
        />
        <i class="pi pi-search search-icon"></i>
      </section>
    </section>
    <section style="display: flex; width: 60%; flex-direction: column">
      <Map :maps="equipment" :positionCenter="equipment[0]" />
      <Subtitle />
    </section>
  </section>
</template>
