import { createSlice } from '@reduxjs/toolkit';
import { getDevices, changeDevice } from '@services/spotify';
import { noop } from '@utils';

const initialState = {
  devices: [],
  activeDevice: '',
};

const spotifySlice = createSlice({
  name: 'spotify',
  initialState,
  reducers: {
    setDevices: (state, action) => ({
      ...state,
      devices: action.payload,
    }),
    setCurrentDevice: (state, action) => ({
      ...state,
      activeDevice: action.payload,
    }),
    resetDevices: state => ({
      ...state,
      devices: [],
      activeDevice: '',
    }),
  },
});

export const {
  setDevices,
  setCurrentDevice,
  resetDevices,
} = spotifySlice.actions;

export default spotifySlice.reducer;

export const fetchDevicesAction = () => async dispatch => {
  const devices = await getDevices().catch(noop);
  if (devices) {
    dispatch(setDevices(devices));
    const activeDevice = devices.find(device => device.is_active);
    activeDevice && dispatch(setCurrentDevice(activeDevice.id));
  }
};

export const changeDeviceAction = (deviceId, currentSong) => async dispatch => {
  try {
    const playAfterChange = !!currentSong.publicId;
    await changeDevice(deviceId, playAfterChange);
    dispatch(setCurrentDevice(deviceId));
  } catch (error) {
    console.log(error);
  }
};
