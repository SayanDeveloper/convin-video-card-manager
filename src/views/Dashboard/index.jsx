import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/Card';
import { getBuckets, getCardItems } from '../../utils/cardSlice'
import "../../styles/Dashboard.css"
import { Button, Dropdown, Select, Space } from 'antd';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';

const Dashboard = () => {
  const [bucketList, setBucketList] = useState([])
  const [displayCards, setDsiplayCards] = useState([])
  const { cards, buckets } = useSelector((store) => store.card);
  const dispatch = useDispatch();

  const filterCardsByBucket = (bucket) => {
    if (bucket === "All") {
      setDsiplayCards(cards)
    } else {
      let filtered = cards.filter(card => card.bucket === bucket)
      setDsiplayCards(filtered)
    }
  }

  useEffect(() => {
    dispatch(getCardItems()).then(res => {
      setDsiplayCards(res.payload)
    })
    dispatch(getBuckets())
  }, [])

  useEffect(() => {
    if (buckets) {
      let items = [{label: "All", value: "All"}]
      buckets.forEach((each) => {
        items.push({
          label: each,
          value: each
        })
      })
      setBucketList(items)
    }
  }, [buckets])

  return (
    <div className='dashboard-container'>
      <Button><PlusOutlined /> Create A Card</Button>
      <Space style={{float: "right"}}>
        <span style={{fontSize: "16px"}}>
        Filter By Bucket : 
        </span>
        <Select
          defaultValue="All"
          style={{
            width: 120,
          }}
          onChange={(bucket) => filterCardsByBucket(bucket)}
          options={bucketList}
        />
      </Space>
      <div className='cards-container'>
        {displayCards.map((card, index) => (
            <Card key={index} id={card.id} title={card.name} url={card.link} />
        ))}
      </div>
    </div>
  )
}

export default Dashboard