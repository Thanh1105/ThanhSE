import React from "react";
import "../footer/footer.css";

const Footer = () => {
    return (
        <div className="container-fluid container_footer">
            <div className="row">
                <div className="col-lg-12 d-flex">
                    <div className="col-lg-3 ps-5">
                        <h3 className="text-white">INTRODUCTION</h3>
                        <div className="footer_divider"></div>
                        <p className="text-white footer_link">About us</p>
                    </div>
                    <div className="col-lg-3 ps-5">
                        <h3 className="text-white">SERVICE</h3>
                        <div className="footer_divider"></div>
                        <p className="text-white">For Borrowers</p>
                        <p className="text-white footer_link">For Investors</p>
                    </div>
                    <div className="col-lg-3 ps-5">
                        <h3 className="text-white">SUPPORT</h3>
                        <div className="footer_divider"></div>
                        <p className="text-white footer_link">FAQ</p>
                        <p className="text-white footer_link">
                            How to deposit/withdraw money{" "}
                        </p>
                        <p className="text-white footer_link">Contact</p>
                    </div>
                    <div className="col-lg-3 ps-5">
                        <h3 className="text-white">RULES</h3>
                        <div className="footer_divider"></div>
                        <p className="text-white footer_link">
                            Policies & Rules
                        </p>
                        <p className="text-white footer_link">Privacy Policy</p>
                    </div>
                </div>
                <div className="col-lg-12 d-flex mt-3 text-start">
                    <div className="col-lg-8 d-flex">
                        <img
                            src="https://res.cloudinary.com/da0i1amaa/image/upload/v1653642469/Logo_HomePage_qbmgo1.png"
                            width="200px"
                            height="80px"
                            alt=""
                        ></img>
                        <div className="ms-5">
                            <h2 className="text-white">PEER-TO-PEER LENDING</h2>
                            <p className="text-white">Information</p>
                        </div>
                    </div>
                    <div className="col-lg-4 text-white ">
                        <h3 className="text-white">Contact for support</h3>
                        <p>
                            <b>8h00 - 22h00</b>
                        </p>
                        <p>Phone: </p>
                        <p>Email: </p>
                    </div>
                </div>
                <div className="footer_end_divider"></div>
                <div className="text-end text-white position-relative footer_copyright mt-3"><p>Copyright 2022 &copy; P2P</p></div>
            </div>
        </div>
    );
};

export default Footer;
