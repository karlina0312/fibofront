import { notification } from 'antd'
import { AxiosRequestConfig, Method } from 'axios'
import { BaseResponse } from 'models'
import { freshAxios } from './index'

// #region [BaseRequest]
interface BaseRequestProps {
  url: string
  method: Method
  params?: Object
  data?: Object
  onError?: Function
}

const catchError = (err: any) => {
  if (err.response) {
    if (err.response.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/'
    } else if (err.response.status === 403) {
      notification.warning({
        message: 'Танд хандах эрх байхгүй байна.',
        description: '',
      })
    }
  } else if (err.message === 'Network Error') {
    notification.info({
      message: 'Алдаа гарлаа. Дараа дахин оролдоно уу',
      description: '',
    })
  } else {
    notification.error({
      message: err.name,
      description: err.message,
    })
  }
}

export const BaseRequest = async ({ onError, ...props }: BaseRequestProps) => {
  const config: AxiosRequestConfig = {
    baseURL: 'https://caas.fibo.cloud/api/v1/',
    ...props,
  }
  try {
    const responseInstance = await freshAxios(config)
    const response = responseInstance.data as BaseResponse
    if (response.status_code !== 0) {
      catchError(new Error(response.error_msg))
      return null
    }
    return response.body || false
  } catch (err) {
    catchError(err)
    if (onError) {
      onError()
    }
    return null
  }
}
// #endregion

// #region [Props]
interface GetProps {
  onError?: Function
}

interface PostProps {
  data: Object
  onError?: Function
}

interface PutProps {
  data: Object
  onError?: Function
}

interface DeleteProps {
  data: Object
  onError?: Function
}
// #endregion

// #region [K8s]
// #region [Namespace]
export const listK8sNamespace = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'ns/',
    method: 'GET',
    ...props,
  })
  return response || {}
}

export const getK8sNamespace = async (name: string, props: GetProps) => {
  const response = await BaseRequest({
    url: `ns/${name}/`,
    method: 'GET',
    ...props,
  })
  return response || {}
}

export const createK8sNamespace = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'ns/',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const updateK8sNamespace = async (name: string, props: PutProps) => {
  const response = await BaseRequest({
    url: `ns/${name}/`,
    method: 'PUT',
    ...props,
  })
  return response || {}
}

export const deleteK8sNamespace = async (name: string, props: DeleteProps) => {
  const response = await BaseRequest({
    url: `ns/${name}/`,
    method: 'DELETE',
    ...props,
  })
  return response || {}
}
// #endregion

// #region [Deployment]
export const listK8sDeployment = async (props: GetProps, ns?: string) => {
  const response = await BaseRequest({
    url: `deploy/${ns ? `?ns=${ns}` : ''}`,
    method: 'GET',
    ...props,
  })
  return response || []
}

export const getK8sDeployment = async (name: string, props: GetProps, ns?: string) => {
  const response = await BaseRequest({
    url: `deploy/${name}/${ns ? `?ns=${ns}` : ''}`,
    method: 'GET',
    ...props,
  })
  return response || {}
}

export const updateK8sDeployment = async (name: string, props: PutProps, ns?: string) => {
  const response = await BaseRequest({
    url: `deploy/${name}/${ns ? `?ns=${ns}` : ''}`,
    method: 'PUT',
    ...props,
  })
  return !!response
}

export const createK8sDeployment = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'deploy/',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const deleteK8sDeployment = async (name: string, props: DeleteProps, ns?: string) => {
  const response = await BaseRequest({
    url: `deploy/${name}/${ns ? `?ns=${ns}` : ''}`,
    method: 'DELETE',
    ...props,
  })
  return response || {}
}
// #endregion

// #region [Pod]
export const listK8sPod = async (props: GetProps, ns?: string) => {
  const response = await BaseRequest({
    url: `pod/${ns ? `?ns=${ns}` : ''}`,
    method: 'GET',
    ...props,
  })
  return response || []
}

export const getK8sPod = async (name: string, props: GetProps, ns?: string) => {
  const response = await BaseRequest({
    url: `pod/${name}/${ns ? `?ns=${ns}` : ''}`,
    method: 'GET',
    ...props,
  })
  return response || {}
}
// #endregion

// #region [Service]
export const listK8sService = async (props: GetProps, ns?: string) => {
  const response = await BaseRequest({
    url: `svc/${ns ? `?ns=${ns}` : ''}`,
    method: 'GET',
    ...props,
  })
  return response || {}
}

export const getK8sService = async (name: string, props: GetProps, ns?: string) => {
  const response = await BaseRequest({
    url: `svc/${name}/${ns ? `?ns=${ns}` : ''}`,
    method: 'GET',
    ...props,
  })
  return response || {}
}

export const createK8sService = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'svc/',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const updateK8sService = async (name: string, props: PutProps, ns?: string) => {
  const response = await BaseRequest({
    url: `svc/${name}/${ns ? `?ns=${ns}` : ''}`,
    method: 'PUT',
    ...props,
  })
  return response || {}
}

export const deleteK8sService = async (name: string, props: DeleteProps, ns?: string) => {
  const response = await BaseRequest({
    url: `svc/${name}/${ns ? `?ns=${ns}` : ''}`,
    method: 'DELETE',
    ...props,
  })
  return response || {}
}
// #endregion

// #region [Storage class]
export const listK8sStorageClass = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'sc/',
    method: 'GET',
    ...props,
  })
  return response || {}
}

export const getK8sStorageClass = async (name: string, props: GetProps) => {
  const response = await BaseRequest({
    url: `sc/${name}/`,
    method: 'GET',
    ...props,
  })
  return response || {}
}

export const createK8sStorageClass = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'sc/',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const deleteK8sStorageClass = async (name: string, props: DeleteProps) => {
  const response = await BaseRequest({
    url: `sc/${name}/`,
    method: 'DELETE',
    ...props,
  })
  return response || {}
}
// #endregion

// #region [Persistent volume]
export const listK8sPersistentVolume = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'pv/',
    method: 'GET',
    ...props,
  })
  return response || {}
}

export const getK8sPersistentVolume = async (name: string, props: GetProps) => {
  const response = await BaseRequest({
    url: `pv/${name}/`,
    method: 'GET',
    ...props,
  })
  return response || {}
}

export const createK8sPersistentVolume = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'pv/',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const updateK8sPersistentVolume = async (name: string, props: PutProps) => {
  const response = await BaseRequest({
    url: `pv/${name}/`,
    method: 'PUT',
    ...props,
  })
  return response || {}
}

export const deleteK8sPersistentVolume = async (name: string, props: DeleteProps) => {
  const response = await BaseRequest({
    url: `pv/${name}/`,
    method: 'DELETE',
    ...props,
  })
  return response || {}
}
// #endregion

// #region [Persistent volume claim]
export const listK8sPersistentVolumeClaim = async (props: GetProps, ns?: string) => {
  const response = await BaseRequest({
    url: `pvc/${ns ? `?ns=${ns}` : ''}`,
    method: 'GET',
    ...props,
  })
  return response || {}
}

export const getK8sPersistentVolumeClaim = async (name: string, props: GetProps, ns?: string) => {
  const response = await BaseRequest({
    url: `pvc/${name}/${ns ? `?ns=${ns}` : ''}`,
    method: 'GET',
    ...props,
  })
  return response || {}
}

export const createK8sPersistentVolumeClaim = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'pvc/',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const updateK8sPersistentVolumeClaim = async (name: string, props: PutProps, ns?: string) => {
  const response = await BaseRequest({
    url: `pvc/${name}/${ns ? `?ns=${ns}` : ''}`,
    method: 'PUT',
    ...props,
  })
  return response || {}
}

export const deleteK8sPersistentVolumeClaim = async (name: string, props: DeleteProps, ns?: string) => {
  const response = await BaseRequest({
    url: `pvc/${name}/${ns ? `?ns=${ns}` : ''}`,
    method: 'DELETE',
    ...props,
  })
  return response || {}
}
// #endregion
// #endregion
