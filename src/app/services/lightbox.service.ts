import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LightboxService {

  private activeImageUrlSubject = new BehaviorSubject<string>('');
  activeImageUrl$ = this.activeImageUrlSubject.asObservable();

  setActiveImageUrl(imageUrl: string) {
    this.activeImageUrlSubject.next(imageUrl);
  }
}
