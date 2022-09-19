// import { Component, OnInit } from '@angular/core';
import { AfterViewInit, Component, ElementRef, Inject, Input, OnDestroy, OnInit, Optional, Self, ViewChild } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatFormField, MatFormFieldControl, MAT_FORM_FIELD } from '@angular/material/form-field';
import { Subject } from 'rxjs';


@Component({
  selector: 'input-currency',
  templateUrl: './input-currency.component.html',
  styleUrls: ['./input-currency.component.scss'],
  providers:[
    { provide: MatFormFieldControl, useExisting: InputCurrency}
  ],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
  }
})
export class InputCurrency implements OnInit {

  static nextId:number = 0;
  @ViewChild('number') elementRefInputNumber!:ElementRef<HTMLInputElement>;
  @ViewChild('decimals') elementRefInputDecimal!:ElementRef<HTMLInputElement>;

  controlType = 'nv-input-currency';
  id = `nv-input-currency-${InputCurrency.nextId++}`;

  /***************************************
   * Constructor
   */
  constructor(
    private _focusMonitor:FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
    @Optional() @Self() public ngControl: NgControl
  ) { 
    if ( this.ngControl ){
      this.ngControl.valueAccessor = this;
    }
    
    // this.inputControl.valueChanges.subscribe( res => {
    //   this.inputValue = res == null ? '' : res;
    // })
  }
  autofilled?: boolean | undefined;
  setDescribedByIds(ids: string[]): void {
    const controlElement = this._elementRef.nativeElement.querySelector(
      '.nv-input-currency-container',
    )!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }



  ngAfterViewInit(): void {
    this.inputNumber.addEventListener('keypress', ($event) => this.onInputNumberKeypress($event));
    this.inputDecimals.addEventListener('keypress', ($event) => this.onInputDecimalKeypress($event));

    this.inputNumber.addEventListener('keyup', ($event) => {
      if ($event.key == "ArrowRight"){
        let input = ($event.target as HTMLInputElement);
        if (input.selectionStart == input.value.length){
          this._focusMonitor.focusVia(this.inputDecimals, 'program');
        }
        
        ($event.target as HTMLInputElement).selectionStart == input.value.length;
      }
    });

    this.inputDecimals.addEventListener('keyup', ($event) => {
      if ($event.key == 'Backspace' && ($event.target as HTMLInputElement).value == ''){
        $event.preventDefault();
        this._focusMonitor.focusVia(this.inputNumber, 'program');
        this.inputNumber.selectionStart = this.inputNumber.value.length;
      }

      if ($event.key == 'ArrowLeft'){
        if (($event.target as HTMLInputElement).selectionStart == 0){
          this._focusMonitor.focusVia(this.inputNumber, 'program');
        }
      }
    });

  }

  ngOnInit(): void {
  }

  get inputNumber():HTMLInputElement{
    return this.elementRefInputNumber.nativeElement;
  }

  get inputDecimals():HTMLInputElement{
    return this.elementRefInputDecimal.nativeElement;
  }

  onInputNumberKeypress(e:KeyboardEvent): void {
    
    if (!e.key.match('[0-9]+')){
      e.preventDefault();
    }

    if (e.key == '.' || e.key == ','){
      e.preventDefault();
      this._focusMonitor.focusVia(this.inputDecimals, 'program');
    }
  }

  onInputDecimalKeypress(e:KeyboardEvent): void {
    if (!e.key.match('[0-9]+')){
      e.preventDefault();
    }
  }

  /***********
   * Valor entero
   */
  private _valueIntNum:number = 0;
  private _valueInt:string|null = null;
  get valueInt():string|null {
    return this._valueInt;
  }
  set valueInt(value:string|null){
    if (value){
      this._valueInt = value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
      this._valueIntNum = (value == '' ? 0 : Number.parseInt(value.replace(/\./g,'')));
    }else{
      this._valueInt = null;
    }
    this.stateChanges.next();
    this.onChange(this.currency);
  }

  /****************************
   * Valor decimal
   */
  private _valueDecimalNum:number = 0;
  private _valueDecimal:string|null = null;
  get valueDecimal():string|null {
    return this._valueDecimal;
  }
  set valueDecimal(value:string|null) {
    if (value){
      this._valueDecimal = value;
      this._valueDecimalNum = Number.parseInt(value);
    }else{
      this._valueDecimal = null;
    }
    this.stateChanges.next();
    this.onChange(this.currency);
  }

  get currency():number{
    return Number.parseFloat(`${this._valueIntNum}.${this._valueDecimalNum}`);
  }


  stateChanges = new Subject<void>();
  focused = false;
  touched = false;

  onChange = (_: any) => {};
  onTouched = () => {};

  get empty():boolean {
    return (this.valueInt == '' || this.valueInt == null) && (this.valueDecimal == '' || this.valueDecimal == null);
  }

  get shouldLabelFloat():boolean{
    return this.focused ||!this.empty;
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
    this.stateChanges.next();
  }
  private _disabled = false;

  /*****************
   * Ingreso del valor numerico a control
   */
  get value():number {
    return this.currency;
  }
  set value(val:number){
    if (val > 0){
      let temp = val.toString().split('.');
      this.valueInt = temp[0];
      this.valueDecimal = temp[1] || null;
    }else{
      this._valueInt = null;
      this._valueDecimal = null;
    }
    this.onChange(val);
  }

  get errorState():boolean {
    return false;
  }

  getLabelId(){
    return this._formField ? this._formField.getLabelId() : null;
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    // this._focusMonitor.stopMonitoring(this._elementRef);
  }

  onContainerClick() {
    // this._focusMonitor.focusVia(this.htmlInput, 'program');
  }
  writeValue(value:number): void {
    this.value = value;
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

  onFocusIn(event: FocusEvent) {
    if (!this.focused) {
      this.focused = true;
      this.stateChanges.next();
    }
  }

  onFocusOut(event: FocusEvent) {
    // if (!this._elementRef.nativeElement.contains(event.relatedTarget as Element)) {
    //   this.touched = true;
    //   this.focused = false;
    //   this.onTouched();
    //   this.stateChanges.next();
    // }
  }

}
