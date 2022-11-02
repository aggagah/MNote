import React from "react";
import "../styles/Summary.css";
import api from "../api/order.api";
import { useState } from "react";

function Summary() {
    const [orderList, setOrderList] = useState([]);

    const [state, setState] = useState({
        date: "",
    });

    const getDataByDate = () => {
        api.post("getorderbydate", {
            date: `${state.date.getDate()}-${
                state.date.getMonth() + 1
            }-${state.date.getFullYear()}`,
        }).then((response) => {
            setOrderList(response.data.data.reverse());
        });
        console.log(state.date);
    };

    const change = (e) => {
        e.preventDefault();
        setState({ ...state, [e.target.name]: e.target.value });
    };

    let totalPrice = 0;
    let totalAmount = 0;
    orderList.forEach((order) => {
        totalPrice = totalPrice + order.totalPrice;
        totalAmount = totalAmount + order.amount;
    });
    return (
        <div className="summary-page">
            <div className="left">
                <h1>Summary</h1>
                <div className="summary-table">
                    <div
                        className="row"
                        style={{
                            fontSize: "1.25em",
                            fontWeight: "600",
                            borderBottom: "1px solid #e0ab4b",
                            marginBottom: "5px",
                        }}
                    >
                        <div className="item-date">Date</div>
                        <div className="item-amount">Amount</div>
                        <div className="item-totalPrice">Total Price</div>
                    </div>
                    {Array.isArray(orderList)
                        ? orderList.map((order) => (
                              <div className="row" key={order._id}>
                                  <div className="item-date">{state.date}</div>
                                  <div className="item-amount">
                                      {totalAmount}
                                  </div>
                                  <div className="item-totalPrice">
                                      {totalPrice}
                                  </div>
                              </div>
                          ))
                        : console.log("Data error")}
                </div>
            </div>
            <div className="right">
                <form onSubmit={getDataByDate} className="filter-date">
                    <h1>Filter Order</h1>
                    <div className="date-form">
                        <label htmlFor="date">Select date</label>
                        <input
                            type="Date"
                            name="date"
                            value={state.date}
                            onChange={change}
                            autoComplete="off"
                        />
                    </div>
                    <button type="submit">Filter</button>
                </form>
            </div>
        </div>
    );
}

export default Summary;
