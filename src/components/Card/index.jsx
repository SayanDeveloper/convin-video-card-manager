import React from 'react';
import { Avatar,Card as AntCard } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import Meta from 'antd/es/card/Meta';
import videoLogo from "../../assets/videoLogo.png"

const Card = ({id, title, url}) => {
  return (
    <AntCard
        style={{ width: 300, borderTop: "5px solid black", margin: "10px 20px", cursor: "pointer" }}
        cover={
        <img
            alt="example"
            src={videoLogo}
        />
        }
        onClick={(e) => {
            if (e.target.tagName === "SPAN") {
                return
            }
        }}
        actions={[
        <DeleteOutlined style={{height: "100%"}} key="download" />,
        <EditOutlined key="edit" onClick={(e) => {
            console.log("heyyy")
        }} />,
        ]}
    >
        {/* <Meta
        avatar={<Avatar src="https://joesch.moe/api/v1/random" />}
        title="Card title"
        description="This is the description"
        /> */}
        <div style={{fontWeight: 600, fontSize: "18px"}}>{title}</div>
        <div style={{fontSize: "16px"}}>{url}</div>
    </AntCard>
  )
}

export default Card