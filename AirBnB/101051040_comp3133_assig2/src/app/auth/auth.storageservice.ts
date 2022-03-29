import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  format: string = 'xxxxx.yyyyy.zzzzz';

  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  get(key: string) {
    const fetched = localStorage.getItem(key);
    return fetched ? fetched : this.format;
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}
