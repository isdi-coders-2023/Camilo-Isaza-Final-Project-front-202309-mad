import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Helmet } from '../../model/helmet';
import {
  loadHelmetThunk,
  createHelmetThunk,
  updateHelmetThunk,
  deletHelmetThunk,
} from './helmetsThunks';

type HelmetsState = {
  helmets: Helmet[];
  helmetsStateOption: 'idle' | 'loading' | 'error';
};

const initialState: HelmetsState = {
  helmets: [],
  helmetsStateOption: 'idle',
};
const HelmetsSlice = createSlice({
  name: 'helmets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadHelmetThunk.pending, (state: HelmetsState) => {
      state.helmetsStateOption = 'loading';
      return state;
    }),
      builder.addCase(loadHelmetThunk.fulfilled, (state, { payload }) => {
        state.helmets = payload;
        state.helmetsStateOption = 'idle';
        return state;
      }),
      builder.addCase(loadHelmetThunk.rejected, (state: HelmetsState) => {
        state.helmetsStateOption = 'error';
        return state;
      });
    builder.addCase(
      createHelmetThunk.fulfilled,
      (state: HelmetsState, { payload }: PayloadAction<Helmet>) => {
        state.helmets.push(payload);
        return state;
      }
    ),
      builder.addCase(
        updateHelmetThunk.fulfilled,
        (state: HelmetsState, { payload }: PayloadAction<Helmet>) => {
          state.helmets[
            state.helmets.findIndex((item) => item.id === payload.id)
          ] = payload;
          return state;
        }
      ),
      builder.addCase(
        deletHelmetThunk.fulfilled,
        (state: HelmetsState, { payload }: PayloadAction<Helmet['id']>) => {
          state.helmets.splice(
            state.helmets.findIndex((item) => item.id === payload),
            1
          );
          return state;
        }
      );
  },
});

export default HelmetsSlice.reducer;
