import { Component, Inject, Input, ChangeDetectionStrategy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService, ALAIN_I18N_TOKEN } from '@delon/theme';
import { InputBoolean } from '@delon/util';

import { I18NService } from '@core';

@Component({
  selector: 'header-i18n',
  templateUrl: './i18n.component.html',
  styleUrls: ['./i18n.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderI18nComponent {
  /** Whether to display language text */
  @Input() @InputBoolean() showLangText = true;

  get langs() {
    return this.i18n.getLangs();
  }

  get curLangCode() {
    return this.settings.layout.lang;
  }

  constructor(
    private settings: SettingsService,
    @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
    @Inject(DOCUMENT) private doc: any,
  ) {}

  change(lang: string) {
    const spinEl = this.doc.createElement('div');
    spinEl.setAttribute('class', `page-loading ant-spin ant-spin-lg ant-spin-spinning`);
    spinEl.innerHTML = `<span class="ant-spin-dot ant-spin-dot-spin"><i></i><i></i><i></i><i></i></span>`;
    this.doc.body.appendChild(spinEl);

    this.i18n.use(lang);
    this.settings.setLayout('lang', lang);
    setTimeout(() => this.doc.location.reload());
  }
}
