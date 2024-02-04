import { Box, LinearProgress, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const { picturePath } = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };
  const localStorageUser = localStorage.getItem("persist:root");
  const localStorageOfUser = JSON.parse(localStorageUser)
  const finalParse = JSON.parse(localStorageOfUser.user)

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return <LinearProgress />;
}

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          {(finalParse._id === user._id) ? (<Box >
            <UserWidget userId={userId} picturePath={user.picturePath} />
          </Box>) : (<Box m="2rem 0">
            <UserWidget userId={userId} picturePath={user.picturePath} />
          </Box>)}
          {(finalParse._id === user._id) ? (<Box m="1.5rem 0"><FriendListWidget userId={userId} /></Box>) : (<Box><FriendListWidget userId={userId} /></Box>)}
        </Box>
        <Box flexBasis={isNonMobileScreens ? "52%" : undefined} mt={isNonMobileScreens ? undefined : "2rem"}  >
          {(finalParse._id === user._id) && (<MyPostWidget picturePath={picturePath} />)}
          < PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
