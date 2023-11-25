import { message } from 'antd'
import { addressApi } from '../../../api/address.api'
import { IAddressCreate } from '../../../interfaces'

export const handleCreateAddress = async (data: IAddressCreate) => {
  try {
<<<<<<< HEAD
    await addressApi.create(data)
    // console.log('🚀 ~ file: handle-create-address.ts:12 ~ handleCreateAddress ~ response:', response)
=======
    const response = await addressApi.create(data)
    console.log('🚀 ~ file: handle-create-address.ts:12 ~ handleCreateAddress ~ response:', response)
>>>>>>> 800703ab2268567780963d1e735f7845a994a0df
  } catch (error) {
    message.error('Có lỗi xảy ra, vui lòng thử lại sau!')
  }
}
