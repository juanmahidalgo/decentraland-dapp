import React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Button, Field, Modal } from 'decentraland-ui'
import { Props } from './TokenTransferModal.types'
import './TokenTransferModal.css'
import { ETH_ADDRESS_REGEX } from '../../utils/address'

type Inputs = {
  amount: string
  address: string
}

const App: React.FC<Props> = ({ opened, onClose }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>()
  // TODO move the state to redux
  console.log('errors: ', errors)
  const [isTransferring, setIsTransferring] = React.useState(false)
  const onTransferHandler: SubmitHandler<Inputs> = (data) => {
    console.log('data: ', data)
    // disptach action
    console.log('transferring')
    setIsTransferring(true)
  }

  const amountFieldErrors = !!errors.amount
    ? {
        message:
          errors.amount.type === 'required'
            ? 'Please enter the amount to transfer'
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
    <Modal size="small" open={opened} onClose={onClose}>
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
          className="loading-spinner"
          onClick={handleSubmit(onTransferHandler)}
          loading={isTransferring}
        >
          SEND
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default App
