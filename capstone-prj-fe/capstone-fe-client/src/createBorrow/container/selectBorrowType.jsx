import { Select } from "antd";
import React from "react";

const selectBorrowType = (props) => {
    const { Option } = Select;
    const { type, setType } = props;
    return (
        <Select className="select_box" defaultValue={type} onChange={(e) => setType(e)}>
            <Option value="basic">Basic</Option>
            <Option value="mulinvest">Multiple investor</Option>
            <Option value="mulmoney">Multiple Money</Option>
        </Select>
    );
};

export default selectBorrowType;
