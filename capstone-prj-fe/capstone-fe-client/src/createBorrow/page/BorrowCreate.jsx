import React, { useEffect } from "react";
import HeaderTitle from "../../components/container/header-title";
import SideBar from "../../components/sideBar/sideBar";
import "../styleComponent/BorrowCreate.css";
import BorrowDropdown from "../container/borrowDropdown";
import ButtonSend from "../container/buttonSend";
import { useState } from "react";
import moment from "moment";
import { axiosService } from "../../axiosService";
import { Cookies } from "react-cookie";
import { message } from "antd";
import SelectBorrowType from "../container/selectBorrowType";
import { useParams } from "react-router-dom";
import { getType } from "../ultils/ultil";
const BorrowCreate = () => {
    const [interest_rate, setRate] = useState(0);
    const [category_id, setCateID] = useState("");
    const [start_date, setStartDate] = useState("");
    const [end_date, setEndDate] = useState("");
    const [expected_money, setMoney] = useState("");
    const [loanTerm, setloanTerm] = useState(0);
    const [packages, setPackages] = useState(0);
    const [amountInterset, setAmountInterset] = useState(0);
    const [miniMumInvest, setMiniMumInvest] = useState(0);
    const [miniMumAmount, setMiniMumAmount] = useState(0);
    const { types } = useParams();
    const [type, setType] = useState(types ? types : "basic");

    const [valid, setValid] = useState({
        expected_money: { valid: false, msg: "" },
        category_id: { valid: false, msg: "" },
        start_date: { valid: false, msg: "" },
        loanTerm: { valid: false, msg: "" },
        interest_rate: { valid: false, msg: "" },
        packages: { valid: false, msg: "" },
        amountInterset: { valid: false, msg: "" },
        miniMumInvest: { valid: false, msg: "" },
        miniMumAmount: { valid: false, msg: "" },
    });

    const reset = () => {
        const temp = {
            expected_money: { valid: false, msg: "" },
            category_id: { valid: false, msg: "" },
            start_date: { valid: false, msg: "" },
            loanTerm: { valid: false, msg: "" },
            interest_rate: { valid: false, msg: "" },
            packages: { valid: false, msg: "" },
            amountInterset: { valid: false, msg: "" },
            miniMumInvest: { valid: false, msg: "" },
            miniMumAmount: { valid: false, msg: "" },
        }
        setValid(temp);
        setRate(0);
        setCateID("");
        setStartDate("");
        setEndDate("");
        setMoney("");
        setPackages(0);
        setloanTerm(0);
        setMiniMumAmount(0);
        setMiniMumInvest(0);
        setAmountInterset(0);
    }
    const endDate = () => {
        if (start_date !== "") {
            const futureMonth = moment(start_date).add(loanTerm, "M");
            setEndDate(moment(futureMonth).format("yyyy-MM-DD"));
        }
    };
    useEffect(() => {
        endDate();
    }, [loanTerm, start_date]);

    useEffect(() => {
        setMoney(packages * amountInterset)
    }, [packages, amountInterset])

    useEffect(() => {
        reset();
    }, [type])

    const validate_basic = () => {
        const temp = {
            expected_money: { valid: false, msg: "" },
            category_id: { valid: false, msg: "" },
            start_date: { valid: false, msg: "" },
            loanTerm: { valid: false, msg: "" },
            interest_rate: { valid: false, msg: "" },
        };
        if (!expected_money) {
            temp.expected_money.valid = true;
            temp.expected_money.msg =
                "Please input amount of money you want to borrow";
        } else if (expected_money > 50000000) {
            temp.expected_money.valid = true;
            temp.expected_money.msg = "Amount must be less than 50,000,000VND";
        } else {
            temp.expected_money.valid = false;
            temp.expected_money.msg = "";
        }
        if (!category_id) {
            temp.category_id.valid = true;
            temp.category_id.msg = "Please choose loan purpose";
        } else {
            temp.category_id.valid = false;
            temp.category_id.msg = "";
        }
        if (!start_date) {
            temp.start_date.valid = true;
            temp.start_date.msg = "Please choose Start Date";
        } else if (new Date(start_date) < new Date()) {
            temp.start_date.valid = true;
            temp.start_date.msg = "Start date can not be less than current day";
        } else {
            temp.start_date.valid = false;
            temp.start_date.msg = "";
        }
        if (!loanTerm) {
            temp.loanTerm.valid = true;
            temp.loanTerm.msg = "Please input loan term";
        } else {
            temp.loanTerm.valid = false;
            temp.loanTerm.msg = "";
        }
        if (!interest_rate) {
            temp.interest_rate.valid = true;
            temp.interest_rate.msg = "Please input interest rate";
        } else if (interest_rate < 9 || interest_rate > 15) {
            temp.interest_rate.valid = true;
            temp.interest_rate.msg =
                "Interest rate must be is in the range of 9% - 15% ";
        } else {
            temp.interest_rate.valid = false;
            temp.interest_rate.msg = "";
        }
        setValid(temp);
        return (
            !temp.expected_money.valid &&
            !temp.category_id.valid &&
            !temp.start_date.valid &&
            !temp.interest_rate.valid &&
            !temp.loanTerm.valid
        );
    };

    const validate_mulinvest = () => {
        const temp = {
            expected_money: { valid: false, msg: "" },
            interest_rate: { valid: false, msg: "" },
            packages: { valid: false, msg: "" },
            amountInterset: { valid: false, msg: "" },
            loanTerm: { valid: false, msg: "" },
            category_id: { valid: false, msg: "" },
            start_date: { valid: false, msg: "" },
            miniMumAmount: { valid: false, msg: "" },
        };
        if (!category_id) {
            temp.category_id.valid = true;
            temp.category_id.msg = "Please choose loan purpose";
        } else {
            temp.category_id.valid = false;
            temp.category_id.msg = "";
        }
        if (!start_date) {
            temp.start_date.valid = true;
            temp.start_date.msg = "Please choose Start Date";
        } else if (new Date(start_date) < new Date()) {
            temp.start_date.valid = true;
            temp.start_date.msg = "Start date can not be less than current day";
        } else {
            temp.start_date.valid = false;
            temp.start_date.msg = "";
        }
        if (!loanTerm) {
            temp.loanTerm.valid = true;
            temp.loanTerm.msg = "Please input loan term";
        } else {
            temp.loanTerm.valid = false;
            temp.loanTerm.msg = "";
        }
        if (!interest_rate) {
            temp.interest_rate.valid = true;
            temp.interest_rate.msg = "Please input interest rate";
        } else if (interest_rate < 9 || interest_rate > 15) {
            temp.interest_rate.valid = true;
            temp.interest_rate.msg =
                "Interest rate must be is in the range of 9% - 15% ";
        } else {
            temp.interest_rate.valid = false;
            temp.interest_rate.msg = "";
        }
        if (!packages) {
            temp.packages.valid = true;
            temp.packages.msg = "Please input amount each packet";
        } else {
            temp.packages.valid = false;
            temp.packages.msg = "";
        }
        if (!amountInterset) {
            temp.amountInterset.valid = true;
            temp.amountInterset.msg = "Please input number of investor";
        } else {
            temp.amountInterset.valid = false;
            temp.amountInterset.msg = "";
        }
        if (!miniMumAmount) {
            temp.miniMumAmount.valid = true;
            temp.miniMumAmount.msg =
                "Please input minimum amount required to start applying for a loan";
        } else if (miniMumAmount > expected_money) {
            temp.miniMumAmount.valid = true;
            temp.miniMumAmount.msg =
                "Minimum amount must be less than or equal total amount";
        } else {
            temp.miniMumAmount.valid = false;
            temp.miniMumAmount.msg = "";
        }
        setValid(temp);
        return (
            !temp.category_id.valid &&
            !temp.expected_money.valid &&
            !temp.start_date.valid &&
            !temp.interest_rate.valid &&
            !temp.loanTerm.valid &&
            !temp.amountInterset.valid &&
            !temp.miniMumAmount.valid &&
            !temp.packages.valid
        );
    };

    const validate_mulmoney = () => {
        const temp = {
            expected_money: { valid: false, msg: "" },
            category_id: { valid: false, msg: "" },
            start_date: { valid: false, msg: "" },
            loanTerm: { valid: false, msg: "" },
            interest_rate: { valid: false, msg: "" },
            miniMumInvest: { valid: false, msg: "" },
            miniMumAmount: { valid: false, msg: "" },
        };
        if (!expected_money) {
            temp.expected_money.valid = true;
            temp.expected_money.msg =
                "Please input amount of money you want to borrow";
        } else if (expected_money > 50000000) {
            temp.expected_money.valid = true;
            temp.expected_money.msg = "Amount must be less than 50,000,000VND";
        } else {
            temp.expected_money.valid = false;
            temp.expected_money.msg = "";
        }
        if (!category_id) {
            temp.category_id.valid = true;
            temp.category_id.msg = "Please choose loan purpose";
        } else {
            temp.category_id.valid = false;
            temp.category_id.msg = "";
        }
        if (!start_date) {
            temp.start_date.valid = true;
            temp.start_date.msg = "Please choose Start Date";
        } else if (new Date(start_date) < new Date()) {
            temp.start_date.valid = true;
            temp.start_date.msg = "Start date can not be less than current day";
        } else {
            temp.start_date.valid = false;
            temp.start_date.msg = "";
        }
        if (!loanTerm) {
            temp.loanTerm.valid = true;
            temp.loanTerm.msg = "Please input loan term";
        } else {
            temp.loanTerm.valid = false;
            temp.loanTerm.msg = "";
        }
        if (!interest_rate) {
            temp.interest_rate.valid = true;
            temp.interest_rate.msg = "Please input interest rate";
        } else if (interest_rate < 9 || interest_rate > 15) {
            temp.interest_rate.valid = true;
            temp.interest_rate.msg =
                "Interest rate must be is in the range of 9% - 15% ";
        } else {
            temp.interest_rate.valid = false;
            temp.interest_rate.msg = "";
        }
        if (!miniMumInvest) {
            temp.miniMumInvest.valid = true;
            temp.miniMumInvest.msg = "Please input minimum investment amount";
        } else if (miniMumInvest > expected_money) {
            temp.miniMumInvest.valid = true;
            temp.miniMumInvest.msg =
                "Minimum investment amount must be less than or equal total amount";
        } else {
            temp.miniMumInvest.valid = false;
            temp.miniMumInvest.msg = "";
        }
        if (!miniMumAmount) {
            temp.miniMumAmount.valid = true;
            temp.miniMumAmount.msg =
                "Please input minimum amount required to start applying for a loan";
        } else if (miniMumAmount > expected_money) {
            temp.miniMumAmount.valid = true;
            temp.miniMumAmount.msg =
                "Minimum amount must be less than or equal total amount";
        } else {
            temp.miniMumAmount.valid = false;
            temp.miniMumAmount.msg = "";
        }
        setValid(temp);
        return (
            !temp.expected_money.valid &&
            !temp.category_id.valid &&
            !temp.start_date.valid &&
            !temp.interest_rate.valid &&
            !temp.miniMumInvest.valid &&
            !temp.miniMumAmount.valid &&
            !temp.loanTerm.valid
        );
    };

    const callAPI = () => {
        const cookie = new Cookies();
        let validation;
        let body;
        if (type === "basic") {
            validation = validate_basic();
            body = {
                user_id: Number(cookie.get("userID")),
                category_id: category_id,
                description:
                    category_id === 1 ? "Consumer Loan" : "Business Loan",
                type: getType(type),
                expected_money: Number(expected_money),
                start_date: moment(start_date).format("DD-MM-YYYY").toString(),
                end_date: moment(end_date).format("DD-MM-YYYY").toString(),
                interest_rate: (interest_rate / 100).toString(),
            };
        } else if (type === "mulinvest") {
            validation = validate_mulinvest();
            body = {
                user_id: Number(cookie.get("userID")),
                category_id: category_id,
                description:
                    category_id === 1 ? "Consumer Loan" : "Business Loan",
                type: getType(type),
                max_number_of_investor: amountInterset,
                amount_of_packet: packages,
                start_date: moment(start_date).format("DD-MM-YYYY").toString(),
                end_date: moment(end_date).format("DD-MM-YYYY").toString(),
                interest_rate: (interest_rate / 100).toString(),
            }
        } else {
            validation = validate_mulmoney();
            body = {
                user_id: Number(cookie.get("userID")),
                category_id: category_id,
                description:
                    category_id === 1 ? "Consumer Loan" : "Business Loan",
                type: getType(type),
                expected_money: Number(expected_money),
                minimum_money: miniMumAmount,
                start_date: moment(start_date).format("DD-MM-YYYY").toString(),
                end_date: moment(end_date).format("DD-MM-YYYY").toString(),
                interest_rate: (interest_rate / 100).toString(),
            };
        }
        if (valid) {
            axiosService
                .post("/lending/borrow_request/create", body)
                .then((res) => {
                    if ((res.status = 200)) {
                        message.success({
                            content: "Send request Successfully!",
                            style: {
                                marginTop: "20vh",
                            },
                        });
                        reset();
                    }
                })
                .catch((error) => {
                    message.error("Send request fail!");
                    console.log(error);
                });
        }
    };

    return (
        <div className="body-page">
            <div className="container bg-light">
                <div className="row flex-nowrap">
                    <SideBar />
                    <div className="col-9 container">
                        <HeaderTitle title="Borrow" />
                        <div className="col-12 mt-3 select_borrow_type">
                            <div className="mx-3">
                                <SelectBorrowType
                                    setType={setType}
                                    type={type}
                                />
                            </div>
                        </div>

                        <div className="col-12 mt-3 justify-content-around borrow_create">
                            <div className="col-12 d-flex m-auto py-3 borrow_amount">
                                <div className="col-8">
                                    <p className="m-0">
                                        Amount{" "}
                                        <b className="required_field">*</b>
                                    </p>
                                    <input
                                        value={
                                            type === "mulinvest"
                                                ? packages * amountInterset
                                                : expected_money
                                        }
                                        onChange={(e) =>
                                            setMoney(e.target.value)
                                        }
                                        type="number"
                                        className="form-control"
                                        placeholder="Enter the amount"
                                        aria-label="amount"
                                        aria-describedby="basic-addon1"
                                        required
                                        readOnly={type === "mulinvest"}
                                    />
                                    {valid.expected_money.valid && (
                                        <div className="text-danger">
                                            {valid.expected_money.msg}
                                        </div>
                                    )}
                                </div>

                                <div className="col-8 mx-3">
                                    <p className="m-0">
                                        Interest rate
                                        <b className="required_field"> *</b>
                                    </p>
                                    <input
                                        value={interest_rate}
                                        type="number"
                                        className="form-control interest_rate"
                                        placeholder="Interest rate"
                                        aria-label="amount"
                                        aria-describedby="basic-addon1"
                                        onChange={(e) =>
                                            setRate(e.target.value)
                                        }
                                    />
                                    {valid.interest_rate.valid && (
                                        <div className="text-danger">
                                            {valid.interest_rate.msg}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {type !== "basic" && (
                            <>
                                <div className="col-12 mt-3 justify-content-around borrow_create">
                                    {type !== "mulmoney" && (
                                        <div className="col-12 d-flex m-auto py-3 borrow_amount">
                                            <div className="col-8">
                                                <p className="m-0">
                                                    Amount each packet{" "}
                                                    <b className="required_field">
                                                        *
                                                    </b>
                                                </p>
                                                <input
                                                    value={packages}
                                                    onChange={(e) =>
                                                        setPackages(
                                                            e.target.value
                                                        )
                                                    }
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Enter the amount"
                                                    aria-label="amount"
                                                    aria-describedby="basic-addon1"
                                                    required
                                                />
                                                {valid.packages.valid && (
                                                    <div className="text-danger">
                                                        {valid.packages.msg}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="col-8 mx-3">
                                                <p className="m-0">
                                                    Maximum number of investors
                                                    <b className="required_field">
                                                        {" "}
                                                        *
                                                    </b>
                                                </p>
                                                <input
                                                    value={amountInterset}
                                                    type="number"
                                                    className="form-control interest_rate"
                                                    placeholder="Interest rate"
                                                    aria-label="amount"
                                                    aria-describedby="basic-addon1"
                                                    onChange={(e) =>
                                                        setAmountInterset(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                {valid.amountInterset.valid && (
                                                    <div className="text-danger">
                                                        {
                                                            valid.amountInterset
                                                                .msg
                                                        }
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {type === "mulmoney" && (
                                        <div className="col-12 d-flex m-auto py-3 borrow_amount">
                                            <div className="col-8">
                                                <p className="m-0">
                                                    Minimum investment amount{" "}
                                                    <b className="required_field">
                                                        *
                                                    </b>
                                                </p>
                                                <input
                                                    value={miniMumInvest}
                                                    onChange={(e) =>
                                                        setMiniMumInvest(
                                                            e.target.value
                                                        )
                                                    }
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Enter the amount"
                                                    aria-label="amount"
                                                    aria-describedby="basic-addon1"
                                                    required
                                                />
                                                {valid.miniMumInvest.valid && (
                                                    <div className="text-danger">
                                                        {
                                                            valid.miniMumInvest
                                                                .msg
                                                        }
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        <div className="col-12 mt-3 justify-content-around borrow_create_dropdown ">
                            <BorrowDropdown
                                setloanTerm={setloanTerm}
                                setCateID={setCateID}
                                validation={valid}
                                loanTerm={loanTerm}
                            />
                        </div>
                        <div className="borrow_date col-12 d-flex m-auto justify-content-around align-items-center my-3 py-3">
                            <div className="col-5">
                                <p className="m-0">
                                    Start Date{" "}
                                    <b className="required_field">*</b>
                                </p>
                                <input
                                    type="date"
                                    value={start_date}
                                    className="btn_startdate border-dark ps-2 pe-2"
                                    onChange={(e) => {
                                        setStartDate(e.target.value);
                                        endDate();
                                    }}
                                ></input>
                                {valid.start_date.valid && (
                                    <div className="text-danger">
                                        {valid.start_date.msg}
                                    </div>
                                )}
                            </div>
                            <div className="col-5">
                                <p className="m-0">End Date</p>
                                <input
                                    type="date"
                                    value={end_date}
                                    className="btn_startdate border-dark ps-2"
                                    readOnly
                                ></input>
                            </div>
                        </div>
                        {type === "mulmoney" && (
                            <>
                                <div className="col-12 d-flex m-auto py-3 borrow_minimum-for-start d-flex justify-content-center align-items-center">
                                    <div className="col-8 ">
                                        <p className="m-0">
                                            Minimum amount required to start
                                            applying for a loan{" "}
                                            <b className="required_field">*</b>
                                        </p>
                                        <input
                                            value={miniMumAmount}
                                            onChange={(e) =>
                                                setMiniMumAmount(e.target.value)
                                            }
                                            type="number"
                                            className="form-control"
                                            placeholder="Enter the amount"
                                            aria-label="amount"
                                            aria-describedby="basic-addon1"
                                            required
                                        />
                                        {valid.miniMumAmount.valid && (
                                            <div className="text-danger">
                                                {valid.miniMumAmount.msg}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                        <div>
                            By clicking <strong>Send Request</strong> button,
                            you agree to P2P Lending's{" "}
                            <strong>Terms of Service</strong> and acknowledge
                            you've read our <strong>Privacy Policy</strong>.
                        </div>
                        <ButtonSend title="Send request" callAPI={callAPI} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BorrowCreate;
