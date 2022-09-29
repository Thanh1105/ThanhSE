import Notification from "../notification/Notification";

const HeaderTitle = (props) => {
    const { title } = props;
    return (
        <div className="header-lending position-relative">
            <h4 className="text-white text-uppercase text-center py-2">
                {title}
                <Notification />{" "}
            </h4>
        </div>
    );
};

export default HeaderTitle;
