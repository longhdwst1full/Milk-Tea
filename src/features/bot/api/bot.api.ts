<<<<<<< HEAD
// import { API_BOT_CHAT } from '../../../configs'
=======
import { API_BOT_CHAT } from '../../../configs'
>>>>>>> 800703ab2268567780963d1e735f7845a994a0df
import http from '../../../api/instance'
import { message } from 'antd'

const apiBotChat = 'http://localhost:3333/'

export const sendMessage = async (inputMessage: string, idUser?: string) => {
  const api =
    idUser !== undefined || idUser !== null || idUser !== ''
      ? `${apiBotChat}/ask?query=${inputMessage}&id=${idUser}`
      : `${apiBotChat}/ask?query=${inputMessage}`
  try {
    const response = await http(api)
    return response.data
  } catch (error) {
    message.error('Có lỗi xảy ra')
  }
}
