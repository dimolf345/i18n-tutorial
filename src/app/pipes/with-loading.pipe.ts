import { Pipe, PipeTransform } from '@angular/core';
import { isObservable, map, startWith, catchError, of, Observable } from 'rxjs';

@Pipe({
  name: 'withLoading',
  standalone: true,
})
export class WithLoadingPipe implements PipeTransform {
  transform<T>(
    val: Observable<T>
  ): Observable<{ loading: boolean; value?: T; error?: unknown }> {
    return isObservable(val)
      ? val.pipe(
          map((value: any) => ({
            loading: value.type === 'start',
            value: value.type ? value.value : value,
          })),
          startWith({ loading: true }),
          catchError((error) => of({ loading: false, error }))
        )
      : val;
  }
}
