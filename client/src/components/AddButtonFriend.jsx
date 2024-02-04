import React from 'react'
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { IconButton,useTheme } from "@mui/material";

const AddButtonFriend = ({ isFriend, patchFriend }) => {
    const { palette } = useTheme();

    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    return (
        <IconButton
            onClick={() => patchFriend()}
            sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
            {isFriend ? (
                <PersonRemoveOutlined sx={{ color: primaryDark }} />
            ) : (
                <PersonAddOutlined sx={{ color: primaryDark }} />
            )}
        </IconButton>
    )
}

export default AddButtonFriend