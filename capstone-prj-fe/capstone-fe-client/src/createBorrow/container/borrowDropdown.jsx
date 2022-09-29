import { Select } from "antd";
import React from "react";

const BorrowDropdown = (props) => {
    const { setloanTerm, setCateID, validation, loanTerm } = props;
    const { Option } = Select;
    return (
        <>
            <div className="w-100 d-flex justify-content-around align-items-center my-3 pb-3">
                <div className="col-5 borrow_dropdown">
                    <p className="m-0">
                        Loan term <b className="required_field">*</b>
                    </p>
                    <Select
                        className="button-select"
                        defaultValue="Choose loan term"
                        style={{
                            width: 120,
                        }}
                        onChange={(e) => {
                            setloanTerm(Number(e))

                        }}
                        value={loanTerm}
                    >
                        <Option value="1">1 months</Option>
                        <Option value="3">3 months</Option>
                        <Option value="6">6 months</Option>
                        <Option value="12">12 months</Option>
                    </Select>
                    {validation.loanTerm.valid &&
                        <p className="text-danger">
                            {validation.loanTerm.msg}
                        </p>
                    }
                </div>
                <div className="col-5 borrow_dropdown">
                    <p className="m-0">
                        Loan purpose <b className="required_field">*</b>
                    </p>
                    <Select
                        className="button-select"
                        defaultValue="Choose loan purpose"
                        style={{
                            width: 120,
                        }}
                        onChange={(e) => setCateID(Number(e))}
                    >
                        <Option value="1">Consumer Loan</Option>
                        <Option value="2">Business Loan</Option>
                    </Select>
                    {validation.category_id.valid &&
                        <p className="text-danger">
                            {validation.category_id.msg}
                        </p>
                    }
                </div>
            </div>
        </>
    );
};

export default BorrowDropdown;
