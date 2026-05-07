import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeService } from '../../../core/services/theme.service';

/**
 * A three-way toggle that switches between Light / System / Dark themes.
 * Reads and writes through `ThemeService`.
 */
@Component({
  selector: 'hc-theme-switcher',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonToggleModule, MatIconModule, MatTooltipModule],
  template: `
    <mat-button-toggle-group
      [value]="themeService.mode()"
      (change)="themeService.setMode($event.value)"
      hideSingleSelectionIndicator
      aria-label="Select color theme"
    >
      <mat-button-toggle value="light" aria-label="Light theme" matTooltip="Light">
        <mat-icon aria-hidden="true">light_mode</mat-icon>
      </mat-button-toggle>

      <mat-button-toggle value="system" aria-label="Use system preference" matTooltip="System">
        <mat-icon aria-hidden="true">brightness_auto</mat-icon>
      </mat-button-toggle>

      <mat-button-toggle value="dark" aria-label="Dark theme" matTooltip="Dark">
        <mat-icon aria-hidden="true">dark_mode</mat-icon>
      </mat-button-toggle>
    </mat-button-toggle-group>
  `,
  styles: [':host { display: inline-flex; }'],
})
export class ThemeSwitcherComponent {
  protected readonly themeService = inject(ThemeService);
}
