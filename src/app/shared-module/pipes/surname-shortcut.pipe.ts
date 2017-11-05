import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'surnameShortcut'
})
export class SurnameShortcutPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return '';
    }
    return value.charAt(0) + '.';
  }

}
