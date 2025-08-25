import { Request, Response, NextFunction } from 'express';
export interface AuthPayload {
    userId: string;
    role: 'user' | 'admin';
}
declare global {
    namespace Express {
        interface Request {
            auth?: AuthPayload;
        }
    }
}
export declare function requireAuth(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
export declare function requireAdmin(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=auth.d.ts.map