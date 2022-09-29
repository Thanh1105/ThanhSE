import { Modal } from "antd";
import { Link } from "react-router-dom";
import { axiosService } from "../../axiosService";
const Item = (props) => {
    const { content, type, id } = props;

    const getNavi = () => {
        const temp = type.type_noti;
        if (temp === 1) {
            return '/history';
        } else if (temp === 3) {
            return '/borrowdetail';
        } else {
            return '/profile';
        }
    }
    const markRead = () => {

        axiosService.post('/notification', {
            alert_id: id
        }).then((res) => {
            if (res.status === 200) {
                return;
            }
        }).catch(err => {
            Modal.error({
                title: err.response.data,
                maskClosable: true
            })
        })
    }
    return (
        <Link rel="noopener noreferrer" to={getNavi()} onClick={() => markRead()}>
            <div className="d-flex">
                <img
                    src="https://res.cloudinary.com/da0i1amaa/image/upload/v1653641595/70653wqqs42_lit4nd.png"
                    width="36px"
                    height="36px"
                    alt=""
                ></img>
                <div className="content ms-2">
                    <div className="fw-bold">
                        Notification title
                    </div>
                    <div className="">{content}</div>
                </div>
            </div>
            <hr className="dropdown-divider"></hr>
        </Link>
    );

}
export default Item;