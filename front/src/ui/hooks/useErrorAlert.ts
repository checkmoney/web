import { Option } from 'tsoption'
import { useEffect } from 'react'
import { notification } from 'antd'

export const useErrorAlert = (
  error: Option<string>,
  customMessage?: string,
) => {
  useEffect(() => {
    if (error.nonEmpty()) {
      const message = !!customMessage ? customMessage : error.get()

      notification.error({
        message,
      })
    }
  }, [error])
}
