import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    public appService: AppService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    const script = this.renderer.createElement('script');

    this.appService.theme$
      .pipe(takeUntil(this.onDestroy$))
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

  ngOnDestroy(): void {
    this.onDestroy$.next(false);
    this.onDestroy$.complete();
  }
}
