# Domain: Login

Handle user all log in situations

## Required config

This domain depends on `config`-domain and requires the following keys:

- `GOOGLE_CLIENT_ID`

## API

### Effects

#### signUpPasswordFx

Creates new account for user by login and password and login user with this account.

#### signInByPasswordFx

Login user by user and password.

#### signInByGoogleFx

Login user by google auth response. Automaticale create account, if it did not exist. In most cases, it uses with `GoogleWidget` component

- `bindGoogleFx`

Bind google account to user account by google auth response. In most cases, it uses with `GoogleWidget` component.

### Events

#### loggedOut

Sync event for logout user.

```tsx
const MyComponent = () => {
  return <button onClick={loggedOut}>Log out</button>;
};
```

### Componentns

#### GoogleWidget

Dumb component for retrieve google auth response. In most cases, it uses with `signInByGoogleFx` and `bindGoogleFx` effects.

```tsx
const MyComponent = () => {
  return <GoogleWidget handleLogin={bindGoogleFx} />;
};
```
