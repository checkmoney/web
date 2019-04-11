import { notification } from 'antd'

export const useNotifyAlert = () => (message: string) =>
  notification.info({
    message,
  })
