import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserFromFirebase } from "../api/firebase/authAPI";
import {
    getReviewListFromFirebase
} from "../api/firebase/reviewAPI";
import { ReviewType } from "../types/reviewType";