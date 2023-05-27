declare module 'helmet' {
    import { RequestHandler } from 'express';
  
    function helmet(options?: any): RequestHandler;
  
    export = helmet;
}