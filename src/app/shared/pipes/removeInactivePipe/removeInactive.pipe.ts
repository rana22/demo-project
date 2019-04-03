import { Pipe, PipeTransform } from '@angular/core';
import {forEach} from "@angular/router/src/utils/collection";
import {ConstantMan} from "../../../../core/services/constantMan";
/*
 * Removed unselected inactives from a md-select collection
 */
@Pipe({
  name: 'removeInactivesPipe',
  pure: false
})
export class RemoveInactivesPipe implements PipeTransform {
  transform(items: any[], selectedId: number) {
    if (!items) {
      return items;
    }
    /**
     * filter items array, items which match and return true will be kept, false will be filtered out
     * if an item is "inactive" and is not currently selected, remove it from array
     */
    return items.filter(item => this.filterUnselectedInactive(item, selectedId));
  }

  private filterUnselectedInactive(item, selectedId) {
    if(item.status == ConstantMan.STATUS_TYPE.ACTIVE || item.id == selectedId) {
      return true;
    } else {
      return false;
    }
  }
}
