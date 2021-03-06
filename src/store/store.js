import { configureStore, combineReducers } from '@reduxjs/toolkit';
// Wrap in Context
import me from '@context/me';
import auth from '@context/auth';
import playing from '@context/playing';
import spotify from '@context/spotify';
import languageSettings from '@context/languageSettings';
import rooms from '@context/rooms';

const rootReducer = combineReducers({
  me,
  auth,
  playing,
  spotify,
  languageSettings,
  rooms,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
