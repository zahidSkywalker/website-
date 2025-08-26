import { Request, Response, NextFunction } from 'express';
export declare function setCsrfToken(req: Request, res: Response, next: NextFunction): void;
export declare function verifyCsrf(exclusions?: Array<{
    method?: string;
    pathStartsWith: string;
}>): (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
//# sourceMappingURL=csrf.d.ts.map