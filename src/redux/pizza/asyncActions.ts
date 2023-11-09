import {createAsyncThunk} from "@reduxjs/toolkit";
import {Pizza, SearchPizzaParams} from "./types";
import axios from "axios";


export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>('pizza/fetchPizzasStatus', async (params) => {
    const {category, sortBy, order, search, currentPage} = params;
    const {data} = await axios.get<Pizza[]>(
        `https://6543c99601b5e279de20f63f.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
});