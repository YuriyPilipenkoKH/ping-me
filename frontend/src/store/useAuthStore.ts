import {create} from 'zustand'
import { User } from '../types/userTypes';
import {  axios } from '../lib/axios';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { signUpSchemaType } from '../models/signUpSchema';
import { LoginSchemaType } from '../models/loginSchema';

interface AuthStoreTypes {
  authUser: User | null 
  isCheckingAuth: boolean
  isSigningUp: boolean
  isLoggingdIn: boolean
  isUpdatingProfile: boolean
  checkAuth: () => void
  signUp: (data: signUpSchemaType) => Promise<boolean | undefined>
  logIn: (data: LoginSchemaType) => Promise<boolean | undefined>
}

export const useAuthStore = create<AuthStoreTypes>((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: true,
  isLoggingdIn: true,
  isUpdatingProfile: true,
  checkAuth: async() =>{
    try {
      const response = await axios.get('/auth/check')
      set({authUser: response.data})
    } catch (error) {
      set({authUser: null})
      console.log('error in checkAuth', error)
    }
    finally{
      set({isCheckingAuth: false})
    }
  },
  signUp : async (data) => {
    try {
      const response = await axios.post('/auth/signup', data)
      if (response.data) {
        toast.success('Account created!')
        set({authUser: response.data})
        return true
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message);
      }
      console.log('error in signUp', error)
      return false
    }
    finally{
      set({isSigningUp: false})
    }
  
  },
  logIn : async (data) => {
    try {
      const response = await axios.post('/auth/login', data)
      if (response.data) {
        toast.success('Login successful!')
        set({authUser: response.data})
      return true
    } 
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message);
      }
      return false
    }
    finally{
      set({isLoggingdIn: false})
    }
  }

}))