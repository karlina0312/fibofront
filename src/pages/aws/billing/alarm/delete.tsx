import { notification } from 'antd'
import { deleteKeypair } from 'api'
import { DeleteModal } from 'components'
import { CloseAwaitMS } from 'configs'
import { KeyPair } from 'models'
import React, { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

interface KeypairDeleteProps {
  visible: boolean
  onOk: Function
  onCancel: Function
  keyPairs: KeyPair[]
}

const KeypairDelete: React.FC<KeypairDeleteProps> = ({ visible, onOk, onCancel, keyPairs }) => {
  const intl = useIntl()
  const [loading, setLoading] = useState<boolean>(false)
  const [vis, setVis] = useState<boolean>(visible)

  const deleteIDs = keyPairs.reduce<string[]>((acc: string[], keypair: KeyPair) => {
    return [...acc, keypair.name]
  }, [])

  let deleteNames = keyPairs.reduce<string>((acc: string, keypair: KeyPair) => {
    return `${acc}${keypair.name}, `
  }, '')
  deleteNames = deleteNames.substring(0, deleteNames.length - 2)

  const onDelete = async () => {
    setLoading(true)
    const success = await deleteKeypair({
      data: { keyPairName: deleteIDs },
    })
    setLoading(false)
    if (success) {
      notification.success({
        message: intl.formatMessage({ id: 'successful' }),
        description: `${deleteNames} keypair is deleted.`,
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
      title={<FormattedMessage id="keypair.delete_title" />}
      okText={<FormattedMessage id="delete" />}
      cancelText={<FormattedMessage id="cancel" />}
      selectedNames={deleteNames}
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

export default KeypairDelete
