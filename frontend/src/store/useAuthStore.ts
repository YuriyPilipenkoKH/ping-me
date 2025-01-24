import {create} from 'zustand'
import { User } from '../types/userTypes';

interface AuthStore {
  authUser: User | null; // User is the interface from `userTypes.ts`
  isCheckingAuth: boolean;
  // setAuthUser: (user: User | null) => void; // Action to update `authUser`
  // setIsCheckingAuth: (isChecking: boolean) => void; // Action to update `isCheckingAuth`

}

export const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  isCheckingAuth: true
}))