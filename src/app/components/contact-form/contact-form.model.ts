export interface ContactData {
  fullName: string;
  email: string;

  message?: string;
  phoneNumber?: string;
  includeCalculationData?: boolean;
}

export enum EmailSendingStatus {
  PENDING = 'pending',
  SUCCESSFUL = 'successful',
  ERROR = 'error',
}
