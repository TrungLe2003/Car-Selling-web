import { createContext, useEffect, useState } from "react";

export const Store = createContext();

const getCurrentUser = JSON.parse(localStorage.getItem('currentUser'));

const StoreProvider = (props) => {
    // const [allOrderDone, setAllOrderDone] = useState([]);
    // const [allOrderApproved, setAllOrderApproved] = useState([]);
    // const [allOrderUnApproved, setAllOrderUnApproved] = useState([]);
    // const [allCar, setAllCar] = useState([]);
    // const [allPost, setAllPost] = useState([]);
    // const [allProvider, setAllProvider] = useState([]);
    // const [allCustomer, setAllCustomer] = useState([]);
    // const [allApplyProvider, setAllApplyProvider] = useState([]);
    // const [currentCar, setCurrentCar] = useState([]);
    const [currentUser, setCurrentUser] = useState(getCurrentUser);
    useEffect(() => {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }, [currentUser]);
    return <Store.Provider value={{
        // allOrderDone: allOrderDone,
        // setAllOrderDone,
        // allOrderApproved: allOrderApproved,
        // setAllOrderApproved,
        // allOrderUnApproved: allOrderUnApproved,
        // setAllOrderUnApproved,
        // allCar: allCar,
        // setAllCar,
        // allPost: allPost,
        // setAllPost,
        // allProvider: allProvider,
        // setAllProvider,
        // allCustomer: allCustomer,
        // setAllCustomer,
        // allApplyProvider: allApplyProvider,
        // setAllApplyProvider,
        // currentCar: currentCar,
        // setCurrentCar,
        currentUser: currentUser,
        setCurrentUser,
    }}>
        {props.children}
    </Store.Provider>
}

export default StoreProvider