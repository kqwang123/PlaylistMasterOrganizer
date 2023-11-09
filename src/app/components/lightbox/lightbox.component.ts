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
    this._lightboxService.setActiveImageUrl('');
    document.body.classList.remove('no-scroll');
  }
  handleOverlayClick(event: Event): void {
    event.stopPropagation(); 
  }
}
