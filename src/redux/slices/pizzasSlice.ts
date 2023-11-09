import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../store";

type Pizza = {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
}

interface PizzaSliceState {
    items: Pizza[];
    status: 'loading' | 'success' | 'error'
}

const initialState: PizzaSliceState = {
    items: [],
    status: 'loading',
};

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>('pizza/fetchPizzasStatus', async (params) => {
    const {category, sortBy, order, search, currentPage} = params;
    const {data} = await axios.get<Pizza[]>(
        `https://6543c99601b5e279de20f63f.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
});

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload;
        },
    },
    extraReducers: builder =>
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = 'loading';
                state.items = [];
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'success';
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = 'error';
                state.items = [];
            })
});

export const selectPizzaData = (state:RootState) => state.pizza;
export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer;