import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderTitle from "../../components/container/header-title";
import SideBar from "../../components/sideBar/sideBar";
import { PATH } from "../../helper/constant";
import "../styleComponent/history.css";
import HistoryDropdown from "../container/historyDropdown";
import ButtonSearch from "../container/buttonSearch";
import Paging from "../../components/container/paging";
import { axiosService } from "../../axiosService";
import { Cookies } from "react-cookie";
import { Modal, Spin } from "antd";
import moment from "moment";
import { currency } from "../../ulti/ultil";
const ServiceManage = () => {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const [listData, getListData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getData = () => {
        axiosService.get(`/lending/borrow_request/${cookies.get('userID')}/your_borrow_requests`)
            .then((res) => {
                if (res.status === 200) {
                    getListData(res.data);
                    setLoading(false);
                }
            }).catch(err => {
                Modal.error({
                    title: err.response.data,
                    maskClosable: true,
                })
            })
    }

    const getStatus = (data) => {
        let rs = {
            status: '',
            className: ''
        }
        if (data.status === 0) {
            rs = {
                status: 'CANCEL',
                className: 'item-status_cancel'
            }
        } else if (data.status === 1) {
            rs = {
                status: 'OPEN',
                className: 'item-status_process'
            }
        } else if (data.status === 2) {
            rs = {
                status: 'INPROGESS',
                className: 'item-status_done'
            }
        } else if (data.status === 3) {
            rs = {
                status: 'FINISH',
                className: 'item-status_done'
            }
        } else if (data.status === 4) {
            rs = {
                status: 'WAIT_PAYMENT',
                className: 'item-status_done'
            }
        } else if (data.status === 5) {
            rs = {
                status: 'LATE_PAYMENT',
                className: 'item-status_cancel'
            }
        } else {
            rs = {
                status: 'DEBT',
                className: 'item-status_cancel'
            }
        }
        return rs;
    }

    const getType = (type) => {
        if (type === 1) {
            return 'Basic';
        } else if (type === 2) {
            return 'Multiple investor';
        } else {
            return 'Multiple money';
        }
    }
    useEffect(() => {
        setLoading(true);
        getData();
    }, [])
    return (
        <div className="body-page">
            <div className="container bg-light">
                <div className="row flex-nowrap">
                    <SideBar />
                    <div className="col-9 container">
                        <HeaderTitle title="Transaction History" />
                        <div className="bg-white">
                            <div className="w-100 mt-3 d-flex justify-content-around align-items-center history_filter">
                                <div className="col-6  history_filter_item">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter transaction code"
                                        aria-label="amount"
                                        aria-describedby="basic-addon1"
                                    />
                                </div>
                                <div className="col-6  history_filter_item">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter transaction date"
                                        aria-label="amount"
                                        aria-describedby="basic-addon1"
                                    />
                                </div>
                            </div>
                            <HistoryDropdown />
                        </div>
                        <ButtonSearch title="Search" />
                        <Spin spinning={loading}>
                            <div className="history-list mt-3">
                                {listData?.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="history-item"
                                            onClick={() => navigate(`${PATH.BORROWDETAIL_PATH}/${item.id}`)}
                                        >
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    <div className="d-flex">
                                                        <Icon
                                                            icon="majesticons:money-hand-line"
                                                            width="20px"
                                                            height="20px"
                                                        />
                                                        <p className="text-center fw-bold ms-2">
                                                            Transaction code:
                                                        </p>
                                                    </div>
                                                    <p>
                                                        <b>{item?.id}</b>
                                                    </p>
                                                    <p>
                                                        Start date: <b> {moment(item.start_date).format("dd/MM/YYYY")}</b>
                                                    </p>
                                                </div>
                                                <div className="text-right float-end">
                                                    <h5>{currency.format(item?.expected_money)}</h5>
                                                    <p>
                                                        <b>{getType(item?.type_of_lendings)}</b>
                                                    </p>
                                                    <div className={`text-uppercase text-center ${getStatus(item).className} `}>
                                                        {getStatus(item).status}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </Spin>
                        <Paging />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceManage;
