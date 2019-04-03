import {Component, OnInit, EventEmitter, Output, Input, OnChanges, SimpleChanges, SimpleChange} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'chips-input',
  templateUrl: './chipsInput.component.html'
})
export class ChipsInputComponent implements OnInit {
  //___NOTE___ this component is dependant on the autComplete component
  @Input()
  model : any[];  //array to store the desired model
  @Input()
  selectionData : any[];  // expects an array of objects, this will populate the selection
  @Input()
  placeholder: string;  //input placeholder value
  @Input()
  displayField: string; //This is the field value to display on the chip. This should be a string since this is what will be on the chip.
  @Input()
  modelField: string; //This is the field value from the selection data that will go in the model array
  @Input()
  formName: string;// name of the input field on the form

  input = {
    value : null
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {}

  public onSelect(selection, autocomplete){
    this.model.push(selection);
    this.selectionData.some((data, index):boolean => {
      if(data.id == selection.id){
        this.selectionData.splice(index,1);
        return true;
      }
    });
    //TODO let be known that I think this is a bad
    setTimeout(function(){
      autocomplete.input.value = null;
    });

  }

  public remove(index) {
    let roles = this.model.splice(index,1);
    this.selectionData.push(roles[0]);
  }

}
