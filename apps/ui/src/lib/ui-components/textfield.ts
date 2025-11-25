import { Component, input, signal, forwardRef, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms'; 

@Component({
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextfieldComponent),
      multi: true,
    },
  ],
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'hp-textfield',
  templateUrl: './textfield.html',
  styleUrl: './textfield.scss',
})

export class TextfieldComponent implements ControlValueAccessor, AfterViewInit {

  id = input<string>('input-' + Math.random().toString(36).substring(2, 9));
  label = input<string>('');
  placeholder = input<string>('');
  type = input<string>('text');
  disabled = input<boolean>(false);
  
  isFocused = signal<boolean>(false);

  @ViewChild('inputElement') inputRef!: ElementRef<HTMLInputElement>;
  
  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  ngAfterViewInit(): void {
    this.inputRef.nativeElement.value = this.initialValue;
  }
  
  private initialValue: any = ''; 

  writeValue(value: any): void {
    this.initialValue = value;
    if (this.inputRef) {
        this.inputRef.nativeElement.value = value;
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  
  setDisabledState(isDisabled: boolean): void {
  }

  onModelChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value); 
  }
}