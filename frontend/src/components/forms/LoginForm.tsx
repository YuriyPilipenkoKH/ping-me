import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { loginSchema, LoginSchemaType } from '../../models/loginSchema'
import { useForm } from 'react-hook-form'

const LoginForm = () => {
  const [logError, setLogError] = useState<string>('')
   const {
      register, 
      handleSubmit,
      formState,
      reset,
    } = useForm<LoginSchemaType >({
      defaultValues: {  
          email: '',
          password: '' 
         },
          mode:'all',
          resolver: zodResolver(loginSchema), })
    const {
      // errors,
      // isDirty,
      // isValid ,
      // isSubmitting,
      // isLoading 
    } = formState
  return (
    <div>LoginForm</div>
  )
}

export default LoginForm