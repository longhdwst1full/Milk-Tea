import TabPane from 'antd/es/tabs/TabPane'
import { Tabs } from 'antd'
import TrashCanProduct from './TrashCanProduct/TrashCanProduct'

const TrashCan = () => {
  return (
    <div className='p-2'>
      <Tabs defaultActiveKey='1'>
        <TabPane tab='Product' key='Products' className='dark:text-[#ffffff]'>
          <TrashCanProduct />
        </TabPane>
        <TabPane tab='User' key='2'>
          User
        </TabPane>
      </Tabs>
    </div>
  )
}

export default TrashCan
