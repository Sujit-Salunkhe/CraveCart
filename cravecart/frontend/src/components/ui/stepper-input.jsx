import { HStack, IconButton, NumberInput } from '@chakra-ui/react'
import { forwardRef } from 'react'
import { LuMinus, LuPlus } from 'react-icons/lu'

export const StepperInput = forwardRef(function StepperInput(props, ref) {
  const { label, ...rest } = props
  return (
    <NumberInput.Root {...rest} unstyled ref={ref}>
      {label && <NumberInput.Label>{label}</NumberInput.Label>}
      <HStack gap='1'>
        <DecrementTrigger />
        <NumberInput.ValueText textAlign='center' fontSize='sm' minW='3ch' />
        <IncrementTrigger />
      </HStack>
    </NumberInput.Root>
  )
})

const DecrementTrigger = forwardRef(function DecrementTrigger(props, ref) {
  return (
    <NumberInput.DecrementTrigger {...props} asChild ref={ref}>
      <IconButton variant='outlined' size='msm' className='border-2 border-red'>
        <LuMinus className='p-0'/>
      </IconButton>
    </NumberInput.DecrementTrigger>
  )
})

const IncrementTrigger = forwardRef(function IncrementTrigger(props, ref) {
  return (
    <NumberInput.IncrementTrigger {...props} asChild ref={ref}>
      <IconButton variant='outline' size='xsm' className='border-2 border-red'>
        <LuPlus  className='p-0'/>
      </IconButton>
    </NumberInput.IncrementTrigger>
  )
})
