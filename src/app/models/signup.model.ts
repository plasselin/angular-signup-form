export interface SignupForm {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  province: string;
  address: string;
  birthDate: string;
  subscribe: boolean;
}

export function compareFormData(a: SignupForm, b: SignupForm): number {
  if (a.email < b.email) {
    return -1;
  } else if (a.email > b.email) {
    return 1;
  } else {
    return 0;
  }
}


