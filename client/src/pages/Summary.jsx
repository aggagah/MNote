import React from "react";
import "../styles/Summary.css";
import api from "../api/order.api";
import { useState } from "react";

function Summary() {
    const [orderList, setOrderList] = useState([]);

    const [state, setState] = useState({
        date: "",
    });

    const getDataByDate = (e) => {
        e.preventDefault();
        api.post("getorderbydate", {
            date: `${state.date[8] + state.date[9]}-${
                state.date[5] + state.date[6]
            }-${state.date[0] + state.date[1] + state.date[2] + state.date[3]}`,
        }).then((response) => {
            setOrderList(response.data.data.reverse());
        });

        setState({
            date: "",
        });
    };

    const change = (e) => {
        e.preventDefault();
        setState({ ...state, [e.target.name]: e.target.value });
    };

    let totalPrice = 0;
    let totalAmount = 0;
    let listDate = [];
    orderList.forEach((order) => {
        totalPrice = totalPrice + order.totalPrice;
        totalAmount = totalAmount + order.amount;
        if (!listDate.includes(order.date)) {
            let dateData = String(order.date);
            listDate.push(dateData);
        }
    });
    return (
        <div className="summary-page">
            <div className="left">
                <h1>Summary</h1>
                <form onSubmit={getDataByDate} className="filter-date">
                    <label htmlFor="date">Select date</label>
                    <input
                        type="Date"
                        name="date"
                        value={state.date}
                        onChange={change}
                    />
                    <button type="submit">Filter</button>
                </form>
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
                    {Array.isArray(listDate)
                        ? listDate.map((order) => (
                              <div className="row" key="1">
                                  <div className="item-date">{order}</div>
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
        </div>
    );
}

export default Summary;
