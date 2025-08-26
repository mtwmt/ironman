import { DOCUMENT, CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  Inject,
  OnInit,
  Renderer2,
  inject,
} from '@angular/core';
import { AppService } from '../app.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-comments',
  imports: [CommonModule],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  destroyRef = inject(DestroyRef);

  constructor(
    public appService: AppService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    const script = this.renderer.createElement('script');
    this.appService.theme$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((theme) => {
        script.type = 'text/javascript';
        script.src = 'https://utteranc.es/client.js';
        script.setAttribute('repo', 'mtwmt/ironman');
        script.setAttribute('issue-term', 'pathname');
        script.setAttribute('theme', !theme ? 'github-light' : 'github-dark');
        script.setAttribute('crossorigin', 'anonymous');
        script.text = ``;
        this.renderer.appendChild(
          this.document.querySelector('#comments'),
          script
        );
      });
  }
}
