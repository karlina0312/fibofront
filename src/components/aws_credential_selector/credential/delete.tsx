import { notification } from 'antd'
import { deleteAwsCredential } from 'api'
import { DeleteModal } from 'components'
import { CloseAwaitMS } from 'configs'
import { AwsCredential } from 'models'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'

interface CredentialDeleteProps {
  visible: boolean
  onOk: Function
  onCancel: Function
  credential: AwsCredential
}

const CredentialDelete: React.FC<CredentialDeleteProps> = ({ visible, onOk, onCancel, credential }) => {
  const intl = useIntl()
  const [loading, setLoading] = useState<boolean>(false)
  const [vis, setVis] = useState<boolean>(visible)

  const onDelete = async () => {
    setLoading(true)
    const success = await deleteAwsCredential(credential.id)
    setLoading(false)
    if (success) {
      notification.success({
        message: intl.formatMessage({ id: 'successful' }),
        description: `${credential.description} credential is deleted.`,
      })
      setVis(false)
      setTimeout(() => {
        onOk()
      }, CloseAwaitMS)
    }
  }

  return (
    <DeleteModal
      visible={vis}
      loading={loading}
      title={intl.formatMessage({ id: 'credential.delete_title' })}
      selectedNames={credential.description}
      onCancel={() => {
        setVis(false)
        setTimeout(() => {
          onCancel()
        }, CloseAwaitMS)
      }}
      onDelete={() => {
        onDelete()
      }}
    />
  )
}

export default CredentialDelete
