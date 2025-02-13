import { createSlice, type PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchCards, saveCards, deleteCardFromBackend, saveCard } from "@src/lib/api"

export interface Card {
  _id: string
  title: string
  content: string
  position: { x: number; y: number }
}

interface CardsState {
  cards: Card[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: CardsState = {
  cards: [],
  status: "idle",
  error: null,
}

export const fetchCardsAsync = createAsyncThunk("cards/fetchCards", async () => {
  const response = await fetchCards()
  return response
})

export const saveCardsAsync = createAsyncThunk("cards/saveCards", async (cards: Card[]) => {
  await saveCards(cards)
})

export const deleteCardAsync = createAsyncThunk("cards/deleteCard", async (cardId: string) => {
  await deleteCardFromBackend(cardId)
  return cardId
})

export const saveCardAsync = createAsyncThunk("cards/saveCard", async (card: Card) => {
  await saveCard(card)
})

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<Card>) => {
      state.cards.push(action.payload)
    },
    updateCard: (state, action: PayloadAction<Card>) => {
      const index = state.cards.findIndex((card) => card._id === action.payload._id)
      if (index !== -1) {
        state.cards[index] = action.payload
      }
    },
    deleteCard: (state, action: PayloadAction<string>) => {
      state.cards = state.cards.filter((card) => card._id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCardsAsync.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchCardsAsync.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.cards = action.payload
      })
      .addCase(fetchCardsAsync.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || null
      })
      .addCase(deleteCardAsync.fulfilled, (state, action) => {
        state.cards = state.cards.filter((card) => card._id !== action.payload)
      })
  },
})

export const { addCard, updateCard, deleteCard } = cardsSlice.actions

export default cardsSlice.reducer

