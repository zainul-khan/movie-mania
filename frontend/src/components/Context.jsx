import React, { useState, useContext, useEffect, useReducer } from "react";
import Navbar from "./Navbar";
//context is like a warehouse which will store the data
//provider is like a delivery boy which will pass the data
// usecontext will be the one using data
import { initialState, Reducer } from "../utils/Reducer";
const AppContext = React.createContext();

export const API_URL = "https://www.omdbapi.com/?&apikey=5259fbae";

//lets create provider which will provide the data
const AppProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setisError] = useState();
    const [query, setQuery] = useState("titanic");
    const [movieData, setMovieData] = useState([]);
    const [state, dispatch] = useReducer(Reducer, initialState)

    const getMovies = async (url) => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            if (data.Response === "True") {
                setMovieData(data.Search)
                setisError(
                    { showErr: false, msg: data.Error }
                )
            }
            else {
                setisError(
                    { showErr: true, msg: data.Error }
                )
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        let timerOut = setTimeout(() => {
            getMovies(`${API_URL}&s=${query}`);
        }, 500)
        return () => clearTimeout(timerOut)
    }, [query])

    //Now we r sending data using Provider
    return <AppContext.Provider value={{ isLoading, setIsLoading, isError, setisError, movieData, setQuery, query, state, dispatch }}>{children}
    </AppContext.Provider>
}
const useGlobalContext = () => {
    return useContext(AppContext);
}
export { AppContext, AppProvider, useGlobalContext };