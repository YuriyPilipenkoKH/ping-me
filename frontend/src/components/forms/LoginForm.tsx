import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { loginSchema, LoginSchemaType } from '../../models/loginSchema'
import { useForm } from 'react-hook-form'
import { cn } from '../../lib/cn'

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
      errors,
      isDirty,
      isValid ,
      isSubmitting,
      isLoading 
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
        const handleInputChange =   (field: keyof LoginSchemaType) => {
          if(logError) setLogError('')
          }
  return (
     <form  onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-3 w-full p-5'
        autoComplete="off"
        noValidate>
         
          <label className={cn('formLabel  flex items-center gap-1')}>
            <input 
              className={cn('grow input input-bordered' )}
              {...register('email', 
              { onChange: handleInputChange })}
              placeholder=	{( isSubmitting )? "Processing" : 'email'}
              />
          </label>
          {errors.email && <div className='text-purple-900'>{errors.email.message}</div>}
          <label className={cn('formLabel  flex items-center gap-1')}>
            <input 
              className={cn('grow input input-bordered' )}
              {...register('password', 
              { onChange: handleInputChange })}
              placeholder=	{( isSubmitting )? "Processing" : 'pass'}
              />
          </label>
          {errors.password && <div className='text-purple-900'>{errors.password.message}</div>}
          <button
            className='AuthFormSubmitBtn mt-auto btn btn-active btn-primary w-full'
            type='submit'
            disabled={isSubmitting || !isDirty || !isValid || !!logError}
                >
            { isLoading  ? "Sending.." :  "Log In.." }
          </button>
    
        </form>
  )
}

export default LoginForm