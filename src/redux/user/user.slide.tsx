import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILogin, IUser } from "../../type/backend";

export interface CounterState {
  isPending: boolean;
  isError: boolean;
  data: IUser[];
  errors: any;

  isCreate: boolean;
  createSuccess: boolean;
}

const initialState: CounterState = {
  isPending: false,
  isError: false,
  data: [],
  errors: [],

  isCreate: false,
  createSuccess: false,
};

export const loginPending = createAction<ILogin>("loginPending");
export const logout = createAction("logout");

export const fetchUserPending = createAction("fetchUserPending");
export const fetchUserSuccess = createAction<IUser[]>("fetchUserSuccess");
export const fetchUserFailed = createAction("fetchUserFailed");

export const createUserPending = createAction<{ email: string; name: string }>(
  "createUserPending"
);
export const createUserSuccess = createAction("createUserSuccess");
export const createUserFailed = createAction("createUserFailed");

export const userSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPending, (state, action) => {
        state.isPending = true;
        state.isError = false;
      })
      .addCase(fetchUserSuccess, (state, action) => {
        state.isPending = false;
        state.isError = false;
        state.data = action.payload;
      })
      .addCase(fetchUserFailed, (state, action) => {
        state.isPending = false;
        state.isError = true;
      })
      .addCase(createUserPending, (state, action) => {
        state.isCreate = true;
        state.createSuccess = false;
      })
      .addCase(createUserSuccess, (state, action) => {
        state.isCreate = false;
        state.createSuccess = true;
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
