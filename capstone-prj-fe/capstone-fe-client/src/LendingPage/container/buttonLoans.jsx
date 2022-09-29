import { useNavigate } from "react-router-dom";

const ButtonLoans = (props) => {
    const { title, path } = props;
    const navigate = useNavigate();

    return (
        <div
            className="body-search"
            onClick={() => navigate(path)}
        >
            <h4 className="text-white text-center search">{title} </h4>
        </div>
    );
};



export default ButtonLoans;
