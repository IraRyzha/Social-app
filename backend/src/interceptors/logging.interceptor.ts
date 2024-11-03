import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Запит обробляється...');
    const now = Date.now();

    return next
      .handle()
      .pipe(
        tap(() => console.log(`Запит завершений за ${Date.now() - now}ms`))
      );
  }
}
