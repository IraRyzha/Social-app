import { rootReducer } from "@/config/rootReducer";
import { IProfile } from "@/entities/profile";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    console.log("fetchUser thunk work");
    console.log("token from localstorage");
    console.log(token);
    if (!token) {
      return rejectWithValue("No token provided");
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }
      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

interface AuthState {
  isAuthenticated: boolean;
  profile: IProfile | null;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  profile: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  selectors: {
    isAuthenticated: (state) => state.isAuthenticated,
    profile: (state) => state.profile,
    token: (state) => state.token,
  },
  reducers: {
    login: (
      state,
      action: PayloadAction<{ user: IProfile; token: string }>
    ) => {
      state.isAuthenticated = true;
      state.profile = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.profile = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchUser.fulfilled,
      (state, action: PayloadAction<IProfile | null>) => {
        if (action.payload) {
          state.isAuthenticated = true;
          state.profile = action.payload;
        } else {
          state.isAuthenticated = false;
          state.profile = null;
        }
      }
    );
  },
}).injectInto(rootReducer);

export default authSlice;
