import { createContext, useEffect, useState } from "react";

export const Store = createContext();

const getCurrentUser = JSON.parse(localStorage.getItem('currentUser'));

const StoreProvider = (props) => {
    const [totalNews, setTotalNews] = useState();
    const [publishedNews, setPublishedNews] = useState();
    const [draftNews, setDraftNews] = useState();
    const [currentUser, setCurrentUser] = useState(getCurrentUser);
    useEffect(() => {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }, [currentUser]);
    return <Store.Provider value={{
        totalNews,
        setTotalNews,
        publishedNews,
        setPublishedNews,
        draftNews,
        setDraftNews,
        currentUser: currentUser,
        setCurrentUser,
    }}>
        {props.children}
    </Store.Provider>
}

export default StoreProvider