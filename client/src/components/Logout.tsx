import { useGetProfileQuery, useLogoutMutation } from "../gql/generated/schema";
import { Link } from "react-router-dom";
import CSS from "csstype";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const buttonStyles: CSS.Properties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#EC5D5C",
    height: "fit-content",
    width: "fit-content",
    fontSize: "1.2rem",
};

export default function Logout() {
    const {data: currentUser, client} = useGetProfileQuery();

    const [logout] = useLogoutMutation();

    return (
        <>
            <a href="/login">
                <button
                    style={buttonStyles}
                    onClick={async () => {
                        await logout();
                        await client.resetStore();
                    }}
                >
                    <AccountCircleOutlinedIcon fontSize={"large"}/>
                    {currentUser ? "Log out" : "Log in"}
                </button>
            </a>
        </>
    );
}
