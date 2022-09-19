import { Component, OnInit, ViewChild, Inject, Optional, ElementRef, Self, Input } from '@angular/core';
import {FocusMonitor} from '@angular/cdk/a11y';
import {BooleanInput, coerceBooleanProperty} from '@angular/cdk/coercion';
import { AbstractControl, FormControl, FormGroup, NgControl, Validators } from '@angular/forms';
import {MAT_FORM_FIELD, MatFormField, MatFormFieldControl} from '@angular/material/form-field';
import { Subject } from 'rxjs';

@Component({
  selector: 'input-cellphone',
  templateUrl: './input-cellphone.component.html',
  styleUrls: ['./input-cellphone.component.scss'],
  providers:[
    { provide: MatFormFieldControl, useExisting: InputCellphone}
  ],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
  }
})
export class InputCellphone implements OnInit {
  static nextId = 0;
  @ViewChild('area') areaInput!: ElementRef<HTMLInputElement>;
  @ViewChild('exchange') exchangeInput!: ElementRef<HTMLInputElement>;
  @ViewChild('subscriber') subscriberInput!: ElementRef<HTMLInputElement>;

  parts = new FormGroup({
    area: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3), Validators.maxLength(3)]}),
    exchange: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3), Validators.maxLength(3)]}),
    subscriber: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3), Validators.maxLength(3)]}),
  });
  stateChanges = new Subject<void>();
  focused = false;
  touched = false;
  id = `nv-input-cellphone-${InputCellphone.nextId++}`;
  onChange = (_: any) => {};
  onTouched = () => {};

  get empty() {
    const {
      value: {area, exchange, subscriber},
    } = this.parts;

    return !area && !exchange && !subscriber;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input('aria-describedby') userAriaDescribedBy!: string;

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder!: string;

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value(): string | null {
    if (this.parts.valid) {
      const vals = this.parts.getRawValue();
      return vals.area + vals.exchange + vals.subscriber;
    }
    return null;
  }
  set value(tel: string | null) {
    // console.log(tel);
    if (tel){
      let temp = tel.replace(/[0-9]{3}/g, (text, i)=>{
        if (i == 0 || i == 3){
          return text + '-';
        }else{
          return text;
        }
      })
      let temps:string[] = temp.split('-');
  
      this.parts.setValue({area: temps[0] || '', exchange: temps[1] || '', subscriber: temps[2] || ''});
    }else{
      this.parts.setValue({area: '', exchange: '', subscriber: ''});
    }

    this.stateChanges.next();
  }

  get errorState(): boolean {
    return this.parts.invalid && this.touched;
  }

  /**********************************************************
   * Constructros
   */
  constructor(
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
    @Optional() @Self() public ngControl: NgControl,
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  /**********************************************************
   * Eventos de los inputs
   */
  ngAfterViewInit(): void {

    let fun = (e:KeyboardEvent) => {
      if (!e.key.match(/['0-9]/)){
        e.preventDefault();
      }
    }

    this.areaInput.nativeElement.addEventListener("keypress", (e) => fun(e));
    this.exchangeInput.nativeElement.addEventListener("keypress", (e) => fun(e));
    this.subscriberInput.nativeElement.addEventListener("keypress", (e) => fun(e));
  }
  ngOnInit(): void {
    
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  onFocusIn(event: FocusEvent) {
    if (!this.focused) {
      this.focused = true;
      this.stateChanges.next();
    }
  }

  onFocusOut(event: FocusEvent) {
    if (!this._elementRef.nativeElement.contains(event.relatedTarget as Element)) {
      this.touched = true;
      this.focused = false;
      this.onTouched();
      this.stateChanges.next();
    }
  }

  autoFocusNext(control: AbstractControl, nextElement?: HTMLInputElement): void {
    if (!control.errors && nextElement) {
      this._focusMonitor.focusVia(nextElement, 'program');
    }
  }

  autoFocusPrev(control: AbstractControl, prevElement: HTMLInputElement): void {
    if (control.value.length < 1) {
      this._focusMonitor.focusVia(prevElement, 'program');
    }
  }

  setDescribedByIds(ids: string[]) {
    const controlElement = this._elementRef.nativeElement.querySelector(
      '.example-tel-input-container',
    )!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick() {
    if (this.parts.get('subscriber')?.valid) {
      this._focusMonitor.focusVia(this.subscriberInput, 'program');
    } else if (this.parts.get('exchange')?.valid) {
      this._focusMonitor.focusVia(this.subscriberInput, 'program');
    } else if (this.parts.get('area')?.valid) {
      this._focusMonitor.focusVia(this.exchangeInput, 'program');
    } else {
      this._focusMonitor.focusVia(this.areaInput, 'program');
    }
  }

  writeValue(tel: string | null): void {
    this.value = tel;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  _handleInput(control: AbstractControl, nextElement?: HTMLInputElement): void {
    this.autoFocusNext(control, nextElement);
    this.onChange(this.value);
  }

  getControl(name:string):AbstractControl{
    return (this.parts.get(name) as AbstractControl);
  }

  labelId(){
    return this._formField?.getLabelId() || null;
  }
}
