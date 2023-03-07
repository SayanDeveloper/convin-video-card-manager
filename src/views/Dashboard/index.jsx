import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/Card';
import { getCardItems } from '../../utils/cardSlice'
import "../../styles/Dashboard.css"
import { Button, Dropdown, Select, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const Dashboard = () => {
  const { cards } = useSelector((store) => store.card);
  const dispatch = useDispatch();

  const items = [
    {
      label: '3rd menu item',
      key: '3',
    },
    {
      label: '4th menu item',
      key: '4',
    },
    {
      label: '5th menu item',
      key: '5',
    },
  ];  

  useEffect(() => {
    dispatch(getCardItems())
  }, [])

  return (
    <div className='dashboard-container'>
      <Space style={{float: "right"}}>
        <span style={{fontSize: "16px"}}>
        Filter By Bucket : 
        </span>
        <Select
          defaultValue="lucy"
          style={{
            width: 120,
          }}
          onChange={(e) => console.log(e)}
          options={[
            {
              value: 'jack',
              label: 'Jack',
            },
            {
              value: 'lucy',
              label: 'Lucy',
            },
            {
              value: 'Yiminghe',
              label: 'yiminghe',
            },
            {
              value: 'disabled',
              label: 'Disabled',
              disabled: true,
            },
          ]}
        />
      </Space>
      <div className='cards-container'>
        {cards.map((card) => (
            <Card id={card.id} title={card.name} url={card.link} />
        ))}
      </div>
    </div>
  )
}

export default Dashboard