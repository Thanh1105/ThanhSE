import Notification from "../../components/notification/Notification";
import SelectRole from "../../ServicePage/container/selectRole";

const HeaderTitle = (props) => {
    const { title } = props;
    return (
        <div className="header-lending position-relative">
            <h4 className="text-white text-uppercase text-center py-2">
                {title}
                <SelectRole />
                <Notification />{" "}
            </h4>
        </div>
    );
};

export default HeaderTitle;
