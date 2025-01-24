import {create} from 'zustand'
import { User } from '../types/userTypes';
import {  axios } from '../lib/axios';
import toast from 'react-hot-toast';

interface AuthStoreTypes {
  authUser: User | null 
  isCheckingAuth: boolean
  isSigningUp: boolean
  isLoggingdIn: boolean
  isUpdatingProfile: boolean
  checkAuth: () => void
  signUp: (formData: FormData) => void
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
  signUp : async (formData) => {
    const name = formData.get('name') as string 
    const email = formData.get('email') as string 
    const password = formData.get('password') as string 
    if (!name || !email || !password) {
      throw new Error("All Fields are required");
    }
    const data = {name, email, password}

    try {
      
      const response = await axios.post('/auth/signup', data)
      if (response.data) {
        toast.success('Account created!')
        set({authUser: response.data})
      }
    } catch (error) {
      toast.error
      console.log('error in signUp', error)
    }
    finally{
      set({isSigningUp: false})
    }
  
  }

}))