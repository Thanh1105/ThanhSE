import { Select } from "antd";
import React, { useEffect } from "react";

const SelectRole = (props) => {
    const { Option } = Select
    const { roles, setRoles } = props;

    return (
        <Select
            className="position-absolute rounded-3"
            defaultValue={roles}
            onChange={(e) => {
                setRoles(e);
            }
            }
        >
            <Option value="investor" >Investor</Option>
            <Option value="borrower" >Borrower</Option>
        </Select>
    );
};

export default SelectRole;
