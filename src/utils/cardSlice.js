import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cards: [],
  isLoading: true,
};

const cardSlice = createSlice({
  name: 'cards',
  initialState,
});

console.log(cardSlice);

export default cardSlice.reducer;