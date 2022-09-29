import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "../styleComponent/LendingPage.css";
import Paging from "../../components/container/paging";
import SideBar from "../../components/sideBar/sideBar";
import { useNavigate } from "react-router-dom";
import HeaderTitle from "../../components/container/header-title";
import DropdownSelect from "../container/dropdownSelect";
import { Icon } from "@iconify/react";
import { PATH } from "../../helper/constant";
import ButtonSearch from "../container/buttonSearch";
import ButtonLoans from "../container/buttonLoans";
import { axiosService } from "../../axiosService";
import moment from "moment";
import { currency } from "../../ulti/ultil";
import { Spin } from 'antd';
import { Cookies } from "react-cookie";
const LendingPage = () => {
    const navigate = useNavigate();
    const [listLending, setListLending] = useState([]);
    const size = 5;
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [isLoad, setIsLoad] = useState(false);
    const cookies = new Cookies();
    useEffect(() => {
        getData();
    }, []);

    const handlePageClick = (e) => {
        setPage(e.selected + 1);
    };

    const getData = async () => {
        await axiosService
            .get(`/lending/borrow_request/list?page=${page}&limit=${size}`)
            .then((res) => {
                if (res.data) {
                    setListLending(res.data.rows);
                    setTotalPage(res.data.count / size);
                    setIsLoad(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        setIsLoad(true);
        getData();
    }, [page]);

    return (
        <div className="body-page">
            <div className="container bg-light">
                <div className="row flex-nowrap">
                    <SideBar />
                    <div className="col-9 container">
                        <HeaderTitle title="Lending" />
                        <div className="row mt-2 justify-content-around">
                            <div className="col-5 body-balance">
                                <Icon
                                    icon="fluent:money-24-regular"
                                    color="white"
                                    width="24px"
                                    height="24px"
                                    className="my-2 mx-3"
                                />
                                <p className="text-white fs-6 mx-3">
                                    Account balance
                                </p>
                                <p className="fw-bold fs-5 text-white mx-3">
                                    {currency.format(cookies.get('balance_1'))}
                                </p>
                            </div>
                            <div className="col-5 body-lending">
                                <Icon
                                    icon="fluent:money-24-regular"
                                    color="white"
                                    width="24px"
                                    height="24px"
                                    className="my-2 mx-3"
                                />
                                <p className="text-white fs-6 mx-3">Lending</p>
                                <p className="fw-bold fs-5 text-white mx-3">
                                    {currency.format(0)}
                                </p>
                            </div>
                        </div>
                        <ButtonSearch title="Search" />
                        <DropdownSelect />
                        <Spin spinning={isLoad}>
                            {listLending !== undefined &&
                                listLending.length !== 0 &&
                                listLending.map((item) => {
                                    return (

                                        <div
                                            className="item-lend d-flex m-auto justify-content-between align-items-center my-2"
                                            onClick={() =>
                                                navigate(
                                                    `${PATH.LENDDETAIL_PATH}/${item.id}`
                                                )
                                            }
                                        >
                                            <div className="justify-content-between">
                                                <div>
                                                    <div className="d-flex">
                                                        <Icon
                                                            icon="majesticons:money-hand-line"
                                                            width="24px"
                                                            height="24px"
                                                        />
                                                        <p className="text-center day-lend ms-2">
                                                            {moment(
                                                                item.end_date
                                                            ).format("DD/MM/YYYY")}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p>
                                                    <b>{item.description}</b>
                                                </p>
                                                <p>
                                                    {(
                                                        item.interest_rate * 100
                                                    ).toFixed(0)}
                                                    %
                                                </p>
                                            </div>

                                            <div className="text-end">
                                                <h5>
                                                    {currency.format(
                                                        item.amount_of_packet ? item.amount_of_packet : item.expected_money
                                                    )}
                                                </h5>
                                                <button
                                                    className="btn btn-sm button-lend mt-4"
                                                    type="submit"
                                                >
                                                    Lend
                                                </button>
                                            </div>
                                        </div>

                                    );
                                })}

                        </Spin>
                        <Paging
                            totalPages={totalPage}
                            handlePageClick={handlePageClick}
                        />
                        <ButtonLoans
                            title="Your Invest"
                            path={PATH.LENDINGCONTRACT_PATH}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LendingPage;
