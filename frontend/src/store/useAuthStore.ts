import {create} from 'zustand'
import { User } from '../types/userTypes';
import {  axios } from '../lib/axios';

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

    try {
      
      const response = await axios.get('/auth/login', {
        
      })
    } catch (error) {
      
    }
  
  }

}))