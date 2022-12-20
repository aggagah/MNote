import React, { useState } from "react";
import "../styles/Search.css";
import api from "../api/order.api";

function Search() {
    const [state, setState] = useState({
        name: "",
    });
    const [orderData, setOrderData] = useState([]);

    const searchOrder = (e) => {
        e.preventDefault();
        api.post("getorderbyname", {
            name: state.name,
            _id: localStorage.getItem("user"),
        }).then((response) => {
            setOrderData(response.data.data.orders.reverse());
        });

        setState({
            name: "",
        });
    };

    return (
        <div className="search-page">
            <div className="search">
                <h1>Search Order</h1>
                <form className="search-order" onSubmit={searchOrder}>
                    <label htmlFor="name">Item name</label>
                    <input
                        type="text"
                        name="name"
                        value={state.name}
                        onChange={(e) =>
                            setState({
                                name: e.target.value,
                            })
                        }
                        autoComplete="off"
                    />
                    <button type="submit">Search</button>
                </form>
                <div className="search-table">
                    <div
                        className="row"
                        style={{
                            fontSize: "1.25em",
                            fontWeight: "600",
                            borderBottom: "1px solid #e0ab4b",
                            marginBottom: "5px",
                        }}
                    >
                        <div className="item-name">Item Name</div>
                        <div className="item-amount">Amount</div>
                        <div className="item-date">Date</div>
                        <div className="item-totalPrice">Total Price</div>
                    </div>
                    {orderData.map((order) => (
                        <div className="row" key={order._id}>
                            <div className="item-name">{order.name}</div>
                            <div className="item-amount">{order.amount}</div>
                            <div className="item-date">{order.date}</div>
                            <div className="item-totalPrice">
                                IDR {order.totalPrice}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Search;
