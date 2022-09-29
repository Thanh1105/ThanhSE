import { Select } from "antd";
import React from "react";

const HistoryDropdown = () => {
    const { Option } = Select;
    return (
        <>
            <div className="w-100 d-flex justify-content-around align-items-center mb-3">
                <div className="col-6 history_dropdown m-auto mb-3">
                    <Select
                        className="button-select"
                        defaultValue="Choose loan term"
                        style={{
                            width: 120,
                        }}
                    >
                        <Option>Open</Option>
                        <Option>In Processing</Option>
                        <Option>Done</Option>
                        <Option>Cancelled</Option>
                    </Select>
                </div>
                <div className="col-6 history_dropdown m-auto mb-3">
                    <Select
                        className="button-select"
                        defaultValue="Choose loan term"
                        style={{
                            width: 120,
                        }}
                    >
                        <Option>Consumer Loan</Option>
                        <Option>Bussiness Loan</Option>
                    </Select>
                </div>
            </div>
        </>
    );
};

export default HistoryDropdown;
