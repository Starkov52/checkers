import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Board } from "../../components/board";
import { Server } from "./serverBoardSlice";
const serverApi = createApi({
 reducerPath: "api",
 baseQuery: fetchBaseQuery({ baseUrl: "https://telegrambotfishcombat-default-rtdb.firebaseio.com" }),
 endpoints: (builder) => ({
  sendServer: builder.mutation<void, Server>({
   query: (serverBoard: Server) => ({
    url: "/checkers.json",
    method: "POST",
    body: serverBoard,
    headers: {
     "Content-Type": "application/json",
    },
   }),
  }),
  getServer: builder.query<{}, string>({
   query: (path: string) => ({
    url: `/checkers.json`,
    method: "GET",
    headers: {
     "Content-Type": "application/json",
    },
   }),
  }),
  getDataById: builder.query<Server, string>({
   query: (path: string) => ({
    url: `/checkers/${path}.json`,
    method: "GET",
    headers: {
     "Content-Type": "application/json",
    },
   }),
  }),
 }),
});
export const { useSendServerMutation, useGetServerQuery, useGetDataByIdQuery } = serverApi;
export default serverApi;
