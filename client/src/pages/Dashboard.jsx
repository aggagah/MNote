import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import api from "../api/order.api";
import "../styles/Dashboard.css";

function Dashboard() {
    const [orderList, setOrderList] = useState([]);
    const [state, setState] = useState({
        name: "",
        amount: null,
        totalPrice: null,
    });

    // get all order data
    useEffect(() => {
        getAllOrder();
    }, [orderList]);

    const getAllOrder = () => {
        api.get("getorder").then((response) => {
            setOrderList(response.data.data.reverse());
        });
    };

    const change = (e) => {
        e.preventDefault();
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const addOrder = () => {
        api.post("addorder", {
            name: state.name,
            amount: state.amount,
            totalPrice: state.totalPrice,
        }).then((response) => {
            console.log(response.message);
        });

        setState({
            name: "",
            amount: null,
            totalPrice: null,
        });
    };

    return (
        <div className="dashboard-page">
            <div className="dashboard-left">
                <h1>Food Order</h1>
                <div className="order-table">
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
                        <div className="item-price">Total Price</div>
                    </div>
                    {Array.isArray(orderList)
                        ? orderList.map((order) => (
                              <div className="row" key={order._id}>
                                  <div className="item-name">{order.name}</div>
                                  <div className="item-amount">
                                      {order.amount}
                                  </div>
                                  <div className="item-date">{order.date}</div>
                                  <div className="item-price">
                                      IDR {order.totalPrice}
                                  </div>
                              </div>
                          ))
                        : console.log("Data error")}
                </div>
            </div>
            <div className="dashboard-right">
                <form className="add-order" onSubmit={addOrder}>
                    <h1>Add New Order</h1>
                    <div className="item-name-form">
                        <label htmlFor="name">Item Name</label>
                        <input
                            type="text"
                            name="name"
                            value={state.name}
                            onChange={change}
                        />
                    </div>
                    <div className="item-amount-form">
                        <label htmlFor="amount">Amount</label>
                        <input
                            type="text"
                            name="amount"
                            value={state.amount}
                            onChange={change}
                        />
                    </div>
                    <div className="item-price-form">
                        <label htmlFor="totalPrice">Price</label>
                        <input
                            type="text"
                            name="totalPrice"
                            value={state.totalPrice}
                            onChange={change}
                        />
                    </div>
                    <button type="submit">Add</button>
                </form>
            </div>
        </div>
    );
}

export default Dashboard;
