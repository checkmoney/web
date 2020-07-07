import { GoogleProfile } from '../../../domain/google/google_profile';

export interface GoogleWidgetProps {
  handleLogin: (profile: GoogleProfile) => void;
  onSuccess?: () => void;
  onError?: (message: string) => void;
}
