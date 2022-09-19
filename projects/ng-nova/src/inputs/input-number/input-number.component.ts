import { Component, OnInit, OnDestroy, AfterViewInit,ViewChild, Input, Optional, Self,ElementRef, Inject } from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { MatFormField, MatFormFieldControl, MAT_FORM_FIELD } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { FocusMonitor } from '@angular/cdk/a11y';

@Component({
  selector: 'input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
  providers:[
    { provide: MatFormFieldControl, useExisting: InputNumber}
  ],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
  }
})
export class InputNumber implements OnInit, ControlValueAccessor, MatFormFieldControl<number>, OnDestroy, AfterViewInit {

  static nextId = 0;
  @ViewChild('input') htmlInput!: ElementRef<HTMLElement>;
  inputControl =  new FormControl<string | null>(null);
  currency:number = 0;


  controlType = 'nv-input-number';
  id = `nv-input-number-${InputNumber.nextId++}`;

  stateChanges = new Subject<void>();
  focused = false;
  touched = false;

  onChange = (_: any) => {};
  onTouched = () => {};


  /**************
   * Control del inpur
   */
  private _inputValue:string|null = null;
  get inputValue():string|null{
    return this._inputValue;
  }
  set inputValue(value:string|null) {
    if (value?.match(/[a-z]/gi)){
      value = null;
    }
    // console.log(value);
    if ( value ){
      this._inputValue = value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");

      let numTempo:number = Number.parseFloat(value.replace(/\./g, '').replace(',', '.')) 

      if (isNaN(numTempo)){
        numTempo = 0;
      }

      this.currency = value != '' ? numTempo : 0;
    }else{
      this._inputValue = null;
      this.currency = 0;
    }
    this.stateChanges.next();
    this.onChange(this.currency);
  }

  get empty() {
    return this._inputValue == '' || this._inputValue == null;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input('aria-describedby') userAriaDescribedBy!: string;

  @Input() textAling:'left'|'center'|'rigth' = 'rigth'

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
    this._disabled ? this.inputControl.disable() : this.inputControl.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value():number{
    return this.currency;
  }
  set value(value:any){
    // if (value == null) value = 0;
    // if (typeof value == "string"){
    //   if (value.match(/[a-z]/gi)){
    //     value = 0;
    //   }
    // }

    // console.log(value);
    this.inputValue = value > 0 ? value.toString() : '';
    this.stateChanges.next();
    this.onChange(value);
  }

  get errorState():boolean {
    return this.inputControl.invalid && this.touched;
  }

  /**********************
   * CONSTRUCTOR
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
    
    this.inputControl.valueChanges.subscribe( res => {
      this.inputValue = res == null ? '' : res;
    })
  }

  getLabelId(){
    return this._formField ? this._formField.getLabelId() : null;
  }


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
   this.htmlInput.nativeElement.addEventListener("paste", (e)=> {

    let text = e.clipboardData?.getData("text");
    if (text){
      let punto = 0;
      let res1 = text.match(/\./g)?.length ||  0;
      let res2 = text.match(/\,/g)?.length ||  0;
      if (res1 > res2){
        text = text.replace(/\./g, '').split(',')[0] || '';



      }else{
        text = text.replace(/\,/g, '').split('.')[0] || '';
      }

      if (!text.match(/[0-9]+/)){
        text = '';
      }
      this.inputValue = text;
    }
    e.preventDefault();
   })
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  setDescribedByIds(ids: string[]) {
    const controlElement = this._elementRef.nativeElement.querySelector(
      'input',
    )!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick() {
    this._focusMonitor.focusVia(this.htmlInput, 'program');
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
    if (!this._elementRef.nativeElement.contains(event.relatedTarget as Element)) {
      this.touched = true;
      this.focused = false;
      this.onTouched();
      this.stateChanges.next();
    }
  }


  keyPress(event:KeyboardEvent){
    if (!event.key.match(/[0-9]/)){
      event.preventDefault();
    }
  }

  keyUp(event:KeyboardEvent){
    // let ele = (event.target as HTMLInputElement);
    // let value = ele.value
    // console.log('key up', value, value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d)\.?)/g, "."));
    // // ele.value = ele.value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
    // this.value = (value != '' && value != null) ? Number.parseFloat(value.replace('.', '').replace(',', '.')) : 0;
    // ele.value = value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
  }

}
