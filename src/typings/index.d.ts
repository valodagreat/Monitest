declare module 'xss-clean' {
    import { RequestHandler } from 'express';
  
    function xssClean(options?: any): RequestHandler;
  
    export = xssClean;
}