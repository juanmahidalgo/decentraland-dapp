import React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Button, Field, Modal } from 'decentraland-ui'
import { Props } from './TokenTransferModal.types'
import { ETH_ADDRESS_REGEX } from '../../utils/address'

type Inputs = {
  amount: string
  address: string
}

const TokenTransferModal: React.FC<Props> = ({
  onClose,
  onTransfer,
  isTranferButtonLoading,
  tokenBalance,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>()

  const onTransferHandler: SubmitHandler<Inputs> = (data) => {
    const { amount, address } = data
    onTransfer(amount, address)
  }

  const amountFieldErrors = !!errors.amount
    ? {
        message:
          errors.amount.type === 'required'
            ? 'Please enter the amount to transfer'
            : errors.amount.type === 'sufficentBalance'
            ? 'Insufficient balance'
            : 'Amount must be positive',
      }
    : {}

  const addressFieldErrors = !!errors.address
    ? {
        message:
          errors.address.type === 'required'
            ? 'Please enter the address to transfer'
            : 'Please enter a valid ETH address',
      }
    : {}

  return (
    <Modal size="small" open={true} onClose={onClose}>
      <Modal.Header>Transfer</Modal.Header>
      <Modal.Content>
        <form onSubmit={handleSubmit(onTransferHandler)}>
          <Controller
            name="amount"
            control={control}
            rules={{
              required: true,
              validate: {
                valid: (v) => !isNaN(parseInt(v)) && parseInt(v) > 0,
                sufficentBalance: (v) => !!tokenBalance && tokenBalance > v,
              },
            }}
            defaultValue=""
            render={({ field }) => (
              <Field
                label="Amount"
                placeholder="100"
                {...field}
                {...amountFieldErrors}
                error={!!errors.amount}
              />
            )}
          />
        </form>
        <Controller
          name="address"
          control={control}
          rules={{ required: true, pattern: ETH_ADDRESS_REGEX }}
          defaultValue=""
          render={({ field }) => (
            <Field
              label="Address"
              type="address"
              placeholder="0x..."
              {...addressFieldErrors}
              error={!!errors.address}
              {...field}
            />
          )}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button
          primary
          onClick={handleSubmit(onTransferHandler)}
          loading={isTranferButtonLoading}
        >
          SEND
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default TokenTransferModal
