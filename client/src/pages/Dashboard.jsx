import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import api from "../api/order.api";
import "../styles/Dashboard.css";
import Button from "@mui/material/Button";

function Dashboard() {
    const [orderList, setOrderList] = useState([]);
    const [state, setState] = useState({
        name: "",
        amount: undefined,
        totalPrice: undefined,
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

    const deleteOrder = (e) => {
        e.preventDefault();
        const _id = e.target.id;
        console.log(_id);

        api.delete("deleteorder", { data: { _id: _id } }).then((response) => {
            console.log(response);
        });
    };

    return (
        <div className="dashboard-page">
            <div className="dashboard-left">
                <h1>Food Order</h1>
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
                    <div className="item-action">Action</div>
                </div>
                <div className="order-table">
                    {Array.isArray(orderList)
                        ? orderList.map((order) => (
                              <div
                                  className="row"
                                  key={order._id}
                                  id={order._id}
                              >
                                  <div
                                      className="item-name"
                                      name="name"
                                      id={order._id}
                                  >
                                      {order.name}
                                  </div>
                                  <div
                                      className="item-amount"
                                      name="amount"
                                      id={order._id}
                                  >
                                      {order.amount}
                                  </div>
                                  <div
                                      className="item-date"
                                      name="date"
                                      id={order._id}
                                  >
                                      {order.date}
                                  </div>
                                  <div
                                      className="item-price"
                                      name="totalPrice"
                                      id={order._id}
                                  >
                                      IDR {order.totalPrice}
                                  </div>

                                  <div className="item-action">
                                      <Button
                                          id={order._id}
                                          size="small"
                                          variant="contained"
                                          color="error"
                                          onClick={deleteOrder}
                                      >
                                          Delete
                                      </Button>
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
                            autoComplete="off"
                        />
                    </div>
                    <div className="item-amount-form">
                        <label htmlFor="amount">Amount</label>
                        <input
                            type="text"
                            name="amount"
                            value={state.amount}
                            onChange={change}
                            autoComplete="off"
                        />
                    </div>
                    <div className="item-price-form">
                        <label htmlFor="totalPrice">Price</label>
                        <input
                            type="text"
                            name="totalPrice"
                            value={state.totalPrice}
                            onChange={change}
                            autoComplete="off"
                        />
                    </div>
                    <button type="submit">Add</button>
                </form>
            </div>
        </div>
    );
}

export default Dashboard;
