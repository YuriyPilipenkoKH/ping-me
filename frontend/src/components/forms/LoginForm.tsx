import { zodResolver } from '@hookform/resolvers/zod'
import  { useState } from 'react'
import { loginSchema, LoginSchemaType } from '../../models/loginSchema'
import { useForm } from 'react-hook-form'
import { cn } from '../../lib/cn'
import { useAuthStore } from '../../store/useAuthStore'
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";


const LoginForm = () => {
  const {logIn} = useAuthStore()
  const [logError, setLogError] = useState<string>('')
  const [show, setShow] = useState<boolean>(false)
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
      const response = await logIn(data)
      if(response) reset()
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
          <label className={cn('formLabel  flex items-center gap-1 relative')}>
            <input 
              className={cn('grow input input-bordered' )}
              {...register('password', 
              { onChange: handleInputChange })}
              placeholder=	{( isSubmitting )? "Processing" : "•••••"}
              onClick={() => setShow(!show)}
              />
               <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={() => setShow(!show)}
        >
          {show ? (
            <EyeOff className="size-5 text-base-content/40" />
          ) : (
            <Eye className="size-5 text-base-content/40" />
          )}
        </button>
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