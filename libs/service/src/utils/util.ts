import { Observable } from 'rxjs';
import { Promise } from '@app/service/utils/promise';

export class Util {
  static toPromise<T>(result: Observable<T>): Promise<T> {
    return Promise.retry(
      () =>
        new Promise<T>((resolve, reject) =>
          result.subscribe({
            next: (val): void => resolve(val),
            error: (err: any): void => reject(err),
          }),
        ),
      3,
    );
  }
}
