import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FieldErrors, useForm } from 'react-hook-form'
import { signUpSchemaType ,signUpSchema} from '../../models/signUpSchema'

const signUpForm = () => {
  const [logError, setLogError] = useState<string>('')
  const {
    register, 
    handleSubmit,
    formState,
    reset,
  } = useForm<signUpSchemaType >({
    defaultValues: {  
        name: '',
        email: '',
        password: '' 
       },
        mode:'all',
        resolver: zodResolver(signUpSchema), })
  const {
    // errors,
    // isDirty,
    // isValid ,
    // isSubmitting,
    // isLoading 
} = formState
  return (
    <div>signUpForm</div>
  )
}

export default signUpForm