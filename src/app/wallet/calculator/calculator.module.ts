import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalculatorComponent } from './calculator.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CalculatorComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  exports: [
    CalculatorComponent
  ]
})
export class CalculatorModule { }
