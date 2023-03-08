import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { db } from '../firebase';

const initialState = {
  cards: [],
  buckets: [],
  isLoading: true,
};

export const getCardItems = createAsyncThunk(
  'card/getCardItems',
  async (thunkAPI) => {
    try {
      const colRef = collection(db, "cards");
      const docsSnap = await getDocs(colRef);
      let allCards = []
      docsSnap.forEach(doc => {
        allCards.push(doc.data())
      })

      return allCards
    
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

export const getBuckets = createAsyncThunk(
  'card/getBuckets',
  async (thunkAPI) => {
    try {
      const colRef = collection(db, "buckets");
      const docsSnap = await getDocs(colRef);
      let allBuckets = []
      docsSnap.forEach(doc => {
        allBuckets.push(doc.data().name)
      })
      console.log(allBuckets)

      return allBuckets
    
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

export const createCard = createAsyncThunk(
  'card/createCard',
  async (payload, thunkAPI) => {
    try {
      console.log("payload", payload)
      const res = await addDoc(collection(db, "cards"), payload);

      return payload
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

export const createBucket = createAsyncThunk(
  'card/createBucket',
  async (payload, thunkAPI) => {
    try {
      console.log("payload", payload)
      await setDoc(doc(db, "buckets"), payload);

      return true
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

export const deleteCard = createAsyncThunk(
  'card/createBucket',
  async (payload, thunkAPI) => {
    try {
      console.log("payload", payload)
      const cardsRef = collection(db, "cards");

      const q = query(cardsRef, where("id", "==", payload.id));
      const docsSnap = await getDocs(q);
      docsSnap.forEach(doc => {
        deleteDoc(doc.ref)
      })

      return true
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    clearCards: (state) => {
      state.cards = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCardItems.pending, (state) => {
        state.isLoading = true;
        console.log(state.isLoading)
      })
      .addCase(getCardItems.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload)
        state.cards = action.payload;
        console.log(state.isLoading)
      })
      .addCase(getCardItems.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
        console.log(state.isLoading)
      })
      .addCase(getBuckets.pending, (state) => {
        state.isLoading = true;
        console.log(state.isLoading)
      })
      .addCase(getBuckets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.buckets = action.payload;
        console.log(state.isLoading)
      })
      .addCase(getBuckets.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
        console.log(state.isLoading)
      })
      .addCase(createCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cards = [action.payload, ...state.cards]
      })
      .addCase(createCard.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteCard.rejected, (state, action) => {
        state.isLoading = false;
      })
  },
});

console.log(cardSlice);

export const { clearCards, stopLoading } = cardSlice.actions
export default cardSlice.reducer;