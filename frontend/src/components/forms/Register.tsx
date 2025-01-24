import  { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import {  useForm } from 'react-hook-form'
import { signUpSchemaType ,signUpSchema} from '../../models/signUpSchema'
import { cn } from '../../lib/cn'


export const SignUpForm = () => {
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
  }
  const handleInputChange =   (field: keyof signUpSchemaType) => {
    if(logError) setLogError('')
    }
  return (
    <form  onSubmit={handleSubmit(onSubmit)}
    className='flex flex-col gap-4 w-full p-5'
    autoComplete="off"
    noValidate>
      <label className={cn('formLabel input input-bordered flex items-center gap-2')}>
        <input 
          className={cn('grow' )}
          {...register('name', { onChange: handleInputChange })}
            placeholder=	{( isSubmitting ) 
              ? "Processing" 
              : 'name'}
          />
          {errors.name && <div>{errors.name.message}</div>}
      </label>
      <label className={cn('formLabel input input-bordered flex items-center gap-2')}>
        <input 
          className={cn('grow' )}
          {...register('email', { onChange: handleInputChange })}
            placeholder=	{( isSubmitting ) 
              ? "Processing" 
              : 'email'}
          />
          {errors.email && <div>{errors.email.message}</div>}
      </label>
      <label className={cn('formLabel input input-bordered flex items-center gap-2')}>
        <input 
          className={cn('grow' )}
          {...register('password', { onChange: handleInputChange })}
            placeholder=	{( isSubmitting ) 
              ? "Processing" 
              : 'password'}
          />
          {errors.password && <div>{errors.password.message}</div>}
      </label>
      <button
        className='AuthFormSubmitBtn mt-auto btn btn-active btn-outline w-full'
        type='submit'
        disabled={isSubmitting || !isDirty || !isValid || !!logError}
            >
        { isLoading  ? "Sending.." :  "Sign Up.." }
      </button>

    </form>
  )
}

