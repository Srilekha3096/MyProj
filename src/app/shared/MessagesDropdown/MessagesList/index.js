import React from "react";
import List from "@mui/material/List";
import MessageItem from "./MessageItem";



const MessagesList = ({notifications}) => {

  let notifyDatas = notifications?.filter((opt)=>opt?.Open_flg === false)

  const count = 10 - notifyDatas?.length
  

  if (notifyDatas < 10) {
    notifyDatas = notifyDatas.concat(notifications?.slice(0, count));
  }

  return (
    <List disablePadding>
      {notifyDatas?.map((item, index) => {
        return <MessageItem key={index} item={item} />;
      })}
    </List>
  );
};

export default MessagesList;
