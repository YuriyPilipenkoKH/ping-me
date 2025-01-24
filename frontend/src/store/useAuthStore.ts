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
  signUp: (data: FormData) => void
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
    
  }

}))