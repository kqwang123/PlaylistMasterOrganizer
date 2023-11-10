import { Component, OnInit } from '@angular/core';
import { LightboxService } from '../../services/lightbox.service';

@Component({
  selector: 'pmo-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.scss']
})
export class LightboxComponent implements OnInit {
  activeImageUrl!: string;

  constructor(private _lightboxService: LightboxService) {
  }

  ngOnInit() {
    this._lightboxService.activeImageUrl$.subscribe((url) => {
      this.activeImageUrl = url;
    });
  }

  closeLightbox(): void {
    const lightbox = document.querySelector('.lightbox');
    if (lightbox) {
      lightbox.classList.add('closing');

      setTimeout(() => {
        lightbox.classList.remove('closing');
        this._lightboxService.setActiveImageUrl('');
      }, 400); 
      
      document.body.classList.remove('no-scroll'); // prevents scrolling in body when lightbox is open
    }
  }
  handleOverlayClick(event: Event): void {
    event.stopPropagation(); // prevents overlay click from closing lightbox
  }
}
