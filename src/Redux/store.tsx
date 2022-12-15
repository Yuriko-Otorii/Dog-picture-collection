import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import dogImgSlice from "./Slicers/dogImgSlice";
import breedListSlice from "./Slicers/breedSlice";

const rootReducer = combineReducers({dogImgSlice, breedListSlice})

export const store = configureStore({reducer: rootReducer })

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof rootReducer>

// export const AppProvider = ({children}) => (
//     <Provider store={store}>
//         {children}
//     </Provider>
// )