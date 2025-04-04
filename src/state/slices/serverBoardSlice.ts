import { createSlice } from "@reduxjs/toolkit";
import { stateBoard } from "./boardGameslice";
import { Board } from "../../components/board";
import { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface serverState {
 loading: boolean;
 server: null;

 error: null | boolean;
 success: false;
}
export type Server = {
 board: Board;
 hostName: string;
 serverName: string;
 step: boolean;
 guest: string | null;
 id: string;
 serverState: serverState;
};
const serverData: Server = {
 board: stateBoard,
 hostName: "Аноним__ " + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10),
 serverName: "Сервер",
 step: true,
 guest: "ноунейм",
 id: "none",
 serverState: {
  loading: false,
  server: null,

  error: null,
  success: false,
 },
};

export const postF = createAsyncThunk<void, { path: string; body: Server }, { rejectValue: string }>("joinTheGame", async ({ path, body }: { path: string; body: Server }) => {
 try {
  const fetchQuery = await fetch(`https://telegrambotfishcombat-default-rtdb.firebaseio.com/checkers/${path}.json`, {
   method: "PUT",
   body: JSON.stringify(body),
   headers: {
    "Content-Type": "application/json",
   },
  }).then((response) => {
   if (response.ok) {
    return response.json();
   } else {
    throw new Error("error to fetch data session game");
   }
  });
 } catch (error: any) {
  console.error(error.message);
 }
});
export const getF = createAsyncThunk<Server, { path: string }>("update", async ({ path }: { path: string }) => {
 try {
  const response = await fetch(`https://telegrambotfishcombat-default-rtdb.firebaseio.com/checkers/${path}.json`, {
   headers: {
    "Content-Type": "application/json",
   },
   method: "GET",
  });
  if (response.ok) {
   const rresponse: Server = await response.json();
   return rresponse;
  } else {
   throw new Error("Error to get data");
  }
 } catch (error: any) {
  throw new Error(error);
 }
});
export const getFN = createAsyncThunk<Server, { path: string }>("update", async ({ path }: { path: string }) => {
 try {
  const response = await fetch(`https://telegrambotfishcombat-default-rtdb.firebaseio.com/checkers/${path}.json`, {
   headers: {
    "Content-Type": "application/json",
   },
   method: "GET",
  });
  if (response.ok) {
   const rresponse: Server = await response.json();
   return rresponse;
  } else {
   throw new Error("Error to get data");
  }
 } catch (error: any) {
  throw new Error(error);
 }
});

const serverSlice = createSlice({
 name: "server",
 initialState: serverData,
 reducers: {
  updateServerName: (state, action: PayloadAction<string>) => {
   console.log("Редюсер updateServerName сработал:", action.payload);
   state.serverName = action.payload;
  },
  updateBoard: (state, board: PayloadAction<Board>) => {
   state.board = board.payload;
   state.step = !state.step;
  },
 },
 extraReducers: (builder) => {
  builder
   .addCase(postF.pending, (state) => {
    state.serverState.loading = true;
   })
   .addCase(postF.fulfilled, (state) => {
    state.serverState.loading = false;
    state.serverState.error = false;
   })
   .addCase(postF.rejected, (state) => {
    state.serverState.error = true;
   })
   .addCase(getF.pending, (state) => {
    state.serverState.loading = true;
   })
   .addCase(getF.fulfilled, (state, action: PayloadAction<Server>) => {
    console.log("🔥 Данные получены из getF:", action.payload); // Лог результата запроса

    return {
     ...state,
     board: action.payload.board,
     id: action.payload.id,
     step: action.payload.step,
     guest: action.payload.guest,
     hostName: action.payload.hostName,
     serverState: { ...state.serverState, loading: false, error: false },
    };
   })
   .addCase(getF.rejected, (state) => {
    state.serverState.error = true;
   });
 },
});
export const { updateServerName, updateBoard } = serverSlice.actions;
export const serverBoard = serverSlice.reducer;
