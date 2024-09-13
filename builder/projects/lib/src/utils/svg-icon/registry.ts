import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, Injector, PLATFORM_ID } from '@angular/core';
import { SVG_CONFIG, SVG_ICONS_CONFIG, SvgIconType } from './types';

class SvgIcon {
  init = false;

  constructor(public content: string) { }
}

@Injectable({ providedIn: 'root' })
export class SvgIconRegistry {
  private readonly svgMap = new Map<string, SvgIcon>();
  private readonly document: Document | null = null;
  private readonly isBrowser: boolean;

  constructor(
    injector: Injector,
    @Inject(PLATFORM_ID) private platformId: Object,  // Inject PLATFORM_ID to check if SSR or browser
    @Inject(SVG_ICONS_CONFIG) config: SVG_CONFIG
  ) {
    // Check if the code is running in the browser
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      // Access document only if running in the browser
      this.document = injector.get(DOCUMENT);
    }

    if (config.icons) {
      this.register(config.icons);
    }

    if (config.missingIconFallback) {
      this.register(config.missingIconFallback);
    }
  }

  getAll() {
    return this.svgMap;
  }

  get(key: string | undefined): string | undefined {
    const icon = key && this.svgMap.get(key);

    if (!icon) {
      return undefined;
    }

    if (!icon.init && this.isBrowser && this.document) {
      const svg = this.toElement(icon.content);
      svg?.setAttribute('fit', '');
      svg?.setAttribute('height', '100%');
      svg?.setAttribute('width', '100%');
      svg?.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      svg?.setAttribute('focusable', 'false');

      icon.content = svg?.outerHTML ?? '';
      icon.init = true;
    }

    return icon.content;
  }

  register(icons: SvgIconType | SvgIconType[]) {
    for (const { name, data } of Array.isArray(icons) ? icons : [icons]) {
      if (!this.svgMap.has(name)) {
        this.svgMap.set(name, new SvgIcon(data));
      }
    }
  }

  getSvgElement(name: string): SVGSVGElement | undefined {
    if (!this.isBrowser || !this.document) {
      return undefined;
    }

    const content = this.get(name);

    if (!content) {
      return undefined;
    }

    const div = this.document.createElement('div');
    div.innerHTML = content;

    return div.querySelector('svg') as SVGSVGElement;
  }

  private toElement(content: string): SVGElement | undefined {
    if (!this.isBrowser || !this.document) {
      return undefined;
    }

    const div = this.document.createElement('div');
    div.innerHTML = content;

    return div.querySelector('svg') as SVGElement;
  }
}
