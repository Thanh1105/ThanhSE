import React from "react";
const ButtonSend = (props) => {
    const { title, callAPI } = props;

    return (
        <div className="body-search" onClick={() => callAPI()}>
            <h4 className="text-white text-center search">{title} </h4>
        </div>
    );
};

export default ButtonSend;
