import React, { useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Cookies } from 'react-cookie';
const Home = () => {
    const navi = useNavigate();
    const cookie = new Cookies();
    const [isLogin, setIsLogin] = useState(cookie.get('token') === undefined ? false : true);
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-12 d-flex align-items-center home_banner">
                    <div className="col-lg-6">
                        <h1 className="text-white">Website connecting</h1>
                        <h1 className="text-white">borrowers & investors</h1>
                        <div className="d-flex m-auto justify-content-evenly mt-5">
                            <div className="home_banner_button">
                                <div
                                    className="modal fade"
                                    id="exampleModal"
                                    tabIndex="-1"
                                    aria-labelledby="exampleModalLabel"
                                    aria-hidden="true"
                                >
                                </div>
                                {isLogin ? <div onClick={() => navi('/service/borrower')}>Borrow</div> :
                                    <div
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                    >
                                        Borrow
                                    </div>
                                }
                            </div>
                            <div className="home_banner_button">
                                <div
                                    className="modal fade"
                                    id="exampleModal"
                                    tabIndex="-1"
                                    aria-labelledby="exampleModalLabel"
                                    aria-hidden="true"
                                >
                                </div>
                                {isLogin ? <div onClick={() => navi('/service/investor')}>Investment</div> :
                                    <div
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                    >
                                        Investment
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <img
                            src="https://res.cloudinary.com/da0i1amaa/image/upload/v1653016710/Untitled-1_nnyls1.png"
                            width="60%"
                            height="50%"
                            alt="banner"
                        ></img>
                    </div>
                </div>
                <div className="home_reason mb-4">
                    <h1 className="my-5 home_header">Why choose us?</h1>
                    <div className="col-lg-12 d-flex justify-content-evenly">
                        <div className="col-lg-4 home_reason_item">
                            <img
                                src="https://res.cloudinary.com/da0i1amaa/image/upload/v1659072428/Pngtree_make_money_design_5359529_1_1_wb0ddk.png"
                                width="140px"
                                height="140px"
                                alt=""
                            ></img>
                            <h5>Preferential loans</h5>
                            <p>
                                Interest rate 18.25%/year for Borrower, flexible
                                loan term from 1-12 months.
                            </p>
                        </div>
                        <div className="col-lg-4 home_reason_item">
                            <img
                                src="https://res.cloudinary.com/da0i1amaa/image/upload/v1659071136/294214353_396344649262185_3313532684040591733_n_q3kovq.png"
                                width="140px"
                                height="140px"
                                alt=""
                            ></img>
                            <h5>Guaranteed investment</h5>
                            <p>
                                P2P has a business license and legal
                                headquarters. Business model transparent
                                business – easy to understand. Quick and
                                convenient liquidity
                            </p>
                        </div>
                        <div className="col-lg-4 home_reason_item">
                            <img
                                src="https://res.cloudinary.com/da0i1amaa/image/upload/v1652787340/Pngtree_finance_financial_money_secure_security_4896171_jpsvfw.png"
                                width="140px"
                                height="140px"
                                alt=""
                            ></img>
                            <h5>Transparent, safe</h5>
                            <p>
                                Guaranteed 100% safety up to date receive
                                principal and interest with a profit of
                                18%/year.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-12 d-flex align-items-center home_banner_2">
                    <div className="col-lg-6">
                        <h1 className="text-white">Invest with profits</h1>
                        <h1 className="text-white">
                            up to <b className="home_banner_profit">xxx</b>
                            %/year
                        </h1>
                    </div>
                    <div className="col-lg-6">
                        <img
                            src="https://res.cloudinary.com/da0i1amaa/image/upload/v1652787319/ydr8guxs1lqcbzz0fmd9.png"
                            width="60%"
                            height="50%"
                            alt="banner"
                        ></img>
                    </div>
                </div>
                <div className="home_feedback mb-4">
                    <h1 className="my-5 home_header">Feedback</h1>
                    <div className="col-lg-12 d-flex justify-content-evenly">
                        <div className="col-lg-4 home_reason_item">
                            <img
                                src="https://res.cloudinary.com/da0i1amaa/image/upload/v1659072268/Ellipse_6_rhswvr.png"
                                width="110px"
                                height="110px"
                                alt=""
                                className="mt-2"
                            ></img>
                            <h5 className="my-3">Dianne Russell</h5>
                            <p>
                                Interest rate 18.25%/year for Borrower, flexible
                                loan term from 1-12 months.
                            </p>
                        </div>
                        <div className="col-lg-4 home_reason_item">
                            <img
                                src="https://res.cloudinary.com/da0i1amaa/image/upload/v1659073006/Ellipse_6_2_x1yfvz.png"
                                width="110px"
                                height="110px"
                                alt=""
                                className="mt-2"
                            ></img>
                            <h5 className="my-3">Dianne Russell</h5>
                            <p>
                                P2P has a business license and legal
                                headquarters. Business model transparent
                                business – easy to understand. Quick and
                                convenient liquidity
                            </p>
                        </div>
                        <div className="col-lg-4 home_reason_item">
                            <img
                                src="https://res.cloudinary.com/da0i1amaa/image/upload/v1659072321/Ellipse_7_apejvs.png"
                                width="110px"
                                height="110px"
                                alt=""
                                className="mt-2"
                            ></img>
                            <h5 className="my-3">Dianne Russell</h5>
                            <p>
                                Guaranteed 100% safety up to date receive
                                principal and interest with a profit of
                                18%/year.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="home_news mb-4">
                    <h1 className="my-5 home_header">NEWS</h1>
                    <div className="col-lg-12 d-flex justify-content-around">
                        <div className="col-lg-5 home_news_item">
                            <img
                                src="https://res.cloudinary.com/da0i1amaa/image/upload/v1659073299/image_8_e2jqhs.png"
                                width="530px"
                                height="270px"
                                alt=""
                            ></img>
                            <div>
                                <h3>
                                    P2P Investing model: The trend of online
                                    lending
                                </h3>
                                <p>
                                    With many benefits, the peer-to-peer lending
                                    model P2P Investing is expected to gradually
                                    change the financial usage habits of
                                    Vietnamese people and explode strongly in
                                    the coming time.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-5 home_news_item">
                            <div className="col-lg-12 d-flex">
                                <img
                                    src="https://res.cloudinary.com/da0i1amaa/image/upload/v1659073289/image_11_mhbmhe.png"
                                    width="140px"
                                    height="140px"
                                    alt=""
                                ></img>
                                <div>
                                    <h3>
                                        P2P Investing model: The trend of online
                                        lending
                                    </h3>
                                    <p>
                                        With many benefits, the peer-to-peer
                                        investing model P2P Investing is expected to
                                        gradually change the financial usage
                                        habits of Vietnamese people and explode
                                        strongly in the coming time.
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-12 d-flex mt-5">
                                <img
                                    src="https://res.cloudinary.com/da0i1amaa/image/upload/v1659073286/image_10_gcscjh.png"
                                    width="140px"
                                    height="140px"
                                    alt=""
                                ></img>
                                <div>
                                    <h3>
                                        Private money-Investing business banned in
                                        Jharkhand
                                    </h3>
                                    <p>
                                        The private money-Investing business has
                                        been banned in Jharkhand with the recent
                                        enactment of a law, an official release
                                        said on Friday.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="home_news_more">
                        View More
                        <FaAngleRight />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
