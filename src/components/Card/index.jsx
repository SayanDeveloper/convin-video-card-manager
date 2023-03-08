import React from 'react';
import { Avatar,Card as AntCard } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import Meta from 'antd/es/card/Meta';
import videoLogo from "../../assets/videoLogo.png"
import { useDispatch } from 'react-redux';
import { addHistory, clearCards, deleteCard, getCardItems } from '../../utils/cardSlice';

const Card = ({cardDetails, setCardDetailModalOpen, setSelectedCard, setCardEditModalOpen}) => {
    const dispatch = useDispatch()
  return (
    <AntCard
        style={{ width: 300, borderTop: "5px solid black", margin: "10px 20px", cursor: "pointer" }}
        cover={
        <img
            alt="example"
            src={videoLogo}
        />
        }
        onClick={async (e) => {
            console.log(e.target.tagName)
            if (e.target.tagName === "SPAN" || e.target.tagName === "svg" || e.target.tagName === "path" || e.target.tagName === "UL") {
                return
            }
            setSelectedCard(cardDetails)
            setCardDetailModalOpen(true)
            dispatch(addHistory({...cardDetails, time: new Date().getTime()}))
        }}
        actions={[
        <DeleteOutlined style={{height: "100%"}} key="download" onClick={() => {
            dispatch(deleteCard(cardDetails)).then((res) => {
                dispatch(getCardItems())
            })
        }} />,
        <EditOutlined key="edit" onClick={(e) => {
            console.log("heyyy")
            setSelectedCard(cardDetails)
            setCardEditModalOpen(true)
        }} />,
        ]}
    >
        <div style={{fontWeight: 600, fontSize: "18px", height: "30px", overflow: "hidden", width: "100%", textOverflow: "ellipsis"}}>{cardDetails.name}</div>
        <div style={{fontSize: "16px", height: "30px", overflow: "hidden", width: "100%", textOverflow: "ellipsis"}}>
            {cardDetails.link}
        </div>
        
    </AntCard>
  )
}

export default Card