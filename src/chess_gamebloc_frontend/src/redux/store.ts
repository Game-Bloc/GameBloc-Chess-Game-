import { configureStore, combineReducers } from "@reduxjs/toolkit"
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist"
import storage from "redux-persist/lib/storage/session"
// import { encryptTransform } from "./encrypt"
// import profileReducer from "./slice/userProfileSlice"
// import categoryReducer from "./slice/gameCategorySlice"
// import tournamentReducer from "./slice/tournamentDataSlice"
// import authReducer from "./slice/authClient"
// import squadReducer from "./slice/squadSlice"
// import icpReducer from "./slice/icpBalanceSlice"
// import chatReducer from "./slice/chatSlice"
// import transactionReducer from "./slice/transactionSlice"
// import notificationReducer from "./slice/notificationSlice"
// import leaderboardReducer from "./slice/leaderboardSlice"

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    // transforms: [encryptTransform],
}

const reducer = combineReducers({
    // userProfile: profileReducer,
    // tournamentData: tournamentReducer,
    // gameCategory: categoryReducer,
    // authenticationClient: authReducer,
    // squad: squadReducer,
    // IcpBalance: icpReducer,
    // chat: chatReducer,
    // transaction: transactionReducer,
    // notification: notificationReducer,
    // leaderboard: leaderboardReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
