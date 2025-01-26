import {create} from 'zustand'
import { User } from '../types/userTypes';
import { axios } from '../lib/axios';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { signUpSchemaType } from '../models/signUpSchema';
import { LoginSchemaType } from '../models/loginSchema';
import { wait } from '../lib/wait';
import capitalize from '../lib/capitalize';

interface img {
  image: File
}
interface AuthStoreTypes {
  authUser: User | null 
  isCheckingAuth: boolean
  isSigningUp: boolean
  isLoggingIn: boolean
  isUpdatingProfile: boolean
  checkAuth: () => Promise<void>
  signUp: (data: signUpSchemaType) => Promise<boolean | undefined>
  logIn: (data: LoginSchemaType) => Promise<boolean | undefined>
  logOut: () => Promise<void>
  updateProfile: (data: img) => Promise<void>
}

export const useAuthStore = create<AuthStoreTypes>((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  checkAuth: async() =>{
    try {
      const response = await axios.get('/auth/check')
      // console.log('response',response.data);
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
    set({ isSigningUp: true });
    try {
      const response = await axios.post('/auth/signup', data)
      if (response.data) {
        set({authUser: response.data.user})
        toast.success('Account created!')
        await wait(1000) 
        toast.success(`Welcome, ${capitalize(response.data.user.name)} !`)
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
    console.log('data',data);
    set({ isLoggingIn: true });
  
    try {
      const response = await axios.post('/auth/login', data)
      if (response.data) {
        set({authUser: response.data.user})
        await wait(1000)
        toast.success(`Hello, ${capitalize(response.data.user.name)} !`)

      return true
    } 
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message);
      }
      return false
    }
    finally{
      set({isLoggingIn: false})
    }
  },
  logOut: async () => {
    try {
      const response = await axios.post('/auth/logout')
      if (response.status === 200) {
        set({authUser: null})
        toast.success(`Logout successful !`)
      }
    }  catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message);
      }
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const formData = new FormData();
      formData.append('file', data.image);
      const response = await axios.put("/auth/upload", formData,{
          headers: { "Content-Type": "multipart/form-data", },
      });
      if(response.data){
      set({ authUser: response.data.user });
      toast.success(response.data.message);
    }
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message);
      }
    } finally {
      set({ isUpdatingProfile: false });
    }
  }
}))