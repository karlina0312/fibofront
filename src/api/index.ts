/* eslint-disable camelcase */
// #region [Import]
import { notification } from 'antd'
import axios, { AxiosRequestConfig, Method } from 'axios'
import { store as Redux } from 'index'
import { BaseResponse } from 'models'
// #endregion

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
  const { ipAddress } = Redux.getState().UserReducer
  const token = localStorage.getItem('token')
  const locale = localStorage.getItem('app.settings.locale')
  axios.defaults.headers.common.Accept = 'application/json'
  axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*'
  axios.defaults.headers.common['Multi-Language'] = locale || 'en'
  axios.defaults.headers.common['Content-Type'] = 'application/json'
  axios.defaults.headers.common.Accept = 'application/json'
  if (token) axios.defaults.headers.common.Authorization = token
  if (ipAddress) axios.defaults.headers.common.SourceIP = ipAddress
  const config: AxiosRequestConfig = {
    baseURL: process.env.REACT_APP_BACK_URL,
    ...props,
  }
  try {
    const responseInstance = await axios(config)
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

export const freshAxios = axios.create()
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

// #region [Auth]
export const register = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'auth/register',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const confirm = async (id: string) => {
  const response = await BaseRequest({
    url: `auth/confirm/${id}`,
    method: 'GET',
  })
  return response || []
}

// #endregion

// #region [QuotaSet]
export const getQuotaSet = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'system/projectLimit',
    method: 'GET',
    ...props,
  })
  return response || {}
}
// #endregion

// #region [Instance]
export const actionLogInstance = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'instance/action',
    method: 'POST',
    ...props,
  })
  return response || []
}

export const consoleLogInstance = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'instance/showConsole',
    method: 'POST',
    ...props,
  })
  return response
}

export const listInstance = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'instance/list',
    method: 'GET',
    ...props,
  })
  return response || []
}

export const getInstance = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'instance/get',
    method: 'POST',
    ...props,
  })
  return response || {}
}

export const updateInstance = async (props: PutProps) => {
  const response = await BaseRequest({
    url: 'instance/resize',
    method: 'PUT',
    ...props,
  })
  return !!response
}

export const revertUpdateInstance = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'instance/revertResize',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const confirmUpdateInstance = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'instance/confirmResize',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const createInstance = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'instance/create',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const deleteInstance = async (props: DeleteProps) => {
  const response = await BaseRequest({
    url: 'instance/delete',
    method: 'DELETE',
    ...props,
  })
  return !!response
}

export const startInstance = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'instance/start',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const onWAFInstance = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'instance/on_waf',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const offWAFInstance = async (props: DeleteProps) => {
  const response = await BaseRequest({
    url: 'instance/off_waf',
    method: 'DELETE',
    ...props,
  })
  return !!response
}

export const stopInstance = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'instance/stop',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const resumeInstance = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'instance/resume',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const suspendInstance = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'instance/suspend',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const rebootInstance = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'instance/reboot',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const remoteInstance = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'instance/console',
    method: 'POST',
    ...props,
  })
  return response
}

export const listAvailabilityZones = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'instance/listAZ',
    method: 'GET',
    ...props,
  })
  return response
}

export const listImage = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'image/listImage',
    method: 'GET',
    ...props,
  })
  return response
}
// #endregion

// #region [Flavor]
export const listFlavor = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'flavor/list',
    method: 'GET',
    ...props,
  })
  return response || []
}

export const createFlavor = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'flavor/create',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const deleteFlavor = async (props: DeleteProps) => {
  const response = await BaseRequest({
    url: 'flavor/delete',
    method: 'DELETE',
    ...props,
  })
  return !!response
}
// #endregion

// #region [Keypair]
export const listKeypair = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'keypair/list',
    method: 'GET',
    ...props,
  })
  return response || []
}

export const createKeypair = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'keypair/create',
    method: 'POST',
    ...props,
  })
  return response
}

export const deleteKeypair = async (props: DeleteProps) => {
  const response = await BaseRequest({
    url: 'keypair/delete',
    method: 'DELETE',
    ...props,
  })
  return !!response
}

export const importKeypair = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'keypair/import',
    method: 'POST',
    ...props,
  })
  return !!response
}
// #endregion

// #region [ImageService]
export const listImageService = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'imageService/listImages',
    method: 'GET',
    ...props,
  })
  return response || []
}

export const listImageServiceData = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'imageService/listImageData',
    method: 'GET',
    ...props,
  })
  return response
}

export const createImageService = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'imageService/createImage',
    method: 'POST',
    ...props,
  })
  return !!response
}
// #endregion

// #region [Volume]
export const listVolume = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'volume/list',
    method: 'GET',
    ...props,
  })
  return response || []
}

export const createVolume = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'volume/create',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const deleteVolume = async (props: DeleteProps) => {
  const response = await BaseRequest({
    url: 'volume/delete',
    method: 'DELETE',
    ...props,
  })
  return !!response
}

export const extendVolume = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'volume/extend',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const snapshotVolume = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'volume/createSnapshot',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const attachVolume = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'volume/attach',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const detachVolume = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'volume/detach',
    method: 'POST',
    ...props,
  })
  return !!response
}
// #endregion

// #region [Snapshot]
export const listSnapshot = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'snapshot/list',
    method: 'GET',
    ...props,
  })
  return response || []
}

export const deleteSnapshot = async (props: DeleteProps) => {
  const response = await BaseRequest({
    url: 'snapshot/delete',
    method: 'DELETE',
    ...props,
  })
  return !!response
}
// #endregion

// #region [SecurityGroup]
export const listSecurityGroup = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'security_group/list',
    method: 'GET',
    ...props,
  })
  return response || []
}

export const getSecurityGroup = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'security_group/get',
    method: 'POST',
    ...props,
  })
  return response || {}
}

export const createSecurityGroup = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'security_group/create',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const updateSecurityGroup = async (props: PutProps) => {
  const response = await BaseRequest({
    url: 'security_group/update',
    method: 'PUT',
    ...props,
  })
  return !!response
}

export const deleteSecurityGroup = async (props: DeleteProps) => {
  const response = await BaseRequest({
    url: 'security_group/delete',
    method: 'DELETE',
    ...props,
  })
  return !!response
}
// #endregion

// #region [SecurityGroupRule]
export const createSecurityGroupRule = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'security_group/rule/create',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const deleteSecurityGroupRule = async (props: DeleteProps) => {
  const response = await BaseRequest({
    url: 'security_group/rule/delete',
    method: 'DELETE',
    ...props,
  })
  return !!response
}
// #endregion

// #region [FloatingIP]
export const listFloatingIP = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'network/listFloatingIPs',
    method: 'GET',
    ...props,
  })
  return response || []
}

export const createFloatingIP = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'network/createFloatingIP',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const deleteFloatingIP = async (props: DeleteProps) => {
  const response = await BaseRequest({
    url: 'network/deleteFloatingIP',
    method: 'DELETE',
    ...props,
  })
  return !!response
}
// #endregion

// #region [Project]
export const listProject = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'projects/list',
    method: 'GET',
    ...props,
  })
  return response || []
}

export const getProject = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'projects/get',
    method: 'POST',
    ...props,
  })
  return response || {}
}

export const getProjectUserQuota = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'projects/user/quota',
    method: 'POST',
    ...props,
  })
  return response || {}
}

export const createProject = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'projects/create',
    method: 'POST',
    ...props,
  })
  return response
}

export const updateProject = async (props: PutProps) => {
  const response = await BaseRequest({
    url: 'projects/update',
    method: 'PUT',
    ...props,
  })
  return !!response
}

export const deleteProject = async (props: DeleteProps) => {
  const response = await BaseRequest({
    url: 'projects/delete',
    method: 'DELETE',
    ...props,
  })
  return !!response
}

// #region [ProjectMember]
export const createProjectMember = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'projects/member/create',
    method: 'POST',
    ...props,
  })
  return response
}

export const updateProjectMember = async (props: PutProps) => {
  const response = await BaseRequest({
    url: 'projects/member/update',
    method: 'PUT',
    ...props,
  })
  return !!response
}

export const deleteProjectMember = async (props: DeleteProps) => {
  const response = await BaseRequest({
    url: 'projects/member/delete',
    method: 'DELETE',
    ...props,
  })
  return !!response
}
// #endregion
// #endregion

// #region [Role]
export const listRole = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'roles/list',
    method: 'GET',
    ...props,
  })
  return response || []
}

export const getRole = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'roles/get',
    method: 'POST',
    ...props,
  })
  return response || {}
}

export const createRole = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'roles/create',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const updateRole = async (props: PutProps) => {
  const response = await BaseRequest({
    url: 'roles/update',
    method: 'PUT',
    ...props,
  })
  return !!response
}

export const updateRolePermission = async (props: PutProps) => {
  const response = await BaseRequest({
    url: 'roles/update/permission',
    method: 'PUT',
    ...props,
  })
  return !!response
}

export const deleteRole = async (props: DeleteProps) => {
  const response = await BaseRequest({
    url: 'roles/delete',
    method: 'DELETE',
    ...props,
  })
  return !!response
}
// #endregion

// #region [Permission]
export const listPermission = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'permissions/list',
    method: 'GET',
    ...props,
  })
  return response || []
}

export const createPermission = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'permissions/create',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const updatePermission = async (props: PutProps) => {
  const response = await BaseRequest({
    url: 'permissions/update',
    method: 'PUT',
    ...props,
  })
  return !!response
}

export const deletePermission = async (props: DeleteProps) => {
  const response = await BaseRequest({
    url: 'permissions/delete',
    method: 'DELETE',
    ...props,
  })
  return !!response
}
// #endregion

// #region [User]
export const listUser = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'user/list',
    method: 'GET',
    ...props,
  })
  return response || []
}

export const createUser = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'user/create',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const updateUser = async (props: PutProps) => {
  const response = await BaseRequest({
    url: 'user/update',
    method: 'PUT',
    ...props,
  })
  return !!response
}

export const deleteUser = async (props: DeleteProps) => {
  const response = await BaseRequest({
    url: 'user/delete',
    method: 'DELETE',
    ...props,
  })
  return !!response
}

export const listUserProjects = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'user/projects',
    method: 'GET',
    ...props,
  })
  return response || []
}
// #endregion

// #region [LoadBalancer]
export const listLoadBalancer = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'lbaas/list',
    method: 'GET',
    ...props,
  })
  return response || []
}

export const getLoadBalancer = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'lbaas/get',
    method: 'POST',
    ...props,
  })
  return response || {}
}

export const createLoadBalancer = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'lbaas/create',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const deleteLoadBalancer = async (props: DeleteProps) => {
  const response = await BaseRequest({
    url: 'lbaas/delete',
    method: 'DELETE',
    ...props,
  })
  return !!response
}

export const updateLoadBalancer = async (props: PutProps) => {
  const response = await BaseRequest({
    url: 'lbaas/update',
    method: 'PUT',
    ...props,
  })
  return !!response
}
// #endregion

// #region [ListenerLoadBalancer]
export const listListenerLoadBalancer = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'lbaas/listener/list',
    method: 'POST',
    ...props,
  })
  return response || []
}

export const getListenerLoadBalancer = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'lbaas/listener/get',
    method: 'POST',
    ...props,
  })
  return response || {}
}

export const createListenerLoadBalancer = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'lbaas/listener/create',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const deleteListenerLoadBalancer = async (props: DeleteProps) => {
  const response = await BaseRequest({
    url: 'lbaas/listener/delete',
    method: 'DELETE',
    ...props,
  })
  return !!response
}

export const updateListenerLoadBalancer = async (props: PutProps) => {
  const response = await BaseRequest({
    url: 'lbaas/listener/update',
    method: 'PUT',
    ...props,
  })
  return !!response
}
// #endregion

// #region [PoolLoadBalancer]
export const listPoolLoadBalancer = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'lbaas/pool/list',
    method: 'POST',
    ...props,
  })
  return response || []
}

export const getPoolLoadBalancer = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'lbaas/pool/get',
    method: 'POST',
    ...props,
  })
  return response || {}
}

export const createPoolLoadBalancer = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'lbaas/pool/create',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const deletePoolLoadBalancer = async (props: DeleteProps) => {
  const response = await BaseRequest({
    url: 'lbaas/pool/delete',
    method: 'DELETE',
    ...props,
  })
  return !!response
}

export const updatePoolLoadBalancer = async (props: PutProps) => {
  const response = await BaseRequest({
    url: 'lbaas/pool/update',
    method: 'PUT',
    ...props,
  })
  return !!response
}
// #endregion

// #region [MonitorLoadBalancer]
export const listMonitorLoadBalancer = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'lbaas/monitor/list',
    method: 'POST',
    ...props,
  })
  return response || []
}

export const getMonitorLoadBalancer = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'lbaas/monitor/get',
    method: 'POST',
    ...props,
  })
  return response || {}
}

export const createMonitorLoadBalancer = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'lbaas/monitor/create',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const deleteMonitorLoadBalancer = async (props: DeleteProps) => {
  const response = await BaseRequest({
    url: 'lbaas/monitor/delete',
    method: 'DELETE',
    ...props,
  })
  return !!response
}

export const updateMonitorLoadBalancer = async (props: PutProps) => {
  const response = await BaseRequest({
    url: 'lbaas/monitor/update',
    method: 'PUT',
    ...props,
  })
  return !!response
}
// #endregion

// #region [PoolMemberLoadBalancer]
export const listPoolMemberLoadBalancer = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'lbaas/pool_member/list',
    method: 'POST',
    ...props,
  })
  return response || []
}

export const getPoolMemberLoadBalancer = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'lbaas/pool_member/get',
    method: 'POST',
    ...props,
  })
  return response || {}
}

export const createPoolMemberLoadBalancer = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'lbaas/pool_member/create',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const deletePoolMemberLoadBalancer = async (props: DeleteProps) => {
  const response = await BaseRequest({
    url: 'lbaas/pool_member/delete',
    method: 'DELETE',
    ...props,
  })
  return !!response
}

export const updatePoolMemberLoadBalancer = async (props: PutProps) => {
  const response = await BaseRequest({
    url: 'lbaas/pool_member/update',
    method: 'PUT',
    ...props,
  })
  return !!response
}
// #endregion

// #region [Network]
export const listNetwork = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'network/list',
    method: 'GET',
    ...props,
  })
  return response || []
}

export const getNetwork = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'network/get',
    method: 'POST',
    ...props,
  })
  return response || {}
}

export const createNetwork = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'network/create',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const deleteNetwork = async (props: DeleteProps) => {
  const response = await BaseRequest({
    url: 'network/delete',
    method: 'DELETE',
    ...props,
  })
  return !!response
}
export const updateNetwork = async (props: PutProps) => {
  const response = await BaseRequest({
    url: 'network/update',
    method: 'PUT',
    ...props,
  })
  return !!response
}
// #endregion

// #region [Subnet]
export const listAllSubnet = async () => {
  const response = await BaseRequest({
    url: 'network/listSubnetFromPrivate',
    method: 'GET',
  })
  return response || []
}

export const getSubnet = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'network/subnet/get',
    method: 'POST',
    ...props,
  })
  return response || {}
}

export const createSubnet = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'network/subnet/create',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const deleteSubnet = async (props: DeleteProps) => {
  const response = await BaseRequest({
    url: 'network/subnet/delete',
    method: 'DELETE',
    ...props,
  })
  return !!response
}
export const updateSubnet = async (props: PutProps) => {
  const response = await BaseRequest({
    url: 'network/subnet/update',
    method: 'PUT',
    ...props,
  })
  return !!response
}
// #endregion

// #region [Port]
export const listPort = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'network/port/list',
    method: 'POST',
    ...props,
  })
  return response || []
}

export const getPort = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'network/port/get',
    method: 'POST',
    ...props,
  })
  return response || {}
}

export const createPort = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'network/port/create',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const deletePort = async (props: DeleteProps) => {
  const response = await BaseRequest({
    url: 'network/port/delete',
    method: 'DELETE',
    ...props,
  })
  return !!response
}
export const updatePort = async (props: PutProps) => {
  const response = await BaseRequest({
    url: 'network/port/update',
    method: 'PUT',
    ...props,
  })
  return !!response
}
// #endregion

// #region [Router]
export const listRouter = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'network/router/list',
    method: 'GET',
    ...props,
  })
  return response || []
}

export const getRouter = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'network/router/get',
    method: 'POST',
    ...props,
  })
  return response || {}
}

export const createRouter = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'network/router/create',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const deleteRouter = async (props: DeleteProps) => {
  const response = await BaseRequest({
    url: 'network/router/delete',
    method: 'DELETE',
    ...props,
  })
  return !!response
}

export const updateRouter = async (props: PutProps) => {
  const response = await BaseRequest({
    url: 'network/router/update',
    method: 'PUT',
    ...props,
  })
  return !!response
}
// #endregion

// #region [Interface]
export const listInterface = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'network/router/interface/list',
    method: 'POST',
    ...props,
  })
  return response || []
}

export const listSubnet = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'network/subnet/list',
    method: 'POST',
    ...props,
  })
  return response || []
}

export const getInterface = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'network/interface/get',
    method: 'POST',
    ...props,
  })
  return response || {}
}

export const createInterface = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'network/router/addInterfaceSubnet',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const deleteInterface = async (props: DeleteProps) => {
  const response = await BaseRequest({
    url: 'network/router/removeInterfacePort',
    method: 'DELETE',
    ...props,
  })
  return !!response
}
export const updateInterface = async (props: PutProps) => {
  const response = await BaseRequest({
    url: 'network/interface/update',
    method: 'PUT',
    ...props,
  })
  return !!response
}

export const associateFIP = async (props: PutProps) => {
  const response = await BaseRequest({
    url: 'network/associateFIP',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const disassociatedFIP = async (props: PutProps) => {
  const response = await BaseRequest({
    url: 'network/disassociatedFIP',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const listIntanceInterfaces = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'interface/listServerInterface',
    method: 'POST',
    ...props,
  })
  return response || {}
}

export const getIntanceInterface = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'interface/getServerInterface',
    method: 'POST',
    ...props,
  })
  return response || {}
}

export const attachInterface = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'interface/createServerInterface',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const detachInterface = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'interface/deleteServerInterface',
    method: 'DELETE',
    ...props,
  })
  return !!response
}
// #endregion

// #region [SystemInformation]
export const listService = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'system/services',
    method: 'GET',
    ...props,
  })
  return response || []
}

export const listComputeService = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'system/compute/service',
    method: 'GET',
    ...props,
  })
  return response || []
}

export const listBlockStorageService = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'system/blockstorage/service',
    method: 'GET',
    ...props,
  })
  return response || []
}

export const listNetworkAgent = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'system/network/agent',
    method: 'GET',
    ...props,
  })
  return response || []
}
// #endregion

// #region [AWS]
// #region [Credential]
export const listAwsCredential = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'credentials/list',
    method: 'GET',
    ...props,
  })
  return response || []
}

export const createAwsCredential = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'credentials',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const updateAwsCredential = async (props: PutProps) => {
  const response = await BaseRequest({
    url: 'credentials/update',
    method: 'PUT',
    ...props,
  })
  return !!response
}

export const updateAwsCredentialDefault = async (props: PutProps) => {
  const response = await BaseRequest({
    url: 'credentials/update/default',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const deleteAwsCredential = async (id: number) => {
  const response = await BaseRequest({
    url: `credentials/${id}`,
    method: 'DELETE',
  })
  return !!response
}
// #endregion

// #region [Keypair]
export const listAwsKeypair = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'aws/key_pair/list',
    method: 'GET',
    ...props,
  })
  return response || []
}

export const createAwsKeypair = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'aws/key_pair/create',
    method: 'POST',
    ...props,
  })
  return response
}

export const deleteAwsKeypair = async (props: DeleteProps) => {
  const response = await BaseRequest({
    url: 'aws/key_pair/delete',
    method: 'DELETE',
    ...props,
  })
  return !!response
}
// #endregion

// #region [Security group]
export const listAwsSecurityGroup = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'aws/security_group/list',
    method: 'GET',
    ...props,
  })
  return response || []
}

export const getAwsSecurityGroup = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'aws/security_group/get',
    method: 'POST',
    ...props,
  })
  return response || {}
}

export const createAwsSecurityGroup = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'aws/security_group/create',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const updateAwsSecurityGroup = async (props: PutProps) => {
  const response = await BaseRequest({
    url: 'aws/security_group/update',
    method: 'PUT',
    ...props,
  })
  return !!response
}

export const deleteAwsSecurityGroup = async (props: DeleteProps) => {
  const response = await BaseRequest({
    url: 'aws/security_group/delete',
    method: 'DELETE',
    ...props,
  })
  return !!response
}
// #endregion

// #region [Instance]
export const listAwsInstance = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'aws/ec2/list',
    method: 'GET',
    ...props,
  })
  return response || []
}

export const createAwsInstance = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'aws/ec2/create',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const updateAwsInstance = async (props: PutProps) => {
  const response = await BaseRequest({
    url: 'aws/ec2/update',
    method: 'PUT',
    ...props,
  })
  return !!response
}

export const actionAwsInstance = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'aws/ec2/actions',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const listAwsFlavor = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'aws/ec2_types/list',
    method: 'GET',
    ...props,
  })
  return response
}

export const listAwsImage = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'aws/images/list',
    method: 'GET',
    ...props,
  })
  return response
}
// #endregion

// #region [Volume]
export const listAwsVolume = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'aws/volume/list',
    method: 'GET',
    ...props,
  })
  return response || []
}

export const createAwsVolume = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'aws/volume/create',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const attachAwsVolume = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'aws/volume/attach',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const detachAwsVolume = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'aws/volume/detach',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const updateAwsVolume = async (props: PutProps) => {
  const response = await BaseRequest({
    url: 'aws/volume/update',
    method: 'PUT',
    ...props,
  })
  return !!response
}

export const deleteAwsVolume = async (props: DeleteProps) => {
  const response = await BaseRequest({
    url: 'aws/volume/delete',
    method: 'DELETE',
    ...props,
  })
  return !!response
}
// #endregion

// #region [AZ]
export const listAwsAZ = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'aws/az/list',
    method: 'GET',
    ...props,
  })
  return response || []
}
// #endregion

// #region [Route 53]
// #region [Hosted zone]
export const listAwsHostedZone = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'aws/route53/hostedzone/list',
    method: 'GET',
    ...props,
  })
  return response || []
}

export const createAwsHostedZone = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'aws/route53/hostedzone/create',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const getAwsHostedZone = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'aws/route53/hostedzone/get',
    method: 'POST',
    ...props,
  })
  return response || {}
}

export const deleteAwsHostedZone = async (props: DeleteProps) => {
  const response = await BaseRequest({
    url: 'aws/route53/hostedzone/delete',
    method: 'DELETE',
    ...props,
  })
  return !!response
}

// #region [Record]
export const listAwsHostedZoneRecord = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'aws/route53/hostedzone/record/list',
    method: 'POST',
    ...props,
  })
  return response || []
}

export const createAwsHostedZoneRecord = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'aws/route53/hostedzone/record/create',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const deleteAwsHostedZoneRecord = async (props: DeleteProps) => {
  const response = await BaseRequest({
    url: 'aws/route53/hostedzone/record/delete',
    method: 'DELETE',
    ...props,
  })
  return !!response
}
// #endregion
// #endregion

// #region [Health check]
export const listAwsHealthCheck = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'aws/route53/healthcheck/list',
    method: 'GET',
    ...props,
  })
  return response || []
}

export const createAwsHealthCheck = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'aws/route53/healthcheck/create',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const updateAwsHealthCheck = async (props: PutProps) => {
  const response = await BaseRequest({
    url: 'aws/route53/healthcheck/update',
    method: 'PUT',
    ...props,
  })
  return !!response
}

export const getAwsHealthCheck = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'aws/route53/healthcheck/get',
    method: 'POST',
    ...props,
  })
  return response || {}
}

export const statusAwsHealthCheck = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'aws/route53/healthcheck/status',
    method: 'POST',
    ...props,
  })
  return response || {}
}

export const deleteAwsHealthCheck = async (props: DeleteProps) => {
  const response = await BaseRequest({
    url: 'aws/route53/healthcheck/delete',
    method: 'DELETE',
    ...props,
  })
  return !!response
}
// #endregion
// #endregion

// #region [Billing]
export const getCostAwsBilling = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'aws/getcost',
    method: 'POST',
    ...props,
  })
  return response || []
}

export const forecastAwsBilling = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'aws/forecast',
    method: 'POST',
    ...props,
  })
  return response || []
}

// #region [Alarm]
export const listAwsBillingAlarm = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'aws/alarm/billing/list',
    method: 'GET',
    ...props,
  })
  return response || []
}

export const createAwsBillingAlarm = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'aws/alarm/billing/create',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const getAwsBillingAlarm = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'aws/alarm/billing/get',
    method: 'POST',
    ...props,
  })
  return response || {}
}

export const deleteAwsBillingAlarm = async (props: DeleteProps) => {
  const response = await BaseRequest({
    url: 'aws/alarm/billing/delete',
    method: 'DELETE',
    ...props,
  })
  return !!response
}
// #endregion
// #endregion

// #region [Cloud watch]
export const monitorAwsHealthCheck = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'aws/cloudwatch/healthcheckMonitor',
    method: 'POST',
    ...props,
  })
  return response || {}
}
// #endregion

// #region [SNS]
export const listAwsSNSTopic = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'aws/sns/topic/list',
    method: 'GET',
    ...props,
  })
  return response || []
}
// #endregion
// #endregion

// #region [Ics]
// #region [Instance]
export const createIcsInstance = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'ics/instance/create',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const actionLogIcsInstance = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'ics/instance/action',
    method: 'POST',
    ...props,
  })
  return response || []
}

export const consoleLogIcsInstance = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'ics/instance/showConsole',
    method: 'POST',
    ...props,
  })
  return response
}

export const listIcsInstance = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'ics/instance/list',
    method: 'GET',
    ...props,
  })
  return response || []
}

export const getIcsInstance = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'ics/instance/get',
    method: 'POST',
    ...props,
  })
  return response || {}
}

export const updateIcsInstance = async (props: PutProps) => {
  const response = await BaseRequest({
    url: 'ics/instance/resize',
    method: 'PUT',
    ...props,
  })
  return !!response
}

export const revertUpdateIcsInstance = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'ics/instance/revertResize',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const confirmUpdateIcsInstance = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'ics/instance/confirmResize',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const icsCreateInstance = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'ics/instance/create',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const deleteIcsInstance = async (props: DeleteProps) => {
  const response = await BaseRequest({
    url: 'ics/instance/delete',
    method: 'DELETE',
    ...props,
  })
  return !!response
}

export const startIcsInstance = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'ics/instance/start',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const stopIcsInstance = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'ics/instance/stop',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const resumeIcsInstance = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'ics/instance/resume',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const suspendIcsInstance = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'ics/instance/suspend',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const rebootIcsInstance = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'ics/instance/reboot',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const remoteIcsInstance = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'ics/instance/console',
    method: 'POST',
    ...props,
  })
  return response
}

export const listIcsAvailabilityZones = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'ics/instance/listAZ',
    method: 'GET',
    ...props,
  })
  return response
}

export const snapshotIcsInstance = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'ics/instance/createSnapshot',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const listIcsImage = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'ics/image/listImage',
    method: 'GET',
    ...props,
  })
  return response
}
// #endregion

// #region [Flavor]
export const listIcsFlavor = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'ics/flavor/list',
    method: 'GET',
    ...props,
  })
  return response || []
}
// #endregion

// #region [Network]
export const listIcsNetwork = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'ics/network/list',
    method: 'GET',
    ...props,
  })
  return response || []
}
// #endregion

// #region [Volume]
export const listIcsVolume = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'ics/volume/list',
    method: 'GET',
    ...props,
  })
  return response || []
}

export const createIcsVolume = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'ics/volume/create',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const deleteIcsVolume = async (props: DeleteProps) => {
  const response = await BaseRequest({
    url: 'ics/volume/delete',
    method: 'DELETE',
    ...props,
  })
  return !!response
}

export const extendIcsVolume = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'ics/volume/extend',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const snapshotIcsVolume = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'ics/volume/createSnapshot',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const attachIcsVolume = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'ics/volume/attach',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const detachIcsVolume = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'ics/volume/detach',
    method: 'POST',
    ...props,
  })
  return !!response
}
// #endregion

// #region [Snapshot]
export const listIcsSnapshot = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'ics/snapshot/list',
    method: 'GET',
    ...props,
  })
  return response || []
}

export const launchIcsSnapshot = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'ics/snapshot/launch',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const deleteIcsSnapshot = async (props: DeleteProps) => {
  const response = await BaseRequest({
    url: 'ics/snapshot/delete',
    method: 'DELETE',
    ...props,
  })
  return !!response
}
// #endregion

// #region [Keypair]
export const listIcsKeypair = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'ics/keypair/list',
    method: 'GET',
    ...props,
  })
  return response || []
}

export const createIcsKeypair = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'ics/keypair/create',
    method: 'POST',
    ...props,
  })
  return response
}

export const deleteIcsKeypair = async (props: DeleteProps) => {
  const response = await BaseRequest({
    url: 'ics/keypair/delete',
    method: 'DELETE',
    ...props,
  })
  return !!response
}

export const importIcsKeypair = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'ics/keypair/import',
    method: 'POST',
    ...props,
  })
  return !!response
}
// #endregion

// #region [SecurityGroup]
export const listIcsSecurityGroup = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'ics/securitygroup/list',
    method: 'GET',
    ...props,
  })
  return response || []
}

export const createIcsSecurityGroup = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'ics/securitygroup/create',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const updateIcsSecurityGroup = async (props: PutProps) => {
  const response = await BaseRequest({
    url: 'ics/securitygroup/update',
    method: 'PUT',
    ...props,
  })
  return !!response
}

export const deleteIcsSecurityGroup = async (props: DeleteProps) => {
  const response = await BaseRequest({
    url: 'ics/securitygroup/delete',
    method: 'DELETE',
    ...props,
  })
  return !!response
}
// #endregion

// #region [SecurityGroupRule]
export const createIcsSecurityGroupRule = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'ics/securitygroup/rule/create',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const deleteIcsSecurityGroupRule = async (props: DeleteProps) => {
  const response = await BaseRequest({
    url: 'ics/securitygroup/rule/delete',
    method: 'DELETE',
    ...props,
  })
  return !!response
}
// #endregion

// #region [Credential]
export const listIcsCredential = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'ics/credential/list',
    method: 'GET',
    ...props,
  })
  return response || []
}

export const createIcsCredential = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'ics/credential/create',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const updateIcsCredential = async (props: PutProps) => {
  const response = await BaseRequest({
    url: 'ics/credential/update',
    method: 'PUT',
    ...props,
  })
  return !!response
}

export const updateIcsCredentialDefault = async (props: PutProps) => {
  const response = await BaseRequest({
    url: 'ics/credential/update/default',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const deleteIcsCredential = async (props: DeleteProps) => {
  const response = await BaseRequest({
    url: 'ics/credential/delete',
    method: 'DELETE',
    ...props,
  })
  return !!response
}
// #endregion

// #region [Billing]
export const getIcsBilling = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'ics/bill/detail',
    method: 'GET',
    ...props,
  })
  return response || []
}

export const getMonthBillingChart = async (year: number, month: number) => {
  const response = await BaseRequest({
    url: `ics/bill/month/chart/${year}/${month}`,
    method: 'GET',
  })
  return response || []
}

export const createIcsAlarm = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'ics/bill/alarm/create',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const deleteIcsAlarm = async (props: DeleteProps) => {
  const response = await BaseRequest({
    url: 'ics/bill/alarm/delete',
    method: 'DELETE',
    ...props,
  })
  return !!response
}
// #endregion
// #endregion

// #region [Hyervisor]
export const listHypervisor = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'hypervisor/list',
    method: 'GET',
    ...props,
  })
  return response || []
}

export const showHypervisor = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'hypervisor/show',
    method: 'POST',
    ...props,
  })
  return response || []
}

export const statisticsHypervisor = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'hypervisor/statistics',
    method: 'GET',
    ...props,
  })
  return response || []
}

export const tenantUsageHypervisor = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'hypervisor/tenantUsage',
    method: 'POST',
    ...props,
  })
  return response || []
}

export const showUptimeHypervisor = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'hypervisor/showUptime',
    method: 'POST',
    ...props,
  })
  return response || []
}
// #endregion

// #region [ActionLog]
export const listActionLog = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'system/actionLog',
    method: 'POST',
    ...props,
  })
  return response || []
}
// #endregion

// #region [Object storage]
// #region [Bucket]
export const listBucket = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'objectstorages3/bucket/list',
    method: 'POST',
    ...props,
  })
  return response || []
}

export const listCloudBucket = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'noobaa/bucket/list',
    method: 'GET',
    ...props,
  })
  return response || []
}

export const createCloudBucket = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'noobaa/bucket',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const createBucket = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'objectstorages3/bucket/create',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const getBucketPolicy = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'objectstorages3/bucket/get/policy',
    method: 'POST',
    ...props,
  })
  return response
}

export const setBucketPolicy = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'objectstorages3/bucket/set/policy',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const deleteBucket = async (props: DeleteProps) => {
  const response = await BaseRequest({
    url: 'objectstorages3/bucket/delete',
    method: 'DELETE',
    ...props,
  })
  return !!response
}

export const checkAccessCloudBucket = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'noobaa/account/check-nbi',
    method: 'GET',
    ...props,
  })
  return response || false
}

export const setupCloudBucket = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'noobaa/account',
    method: 'POST',
    ...props,
  })
  return !!response
}

// #region [Cloud connection]
export const listCloudConnection = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'noobaa/account/connection',
    method: 'GET',
    ...props,
  })
  return response || []
}

export const createCloudConnection = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'noobaa/account/add-connection',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const checkCloudConnection = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'noobaa/account/check-connection',
    method: 'POST',
    ...props,
  })
  return response
}
// #endregion

// #region [Cloud resource]
export const listCloudResource = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'noobaa/pool',
    method: 'GET',
    ...props,
  })
  return response || []
}

export const createCloudResource = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'noobaa/pool/cloud',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const getCloudBuckets = async (props: GetProps, name: string) => {
  const response = await BaseRequest({
    url: `noobaa/bucket/cloud/${name}`,
    method: 'GET',
    ...props,
  })
  return response || []
}
// #endregion
// #endregion

// #region [Object]
export const listObject = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'objectstorages3/bucket/object/list',
    method: 'POST',
    ...props,
  })
  return response || []
}

export const createObject = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'objectstorages3/bucket/object/putpresinedurl',
    method: 'POST',
    ...props,
  })
  return response as { file_name: string; presign_url: string }[]
}

export const getObject = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'objectstorages3/bucket/object/get',
    method: 'POST',
    ...props,
  })
  return response || {}
}

export const linkObject = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'objectstorages3/bucket/object/link',
    method: 'POST',
    ...props,
  })
  return response
}

export const deleteObject = async (props: DeleteProps) => {
  const response = await BaseRequest({
    url: 'objectstorages3/bucket/object/delete',
    method: 'DELETE',
    ...props,
  })
  return !!response
}

export const getObjectParts = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'noobaa/object/parts',
    method: 'POST',
    ...props,
  })
  return response || {}
}

export const copyObject = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'objectstorages3/bucket/object/copy',
    method: 'POST',
    ...props,
  })
  return !!response
}
// #endregion

// #region [Folder]
export const createFolder = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'objectstorages3/bucket/folder/create',
    method: 'POST',
    ...props,
  })
  return !!response
}
// #endregion

// #region [api_key]
export const getAPIkey = async () => {
  const response = await BaseRequest({
    url: 'objectstorages3/api',
    method: 'GET',
  })
  return response
}

export const generateAPIkey = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'objectstorages3/api',
    method: 'POST',
    ...props,
  })
  return !!response
}

// #endregion

// region [prometheus]
export const getNumberOfVMs = async (time: number) => {
  const response = await BaseRequest({
    url: `monitor/query/number_of_vm/${time}/${time * 1000}`,
    method: 'GET',
  })
  return response || {}
}

export const getRunningVMsOnComputer = async (time: number) => {
  const response = await BaseRequest({
    url: `monitor/query/running_vm_on_computer/${time}/${time * 1000}`,
    method: 'GET',
  })
  return response || {}
}

export const getFreeSpaceOnCinder = async (time: number) => {
  const response = await BaseRequest({
    url: `monitor/query/free_space_on_cinder/${time}/${time * 1000}`,
    method: 'GET',
  })
  return response || {}
}

export const getUsedSpaceOnCinder = async (time: number) => {
  const response = await BaseRequest({
    url: `monitor/query/used_space_on_cinder/${time}/${time * 1000}`,
    method: 'GET',
  })
  return response || {}
}

export const getAllIp = async (time: number) => {
  const response = await BaseRequest({
    url: `monitor/query/all_ip/${time}/${time * 1000}`,
    method: 'GET',
  })
  return response || {}
}

export const getUsedIp = async (time: number) => {
  const response = await BaseRequest({
    url: `monitor/query/used_ip/${time}/${time * 1000}`,
    method: 'GET',
  })
  return response || {}
}

export const getTotalCpu = async (time: number) => {
  const response = await BaseRequest({
    url: `monitor/query/total_cpu/${time}/${time * 1000}`,
    method: 'GET',
  })
  return response || {}
}

export const getAvailableCpu = async (time: number) => {
  const response = await BaseRequest({
    url: `monitor/query/available_cpu/${time}/${time * 1000}`,
    method: 'GET',
  })
  return response || {}
}

export const getTotalRam = async (time: number) => {
  const response = await BaseRequest({
    url: `monitor/query/total_ram/${time}/${time * 1000}`,
    method: 'GET',
  })
  return response || {}
}

export const getAvailableRam = async (time: number) => {
  const response = await BaseRequest({
    url: `monitor/query/available_ram/${time}/${time * 1000}`,
    method: 'GET',
  })
  return response || {}
}

export const getVolumes = async (time: number) => {
  const response = await BaseRequest({
    url: `monitor/query/volumes/${time}/${time * 1000}`,
    method: 'GET',
  })
  return response || {}
}

export const getSnapshots = async (time: number) => {
  const response = await BaseRequest({
    url: `monitor/query/snapshots/${time}/${time * 1000}`,
    method: 'GET',
  })
  return response || {}
}

export const getFreeSpaceOnLVMs = async (time: number) => {
  const response = await BaseRequest({
    url: `monitor/query/free_space_on_lvms/${time}/${time * 1000}`,
    method: 'GET',
  })
  return response || {}
}

export const getFlavors = async (time: number) => {
  const response = await BaseRequest({
    url: `monitor/query/flavors/${time}/${time * 1000}`,
    method: 'GET',
  })
  return response || {}
}

export const getFloatingIp = async (time: number) => {
  const response = await BaseRequest({
    url: `monitor/query/floating_ip/${time}/${time * 1000}`,
    method: 'GET',
  })
  return response || {}
}

export const getRouters = async (time: number) => {
  const response = await BaseRequest({
    url: `monitor/query/routers/${time}/${time * 1000}`,
    method: 'GET',
  })
  return response || {}
}

export const getImages = async (time: number) => {
  const response = await BaseRequest({
    url: `monitor/query/images/${time}/${time * 1000}`,
    method: 'GET',
  })
  return response || {}
}

export const getNumberOfUsers = async (time: number) => {
  const response = await BaseRequest({
    url: `monitor/query/number_of_users/${time}/${time * 1000}`,
    method: 'GET',
  })
  return response || {}
}

export const getMySqlState = async (time: number) => {
  const response = await BaseRequest({
    url: `monitor/query/my_sql_state/${time}/${time * 1000}`,
    method: 'GET',
  })
  return response || {}
}

export const getCpuUsage = async (start: number, end: number) => {
  const response = await BaseRequest({
    url: `monitor/query_range/cpu_usage/${start}/${end}`,
    method: 'GET',
  })
  return response || {}
}

export const getNetworkTraffic = async (start: number, end: number) => {
  const response = await BaseRequest({
    url: `monitor/query_range/network_traffic/${start}/${end}`,
    method: 'GET',
  })
  return response || {}
}

export const getInternalNetworkTraffic = async (start: number, end: number) => {
  const response = await BaseRequest({
    url: `monitor/query_range/internal_network_traffic/${start}/${end}`,
    method: 'GET',
  })
  return response || {}
}

export const getStorageNetworkTraffic = async (start: number, end: number) => {
  const response = await BaseRequest({
    url: `monitor/query_range/storage_network_traffic/${start}/${end}`,
    method: 'GET',
  })
  return response || {}
}

export const getMemoryUsage = async (time: number) => {
  const response = await BaseRequest({
    url: `monitor/query/memory_usage/${time}/${time * 1000}`,
    method: 'GET',
  })
  return response || {}
}

export const getDiskUsage = async (time: number) => {
  const response = await BaseRequest({
    url: `monitor/query/disk_usage/${time}/${time * 1000}`,
    method: 'GET',
  })
  return response || {}
}

export const getFreeMemory = async (time: number) => {
  const response = await BaseRequest({
    url: `monitor/query/free_memory/${time}/${time * 1000}`,
    method: 'GET',
  })
  return response || {}
}

export const getFreeNodesFileSystem = async (time: number) => {
  const response = await BaseRequest({
    url: `monitor/query/free_nodes_file_system/${time}/${time * 1000}`,
    method: 'GET',
  })
  return response || {}
}

export const getUpByWeek = async (time: number) => {
  const response = await BaseRequest({
    url: `monitor/query/up_by_week/${time}/${time * 1000}`,
    method: 'GET',
  })
  return response || {}
}

// #region [Hostname]
export const getHostnames = async () => {
  const response = await BaseRequest({
    url: 'monitor/hostname/get',
    method: 'GET',
  })
  return response
}

export const changeHostnames = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'monitor/hostname/set',
    method: 'POST',
    ...props,
  })
  return response || false
}
// #endregion
// #endregion

// #region [K8s]
// #region [Namespace]
export const listK8sNamespace = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'ns',
    method: 'GET',
    ...props,
  })
  return response || {}
}

export const getK8sNamespace = async (name: string, props: GetProps) => {
  const response = await BaseRequest({
    url: `ns/${name}`,
    method: 'GET',
    ...props,
  })
  return response || {}
}

export const createK8sNamespace = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'ns',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const updateK8sNamespace = async (name: string, props: PutProps) => {
  const response = await BaseRequest({
    url: `ns/${name}`,
    method: 'PUT',
    ...props,
  })
  return response || {}
}

export const deleteK8sNamespace = async (name: string, props: DeleteProps) => {
  const response = await BaseRequest({
    url: `ns/${name}`,
    method: 'DELETE',
    ...props,
  })
  return response || {}
}
// #endregion

// #region [Deployment]
export const listK8sDeployment = async (props: GetProps, ns?: string) => {
  const response = await BaseRequest({
    url: `deploy${ns ? `?ns=${ns}` : ''}`,
    method: 'GET',
    ...props,
  })
  return response || []
}

export const getK8sDeployment = async (name: string, props: GetProps, ns?: string) => {
  const response = await BaseRequest({
    url: `deploy/${name}${ns ? `?ns=${ns}` : ''}`,
    method: 'GET',
    ...props,
  })
  return response || {}
}

export const updateK8sDeployment = async (name: string, props: PutProps, ns?: string) => {
  const response = await BaseRequest({
    url: `deploy/${name}${ns ? `?ns=${ns}` : ''}`,
    method: 'PUT',
    ...props,
  })
  return !!response
}

export const createK8sDeployment = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'deploy',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const deleteK8sDeployment = async (name: string, props: DeleteProps, ns?: string) => {
  const response = await BaseRequest({
    url: `deploy/${name}${ns ? `?ns=${ns}` : ''}`,
    method: 'DELETE',
    ...props,
  })
  return response || {}
}
// #endregion

// #region [Service]
export const listK8sService = async (props: GetProps, ns?: string) => {
  const response = await BaseRequest({
    url: `svc${ns ? `?ns=${ns}` : ''}`,
    method: 'GET',
    ...props,
  })
  return response || {}
}

export const getK8sService = async (name: string, props: GetProps, ns?: string) => {
  const response = await BaseRequest({
    url: `svc/${name}${ns ? `?ns=${ns}` : ''}`,
    method: 'GET',
    ...props,
  })
  return response || {}
}

export const createK8sService = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'svc',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const updateK8sService = async (name: string, props: PutProps, ns?: string) => {
  const response = await BaseRequest({
    url: `svc/${name}${ns ? `?ns=${ns}` : ''}`,
    method: 'PUT',
    ...props,
  })
  return response || {}
}

export const deleteK8sService = async (name: string, props: DeleteProps, ns?: string) => {
  const response = await BaseRequest({
    url: `svc/${name}${ns ? `?ns=${ns}` : ''}`,
    method: 'DELETE',
    ...props,
  })
  return response || {}
}
// #endregion

// #region [Storage class]
export const listK8sStorageClass = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'sc',
    method: 'GET',
    ...props,
  })
  return response || {}
}

export const getK8sStorageClass = async (name: string, props: GetProps) => {
  const response = await BaseRequest({
    url: `sc/${name}`,
    method: 'GET',
    ...props,
  })
  return response || {}
}

export const createK8sStorageClass = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'sc',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const deleteK8sStorageClass = async (name: string, props: DeleteProps) => {
  const response = await BaseRequest({
    url: `sc/${name}`,
    method: 'DELETE',
    ...props,
  })
  return response || {}
}
// #endregion

// #region [Persistent volume]
export const listK8sPersistentVolume = async (props: GetProps) => {
  const response = await BaseRequest({
    url: 'pv',
    method: 'GET',
    ...props,
  })
  return response || {}
}

export const getK8sPersistentVolume = async (name: string, props: GetProps) => {
  const response = await BaseRequest({
    url: `pv/${name}`,
    method: 'GET',
    ...props,
  })
  return response || {}
}

export const createK8sPersistentVolume = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'pv',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const updateK8sPersistentVolume = async (name: string, props: PutProps) => {
  const response = await BaseRequest({
    url: `pv/${name}`,
    method: 'PUT',
    ...props,
  })
  return response || {}
}

export const deleteK8sPersistentVolume = async (name: string, props: DeleteProps) => {
  const response = await BaseRequest({
    url: `pv/${name}`,
    method: 'DELETE',
    ...props,
  })
  return response || {}
}
// #endregion

// #region [Persistent volume claim]
export const listK8sPersistentVolumeClaim = async (props: GetProps, ns?: string) => {
  const response = await BaseRequest({
    url: `pvc${ns ? `?ns=${ns}` : ''}`,
    method: 'GET',
    ...props,
  })
  return response || {}
}

export const getK8sPersistentVolumeClaim = async (name: string, props: GetProps, ns?: string) => {
  const response = await BaseRequest({
    url: `pvc/${name}${ns ? `?ns=${ns}` : ''}`,
    method: 'GET',
    ...props,
  })
  return response || {}
}

export const createK8sPersistentVolumeClaim = async (props: PostProps) => {
  const response = await BaseRequest({
    url: 'pvc',
    method: 'POST',
    ...props,
  })
  return !!response
}

export const updateK8sPersistentVolumeClaim = async (name: string, props: PutProps, ns?: string) => {
  const response = await BaseRequest({
    url: `pvc/${name}${ns ? `?ns=${ns}` : ''}`,
    method: 'PUT',
    ...props,
  })
  return response || {}
}

export const deleteK8sPersistentVolumeClaim = async (name: string, props: DeleteProps, ns?: string) => {
  const response = await BaseRequest({
    url: `pvc/${name}${ns ? `?ns=${ns}` : ''}`,
    method: 'DELETE',
    ...props,
  })
  return response || {}
}
// #endregion
// #endregion
