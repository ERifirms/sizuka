import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { plainToClass } from 'class-transformer';

interface ClassContructor {
  new (...args: any[]): object;
}

export function Serialize(dto: ClassContructor) {
  return UseInterceptors(new SerializeInterseptor(dto));
}

export class SerializeInterseptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(
    ctx: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: any) => {
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
