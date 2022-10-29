import React from "react";
import "../styles/Summary.css";
import api from "../api/order.api";
import { useState } from "react";
import { useEffect } from "react";

function Summary() {
    const [orderList, setOrderList] = useState([]);
    const [date, setDate] = useState(
        `${new Date().getDate()}-${
            new Date().getMonth() + 1
        }-${new Date().getFullYear()}`
    );

    useEffect(() => {
        getDataByDate();
    });

    const getDataByDate = () => {
        api.post("getorderbydate", {
            date: date,
        }).then((response) => {
            setOrderList(response.data.data.reverse());
        });
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
                                  <div className="item-date">{order.date}</div>
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
            <div className="right">insert date here</div>
        </div>
    );
}

export default Summary;
