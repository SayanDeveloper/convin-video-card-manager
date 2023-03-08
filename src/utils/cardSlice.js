import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
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

export const createCard = createAsyncThunk(
  'card/createCard',
  async (payload, thunkAPI) => {
    try {
      console.log("payload", payload)
      const res = await addDoc(collection(db, "cards"), payload);

      const bucketsRef = collection(db, "buckets");

      const q = query(bucketsRef, where("id", "==", payload.bucket));
      const docsSnap = await getDocs(q);
      docsSnap.forEach(doc => {
        updateDoc(doc.ref, {
          ...doc.data(),
          cards: [...doc.data().cards, payload.id]
        })
      })

      return payload
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

export const deleteCard = createAsyncThunk(
  'card/deleteCard',
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

export const updateCard = createAsyncThunk(
  'card/updateCard',
  async (payload, thunkAPI) => {
    try {
      console.log("payload", payload)
      const cardsRef = collection(db, "cards");

      const q = query(cardsRef, where("id", "==", payload.id));
      const docsSnap = await getDocs(q);
      docsSnap.forEach(doc => {
        updateDoc(doc.ref, payload)
      })

      return true
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
)

export const getBuckets = createAsyncThunk(
  'bucket/getBuckets',
  async (thunkAPI) => {
    try {
      const colRef = collection(db, "buckets");
      const docsSnap = await getDocs(colRef);
      let allBuckets = []
      docsSnap.forEach(doc => {
        allBuckets.push(doc.data())
        console.log(doc.data())
      })
      console.log(allBuckets)

      return allBuckets
    
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

export const createBucket = createAsyncThunk(
  'bucket/createBucket',
  async (payload, thunkAPI) => {
    try {
      console.log("payload", payload)
      
      await addDoc(collection(db, "buckets"), payload)

      return true
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

export const deleteBucket = createAsyncThunk(
  'bucket/deleteBucket',
  async (payload, thunkAPI) => {
    try {
      console.log("payload", payload)
      // const docRef = doc(db, "buckets", payload);
      // await deleteDoc(docRef)

      const bucketsRef = collection(db, "buckets");
      const cardsRef = collection(db, "cards");

      const q = query(bucketsRef, where("id", "==", payload));
      const docsSnap = await getDocs(q);

      docsSnap.forEach(doc => {
        let bucketData = doc.data()
        for (let card of bucketData.cards) {
          const cardq = query(cardsRef, where("id", "==", card));
          getDocs(cardq).then(res => {
            res.forEach(doc => {
              deleteDoc(doc.ref)
            })
          });
        }
        deleteDoc(doc.ref)
      })

      return true
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

export const updateBucket = createAsyncThunk(
  'bucket/updateBucket',
  async (payload, thunkAPI) => {
    try {
      console.log("payload", payload)
      const bucketsRef = collection(db, "buckets");

      const q = query(bucketsRef, where("id", "==", payload.id));
      const docsSnap = await getDocs(q);
      docsSnap.forEach(doc => {
        updateDoc(doc.ref, {
          ...doc.data(),
          name: payload.name
        })
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
      })
      .addCase(getCardItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cards = action.payload;
      })
      .addCase(getCardItems.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getBuckets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBuckets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.buckets = action.payload;
      })
      .addCase(getBuckets.rejected, (state, action) => {
        state.isLoading = false;
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
      .addCase(updateCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateCard.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createBucket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBucket.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createBucket.rejected, (state, action) => {
        state.isLoading = false;
      })
  },
});

export const { clearCards, stopLoading } = cardSlice.actions
export default cardSlice.reducer;