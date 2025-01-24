import  { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import {  useForm } from 'react-hook-form'
import { signUpSchemaType ,signUpSchema} from '../../models/signUpSchema'
import { cn } from '../../lib/cn'
import { useAuthStore } from '../../store/useAuthStore'


export const SignUpForm = () => {
  const {signUp} = useAuthStore()
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
    errors,
    isDirty,
    isValid ,
    isSubmitting,
    isLoading 
  } = formState
  const onSubmit = async (data: signUpSchemaType) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    console.log(data);
    try {
      const response = signUp(formData)
      
      reset()
    } catch (error) {
      
    }
  }
  const handleInputChange =   (field: keyof signUpSchemaType) => {
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
          {...register('name', 
          { onChange: handleInputChange })}
          placeholder=	{( isSubmitting )? "Processing" : 'name'}
          />
      </label>
      {errors.name && <div className='text-purple-900'>{errors.name.message}</div>}
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
        { isLoading  ? "Sending.." :  "Sign Up.." }
      </button>

    </form>
  )
}

