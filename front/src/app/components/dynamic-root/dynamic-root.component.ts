import { Component, inject, Input, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ComponentData } from '../../../models/Data';
import { isPlatformBrowser } from '@angular/common';
import { SaveDataService } from '../../services/save-data-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dynamic-root',
  templateUrl: './dynamic-root.component.html',
  styleUrl: './dynamic-root.component.scss'
})
export class DynamicRootComponent implements OnInit, OnDestroy {

  rootData: ComponentData | undefined = undefined;

  @Input()
  public dataKey: string | undefined = undefined;

  private subscription: Subscription | undefined = undefined;


  private saveDataService = inject(SaveDataService);
  private platformId = inject(PLATFORM_ID);

  async ngOnInit() {
    if (!this.dataKey) {
      throw new Error("dataKey is required");
    }

    if (isPlatformBrowser(this.platformId)) {
      this.saveDataService.locaLodalData(this.dataKey);

      this.subscription = this.saveDataService.data$.subscribe((data) => {
        this.rootData = undefined;
        setTimeout(() => {
          this.rootData = data[this.dataKey!];
        }, 500);

      });
    } else {
      this.rootData = await this.saveDataService.loadData(this.dataKey);
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
