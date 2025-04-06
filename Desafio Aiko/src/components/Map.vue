<script setup lang="ts">
  import { type PropType, ref } from 'vue'
  import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'
  import L from 'leaflet'
  import type { Equipment } from '../interface/Imap'
  import Subtitle from '../components/Subtitle.vue'
  import dataEquipmentState from '../../../data/equipmentState.json'

  const props = defineProps({
    maps: {
      type: Object as PropType<Equipment[]>,
      required: true,
    },
    positionCenter: {
      type: Object as PropType<Equipment>,
      required: true,
    },
  })

  const defaultEquipment = ref<Equipment>(props.positionCenter)
  const equipments = ref<Equipment[]>(props.maps)
  const visibleHistoric = ref<boolean>(false)
  const emit = defineEmits(['click:visibleModal'])

  const greenIcon = L.icon({
    iconUrl: '/equipmentGreen.png',
    iconSize: [50, 65],
    shadowSize: [50, 64],
    iconAnchor: [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76],
  })

  const redIcon = L.icon({
    iconUrl: 'red.png',
    iconSize: [50, 65],
    shadowSize: [50, 64],
    iconAnchor: [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76],
  })

  const yellowIcon = L.icon({
    iconUrl: '/equipmentYellow.png',
    iconSize: [50, 65],
    shadowSize: [50, 64],
    iconAnchor: [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76],
  })

  const verifyColor = (item: Equipment) => {
    let verify = dataEquipmentState.find(
      (s) => s.id === item.lastState.equipmentStateId,
    )
    if (verify && verify.name == 'Operando') return greenIcon
    if (verify && verify.name == 'Parado') return yellowIcon
    if (verify && verify.name == 'Manutenção') return redIcon
  }

  const clickModal = () => {
    visibleHistoric.value = !visibleHistoric.value
  }
</script>

<template>
  <section
    style="
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 100px;
    "
    class="flex"
  >
    <l-map
      style="height: 600px; width: 60%"
      :zoom="10"
      :center="[
        defaultEquipment.lastPosition.lat,
        defaultEquipment.lastPosition.lon,
      ]"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <section v-for="item in equipments" :key="item.id">
        >
        <l-marker
          :lat-lng="[item.lastPosition.lat, item.lastPosition.lon]"
          :icon="verifyColor(item)"
          @click="console.log('abriu')"
        >
          <l-popup>
            <div class="popup-modal">
              <h3>{{ item.name }}</h3>
              <p class="text-color">Status: {{ item.states[0].state.name }}</p>
              <button @click="clickModal()">Exibir Histórico</button>
              <section v-if="visibleHistoric" class="container-historic-state">
                <section
                  v-for="(itemState, index) in item.states"
                  :key="index"
                  :style="{
                    borderLeft: '4px solid ' + itemState.state.color,
                  }"
                  class="state-card"
                >
                  <span class="state-id"
                    >Data:
                    {{
                      new Date(itemState.date).toLocaleDateString('pt-BR')
                    }}</span
                  >
                  <span class="state-name">{{ itemState.state.name }}</span>
                </section>
              </section>
            </div>
          </l-popup>
        </l-marker>
      </section>
    </l-map>
  </section>
  <Subtitle />
</template>
