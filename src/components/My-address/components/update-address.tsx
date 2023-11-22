import { Button, Checkbox, Col, Form, Input, Modal, Row, message } from 'antd'
import { RootState, useAppSelector, useUpdateAddressMutation } from '../../../store'
import { handleCancelUpdate, handleUpdateOk } from '../utils'

import { IAddress } from '../../../interfaces'
import { Navigate } from 'react-router-dom'
import { useEffect } from 'react'

type Props = {
  isUpdate: boolean
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>
  address: IAddress | null
}

export const UpdateAddress = ({ isUpdate, setIsUpdate, address }: Props) => {
  const [form] = Form.useForm()
  const [updateAddress] = useUpdateAddressMutation()
  const { user } = useAppSelector((state: RootState) => state.persistedReducer.auth)

  useEffect(() => {
    if (address) {
      form.setFieldsValue({
        name: address.name,
        phone: address.phone,
        address: address.address,
        default: address.default
      })
    }
  }, [address])

  const handleUpdateAddress = async (data: Pick<IAddress, 'address' | 'name' | 'phone' | 'default'>) => {
    try {
      if (!user) {
        message.error('Bạn cần đăng nhập để thực hiện chức năng này')
        return <Navigate to='/login' replace={true} />
      }
      await updateAddress({
        ...data,
        userId: user._id as string,
        default: data.default ? true : false,
        _id: address?._id as string
      })
      message.success('Cập nhật địa chỉ thành công')
      setIsUpdate(false)
      form.resetFields()
    } catch (error) {
      message.error('Có lỗi xảy ra, vui lòng thử lại sau!')
    }
  }

  if (!user) {
    message.error('Bạn cần đăng nhập để thực hiện chức năng này')
    return <Navigate to='/login' replace={true} />
  }
  return (
    <Modal
      title='Cập nhật địa chỉ'
      forceRender
      open={isUpdate}
      onOk={() => handleUpdateOk(setIsUpdate)}
      onCancel={() => handleCancelUpdate(setIsUpdate)}
      footer={null}
    >
      <Form layout='vertical' autoComplete='off' form={form} onFinish={handleUpdateAddress}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label='Họ và tên'
              name={'name'}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập họ và tên'
                }
              ]}
            >
              <Input placeholder='Họ và tên' className='border rounded-md' />
            </Form.Item>
          </Col>
          <Col span={12} className=''>
            <Form.Item
              label='Số điện thoại'
              name={'phone'}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập số điện thoại'
                }
              ]}
            >
              <Input placeholder='Số điện thoại' className='border rounded-md' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label='Địa chỉ'
              name={'address'}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập địa chỉ'
                }
              ]}
            >
              <Input placeholder='Địa chỉ' className='border rounded-md' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item name='default' valuePropName='checked'>
              <Checkbox>Đặt làm địa chỉ mặc định</Checkbox>
            </Form.Item>
          </Col>
        </Row>

        <Button
          type='primary'
          htmlType='submit'
          className='bg-yellow hover:!bg-yellow text-white w-full border rounded-md'
        >
          Cập nhật địa chỉ
        </Button>
      </Form>
    </Modal>
  )
}
