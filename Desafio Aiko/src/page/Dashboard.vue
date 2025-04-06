<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import Map from '../components/Map.vue'
  // import dataEquipment from '../../../data/equipment.json'
  // import dataEquipmentModel from '../../../data/equipmentModel.json'
  // import dataEquipmentState from '../../../data/equipmentState.json'
  // import dataEquipmentStateHistory from '../../../data/equipmentStateHistory.json'
  import { formatData } from '../service/formatData'
  import type {
    Equipment,
    // Equipment,
    // EquipamentModel,
    // EquipmentState,
    // EquipmentStateHistory,
  } from '../interface/Imap'

  const equipment = ref<Equipment[]>(formatData())
  // const equipment = ref<Equipment[]>(dataEquipment)
  // const equipmentModel = ref<EquipamentModel[]>(dataEquipmentModel)
  // const equipmentState = ref<EquipmentState[]>(dataEquipmentState)
  // const equipmentStateHistor = ref<EquipmentStateHistory[]>(
  //   dataEquipmentStateHistory,
  // )
  onMounted(() => {
    console.log(formatData())
  })
</script>

<template>
  <Map :maps="equipment" :positionCenter="equipment[0]" />
</template>
