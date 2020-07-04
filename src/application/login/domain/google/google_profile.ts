export interface GoogleProfile {
  readonly id: string;
  readonly name: string;
  readonly token: string;
  readonly photo?: string;
  readonly email?: string;
}
