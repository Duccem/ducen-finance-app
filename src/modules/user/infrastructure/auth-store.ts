import { create } from 'zustand';

import { UserAuth } from '../domain/user-auth';

export type AuthState = {
  user: UserAuth;
  verification: {
    state: 'pending' | 'success' | 'error';
    code: string;
    error?: string;
  };
};

export type AuthActions = {
  setUser: (user: UserAuth) => void;
  setVerificationState: (state: AuthState['verification']['state']) => void;
  setVerificationCode: (code: string) => void;
  setErrorMessage: (error: string) => void;
};

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  user: {
    email: '',
    name: '',
    password: '',
    externalId: '',
    id: '',
  },
  verification: {
    state: 'pending',
    code: '',
    error: '',
  },
  setUser: (user) => set({ user }),
  setVerificationState: (state) => set((current) => ({ verification: { ...current.verification, state } })),
  setVerificationCode: (code) => set((current) => ({ verification: { ...current.verification, code } })),
  setErrorMessage: (error) => set((current) => ({ verification: { ...current.verification, error } })),
}));
