/**
 * @description Version 1.0.0 MIT License
 * @link https://github.com/plasselin/your-repo
 * @author Pierre Luc Asselin, on behalf of DevXpress.ca
 */

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
/**
 * @description PassWidgetComponent is responsible for displaying the password strength progress bar.
 */
@Component({
  selector: 'app-pass-widget',
  templateUrl: './pass-widget.component.html',
  styleUrls: ['./pass-widget.component.scss']
})
export class PassWidgetComponent implements OnChanges {
  /**
   * @description Input property to receive the password string.
   */
  @Input() password: string = '';

  /**
   * @description The progress of the password strength, ranging from 0 to 100.
   */
  progress = 0;

  /**
   * @description The mode of the progress bar, always 'determinate'.
   */
  mode: 'determinate' = 'determinate';

  /**
   * @description The fill color of the progress bar based on the strength score.
   */
  fillColor: string = '--step0';

  /**
   * @description The border color of the progress bar, initially set to match the fill color.
   */
  bordercolor: string = this.fillColor;

  /**
   * @description Lifecycle hook that gets triggered when the input properties change.
   * @param {SimpleChanges} changes - Object of changes to the input properties.
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['password'] && changes['password'].currentValue != undefined) {
      this.updateProgress(this.password);
    }
  }

  /**
   * @description Updates the progress based on the password strength score.
   * @param {string} password - The password to evaluate.
   */
  updateProgress(password: string) {
    let score = 0;

    if (password.length >= 4) score += 10;
    if (password.length >= 7) score += 10;
    if (/[A-Z]/.test(password)) score += 10;
    if (/[0-9]/.test(password)) score += 10;
    if (password.length >= 10) score += 15;
    if (/[@!#$%^&*(),.?":{}|<>]/.test(password)) score += 20;
    if (password.length >= 14) score += 15;
    if (/[a-z]/.test(password) && /\d/.test(password)) score += 10;

    this.progress = score;
    this.getFillColor(score);
  }

  /**
   * @description Determines the fill color based on the score. This code is not working as implemented and will be adjusted in the next version.
   * @param {number} score - The password strength score.
   */
  getFillColor(score: number) {
    if (score === 100) {
      this.fillColor = '--step4';
    } else if (score >= 60) {
      this.fillColor = '--step3';
    } else if (score >= 40) {
      this.fillColor = '--step2';
    } else if (score >= 20) {
      this.fillColor = '--step1';
    } else {
      this.fillColor = '--step0';
    }
  }
}
