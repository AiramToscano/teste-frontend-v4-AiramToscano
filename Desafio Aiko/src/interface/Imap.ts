export interface Equipment {
  id: string
  equipmentModelId: string
  name: string
  lastPosition: Position
  lastState: State
  states: States[]
  positions: {
    equipmentId: string
    positions: Position[]
  }
}

export interface EquipamentModel {
  id: string
  name: string
  hourlyEarnings: hourlyEarnings[]
  equipament: Equipment[]
}

export interface Position {
  date: string
  lat: number
  lon: number
}

export interface Positions {
  equipmentId: string
  positions: Position[]
}

export interface hourlyEarnings {
  equipmentStateId: string
  value: number
}

export interface EquipmentState {
  id: string
  name: string
  color: string
}

export interface EquipmentStateHistory {
  equipmentId: string
  states: States[]
}

export interface States {
  date: string
  equipmentStateId: string
  state: EquipmentState
}

export interface State {
  date: string
  equipmentStateId: string
}
