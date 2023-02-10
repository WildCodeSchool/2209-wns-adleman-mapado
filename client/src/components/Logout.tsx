import { useGetProfileQuery, useLogoutMutation } from "../gql/generated/schema";
import CSS from "csstype";

const buttonStyles: CSS.Properties = {
  height: "2.5rem",
  width: "15rem",
  borderRadius: "15px",
  border: "3px solid #EC5D5C",
  fontSize: "1rem",
};

export default function Logout() {
  const { data: currentUser, client } = useGetProfileQuery();

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
          {currentUser ? "Log out" : "Log in"}
        </button>
      </a>
    </>
  );
}
