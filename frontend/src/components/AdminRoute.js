
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminRoute = ({ children }) => {
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.userLogin);

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate("/login");
        }
    }, [navigate, userInfo]);

    return children; // 如果通過檢查，渲染子元件
};

export default AdminRoute;
