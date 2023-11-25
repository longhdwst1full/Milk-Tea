// import { API_BOT_CHAT } from '../../../configs'
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
