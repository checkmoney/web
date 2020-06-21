declare module '*.css';

type BrowserProcess = {
  env: {
    [key: string]: string | undefined;
  };
};
declare const process: BrowserProcess;
