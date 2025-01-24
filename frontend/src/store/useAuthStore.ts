import {create} from 'zustand'
import { User } from '../types/userTypes';

interface AuthStoreTypes {
  authUser: User | null // User is the interface from `userTypes.ts`
  isCheckingAuth: boolean
  // setAuthUser: (user: User | null) => void; // Action to update `authUser`
  // setIsCheckingAuth: (isChecking: boolean) => void; // Action to update `isCheckingAuth`
  isSigningUp: boolean
  isLoggingdIn: boolean
  isUpdatingProfile: boolean
  checkAuth: () =>void
}

export const useAuthStore = create<AuthStoreTypes>((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: true,
  isLoggingdIn: true,
  isUpdatingProfile: true,
  checkAuth: async() =>{
    try {
      
    } catch (error) {
      
    }
  }
}))