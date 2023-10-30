import { Button, Form, Input, message } from 'antd'
import { useUpdatePasswordMutation } from '../../api/User'
import { useEffect } from 'react'

type FieldType = {
  password: string
  passwordNew: string
  confirmPass: string
}

const ChangePassword = () => {
  const [updatePasswordFn, updatePasswordRes] = useUpdatePasswordMutation()

  const handleFinish = async (data: FieldType) => {
    if (data) {
      updatePasswordFn({
        password: data.password,
        passwordNew: data.passwordNew
      })
    }
  }

  useEffect(() => {
    if (updatePasswordRes.isError && updatePasswordRes.error) {
      message.error((updatePasswordRes.error as any)?.data?.message)
    }

    if (updatePasswordRes.isSuccess) {
      message.success('Đổi mật khẩu thành công')
    }
  }, [updatePasswordRes])
  return (
    <div className='flex-1'>
      <div className='items-center justify-between border-b border-gray-200 pb-4'>
        <h2 className='text-[#333] text-lg font-medium'>Thay đổi mật khẩu</h2>
      </div>
      <div className='select-none mt-[20px]'>
        <Form<FieldType>
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={handleFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item
            label='Mật khẩu cũ'
            name='password'
            rules={[{ required: true, message: 'Mời bạn điền vào mật khẩu cũ!' }]}
          >
            <Input.Password className='border-gray-300 h-[35px] rounded-[5px]' />
          </Form.Item>

          <Form.Item
            label='Mật khẩu mới'
            name='passwordNew'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label='Xác nhận mật khẩu mới'
            name='confirmPass'
            dependencies={['passwordNew']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Làm ơn điền Confirm Password!'
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('passwordNew') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Password new and Confirm Password không khớp!'))
                }
              })
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='submit' className='bg-primary-500'>
              Đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default ChangePassword
