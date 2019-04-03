import {GridOptions, ColGroupDef, ColDef} from "ag-grid";
import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'auto-complete',
  templateUrl: './autoComplete.component.html'
})
export class AutoCompleteComponent implements OnInit {

  private _isDisabled: boolean;
  get isDisabled(): boolean {
    return this._isDisabled;
  }

  private _addedValue: any;
  get addedValue(): any {
    return this._addedValue;
  }

  @Input()
  model : any;  //ngModel
  @Input()
  selectionData : any[];  // expects an array of objects, this will populate the selection
  @Input()
  placeholder: string;  //input placeholder value
  @Input()
  formName: string; //Name of the input on form
  @Input()
  displayField: string; //This is the field value to display on screen. This should be a string since this is what the will be filtered on input.
  @Input()
  valueField: string;  //The field on object that should be set on the model. see onOptionSelect method below
  @Input()
  modelValueField: string;  //The field value to set on model on selection
  @Input()
  objectInModel: string; // this is the reference to the object on the model ex: model.location
  @Input()
  isRequired: boolean; // if the field is required on form

  @Input('isDisabled') // if the field is disabled
  set isDisabled(val: boolean) {
    this._isDisabled = val;
    if (this._isDisabled) {
      this.formCtrl.disable();
    } else {
      this.formCtrl.enable();
    }
  }

  @Input('addedValue')  //The newly in-line created item
  set addedValue(val: any) {
    this._addedValue = val;
    if (this._addedValue) {
      this.input.value = this._addedValue[this.displayField];
    }
  }

  @Output()
  newValue: EventEmitter<any> = new EventEmitter();

  @Output()
  currentValue: EventEmitter<any> = new EventEmitter();

  @Output()
  onOptionSelected? : EventEmitter<any> = new EventEmitter(); //optional listener called when user selects an option

  formCtrl: FormControl;
  filteredData: any;

  public input = {
    value : null
  };
  public firstCall: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router) {

    this.formCtrl = new FormControl();
    this.filteredData = this.formCtrl.valueChanges
      .startWith(null)
      .map(obj => this.filterData(obj));
  }

  ngOnInit() {
    this.isRequired = this.isRequired || false;
    this.input.value = (this.model[this.objectInModel])? this.model[this.objectInModel][this.displayField] : null;
    this.currentValue.emit(this.input.value);
    this.firstCall = true;
  }

  filterData(val: string) {
    return val ? this.selectionData.filter((serviceType) => new RegExp(val, 'gi').test(serviceType[this.displayField])) : this.selectionData;
  }

  //TODO fix unfortunately this is getting kicked off before the select event
  clearIfNull() {
    if(!this.model[this.modelValueField] ) {
      this.input.value = null;
    }
  }

  onOptionSelect(option) {
    this.model[this.modelValueField] = option[this.valueField];
    if(this.onOptionSelected) {
      if(this.firstCall) {
        this.newValue.emit(this.model[this.modelValueField]);
        this.firstCall = false;
      }
      this.onOptionSelected.emit(option);
    }
  }

  valueChanged() {
    this.firstCall = true;
  }
}
