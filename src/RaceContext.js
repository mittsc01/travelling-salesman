import React from 'react'

const RaceContext = React.createContext({
  races: [],
  addRace: () => {},
  deleteRace: () => {},
  updateRace: () => {}
})

export default RaceContext
