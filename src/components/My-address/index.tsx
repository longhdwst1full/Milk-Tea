import { Button, Col, Empty, Form, Input, Modal, Row } from 'antd'

import { PlusOutlined } from '@ant-design/icons'
import { useState } from 'react'

const MyAddress = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  return (
    <>
      <div className='flex-1'>
        <div className='flex items-center justify-between border-b border-gray-200 pb-4'>
          <h2 className='text-[#333] text-lg font-medium'>Địa chỉ của tôi</h2>
          <Button
            icon={<PlusOutlined />}
            type='primary'
            className='bg-[#D8B979]'
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            Thêm đỉa chỉ mới
          </Button>
        </div>
        <div className='hidden h-full w-full flex items-center justify-center'>
          <Empty description={'Bạn chưa có địa chỉ nào'}></Empty>
        </div>
        <div className='select-none'>
          <div className='py-6 not:last:border-b border-[#D8B979]'>
            <div className='flex items-center gap-4 mb-2'>
              <p className='border-r border-gray-300 pr-4'>Lorem ipsum dolor sit.</p>
              <p className=''>01234567890</p>
            </div>
            <p className='text-xs text-gray-500 capitalize mb-1'>Tòa b1, chung cư tecco garden, tứ hiệp</p>
            <p className='text-xs text-gray-500 capitalize mb-1'>Xã Tứ Hiệp, Huyện Thanh Trì, Hà Nội</p>
            <div className='flex gap-x-3 items-center'>
              <p className='text-xs border-[#D8B979] border w-fit px-2 py-[1px] rounded text-[#D8B979]'>Mặc định</p>
              <p className='text-xs border-gray-300 border w-fit px-2 py-[1px] rounded text-gray-300'>
                Địa chỉ giao hàng
              </p>
            </div>
          </div>
        </div>
      </div>
      <Modal title='Địa chỉ mới' open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Form layout='vertical'>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label='Họ và tên'>
                <Input placeholder='Họ và tên' className='border rounded-md' />
              </Form.Item>
            </Col>
            <Col span={12}></Col>
          </Row>
        </Form>
      </Modal>
    </>
  )
}

export default MyAddress
