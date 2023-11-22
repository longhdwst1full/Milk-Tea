import { Tabs, TabsProps } from 'antd'
import TrashCanProduct from './TrashCanProduct/TrashCanProduct'
import TrashCanUser from './TrashCanUser/TrashCanUser'

const TrashCan = () => {
  const onChange = (key: string) => {
    console.log(key)
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Products',
      children: <TrashCanProduct />
    },
    {
      key: '2',
      label: 'User',
      children: <TrashCanUser />
    }
  ]
  return (
    <div className='p-2'>
      <Tabs defaultActiveKey='1' type='card' items={items} onChange={onChange} />
    </div>
  )
}

export default TrashCan
