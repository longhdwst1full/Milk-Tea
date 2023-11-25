import { Button, Checkbox, Col, Form, Input, Modal, Row, message } from 'antd'
import { RootState, useAppSelector, useCreateAddressMutation } from '../../../store'
import { handleCancel, handleOk } from '../utils'

import { IAddressCreate } from '../../../interfaces'
import { Navigate } from 'react-router-dom'

type Props = {
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const CreateAddress = ({ isModalOpen, setIsModalOpen }: Props) => {
  const [createAddress] = useCreateAddressMutation()
  const [form] = Form.useForm()

  const { user } = useAppSelector((state: RootState) => state.persistedReducer.auth)

  if (!user) {
    message.error('Bạn cần đăng nhập để thực hiện chức năng này')
    return <Navigate to='/login' replace={true} />
  }

  const handleSubmitAddress = async (data: Pick<IAddressCreate, 'address' | 'name' | 'phone' | 'default'>) => {
    try {
<<<<<<< HEAD
      // console.log('data', {
      //   ...data,
      //   default: data.default ? true : false,
      //   userId: user._id as string
      // })
=======
      console.log('data', {
        ...data,
        default: data.default ? true : false,
        userId: user._id as string
      })
>>>>>>> 800703ab2268567780963d1e735f7845a994a0df
      const response = await createAddress({
        ...data,
        default: data.default ? true : false,
        userId: user._id as string
      })
      if (response) {
        message.success('Thêm địa chỉ thành công')
        setIsModalOpen(false)
      }
      form.resetFields()
    } catch (error) {
      message.error('Có lỗi xảy ra, vui lòng thử lại sau!')
    }
  }
  return (
    <Modal
      title='Địa chỉ mới'
      open={isModalOpen}
      onOk={() => handleOk(setIsModalOpen)}
      onCancel={() => handleCancel(setIsModalOpen)}
      footer={null}
    >
      <Form layout='vertical' autoComplete='off' onFinish={handleSubmitAddress} form={form}>
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
          Thêm địa chỉ
        </Button>
      </Form>
    </Modal>
  )
}
