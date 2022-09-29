
import { Button } from "antd";
import { Modal } from "antd";
import { axiosService } from "../../axiosService";
const ButtonDetail = (props) => {
    const { title, api, id } = props;

    const postData = () => {
        axiosService.post(api.replace('$$ID$$', id))
            .then((res) => {
                if (res.status === 200) {
                    Modal.success({
                        title: `You ${title} borrow request successfully`,
                        maskClosable: true,
                    })
                }
            })
            .catch((err) => {
                Modal.error({
                    title: err.response.data,
                    maskClosable: true,
                })
            });
    }
    return (
        <Button onClick={() => postData()} className={`col-4 ${title === 'Star Now' ? 'borrow_create_start' : 'borrow_create_cancel'}`}>
            {title}
        </Button>
    );
}
export default ButtonDetail;