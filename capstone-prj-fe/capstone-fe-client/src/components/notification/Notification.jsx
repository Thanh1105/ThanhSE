import { Button, Dropdown, Menu, notification } from "antd";
import React, { useEffect, useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { axiosService } from "../../axiosService";
import { Cookies } from "react-cookie";
import { FaCircle } from 'react-icons/fa'
import Item from "./item";

const Notification = () => {
    let count = 0;
    const openNotification = () => {
        notification.open({
            message: "Notification Title",
            description:
                "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
            onClick: () => {
                console.log("Notification Clicked!");
            },
        });
    };

    const [notify, setNotify] = useState([]);
    const cookies = new Cookies();

    const getNotify = () => {
        axiosService.get(
            `notification?user_id=${cookies.get(
                "userID"
            )}&type_account=${localStorage.getItem("role")}`
        ).then((res) => {
            if (res.data) {
                setNotify(res.data);
            }
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            getNotify();
        }, 5 * 1000);
        return () => clearInterval(interval);
    }, []);

    const items = () => {
        let rs = [];
        for (let index = 0; index < notify.length; index++) {
            const arr = {
                key: notify[index].id,
                label: (
                    <Item content={notify[index].content} type={notify[index]} id={notify[index].id} />
                ),
            }

            if (!notify[index].has_read) {
                rs.push(arr);
                count++;
            }
        }
        return rs;
    }

    useEffect(() => {
        items();
    }, [notify])

    const menu = (
        <Menu
            items={items()}
        />
    );

    return (
        <Dropdown overlay={menu} placement="bottomRight" arrow>
            <Button className="position-absolute notification">
                {count > 0 && <FaCircle className="notify-circle" />}
                <IoIosNotificationsOutline className="noti-icon" />
            </Button>
        </Dropdown>
    );
};

export default Notification;
