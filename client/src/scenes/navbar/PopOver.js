import * as React from 'react';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import MessageNotification from "./MessageNotification.js"
import { Notifications } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { setNotifications } from 'state/index.js';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function PopoverPopupState() {
  const token = useSelector((state) => state.token);
  const id = useSelector((state) => state.user._id);
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  const [getNoti, setgetNoti] = useState(null)

  useEffect(() => {
    getUserNoti();
  }, []);

  const getUserNoti = async () => {
    const response = await fetch(`http://localhost:3001/notifications/${id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    });
    const data = await response.json();

    dispatch(setNotifications({ notification: data }))

    setgetNoti(data);
  };

  if (!getNoti) {
    return "loading";
  }


  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <>

          <Notifications color="primary" style={{ cursor: "pointer" }} sx={{ fontSize: "25px" }} {...bindTrigger(popupState)} />
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >

            {notification.notificationForUser.map((noti) => {

             return <MessageNotification key={noti._id} notification={noti} />
            })}
          </Popover>
        </>
      )}
    </PopupState>
  );
}