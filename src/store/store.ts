
// Not in use yet
//
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
export const store = configureStore({
  reducer: {
    
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
