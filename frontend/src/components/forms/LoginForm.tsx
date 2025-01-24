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
      const onSubmit = async (data: LoginSchemaType) => {
        const formData = new FormData();
        formData.append('email', data.email);
        formData.append('password', data.password);
        console.log(data);
        try {
          
          reset()
        } catch (error) {
          
        }
      }
  return (
    <div>LoginForm</div>
  )
}

export default LoginForm