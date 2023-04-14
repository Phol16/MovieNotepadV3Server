//declaration file
//intellisense for enviroment variables
declare global{
  namespace NodeJS{
    interface ProcessEnv{
      NODE_ENV : 'Production' | 'Development',
      PORT : number,
      DATABASE : string,
      SECRET: string,
    }
  }
}

export {};