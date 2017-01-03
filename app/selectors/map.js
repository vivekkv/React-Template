import { createSelector } from 'reselect'
export const avilableDrivers = (state) => state.map.get("connectedDrivers")