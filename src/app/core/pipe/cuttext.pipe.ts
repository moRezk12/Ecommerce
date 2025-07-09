import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cuttext',
  standalone: true
})
export class CuttextPipe implements PipeTransform {

  transform(text:string,limit:number): string {
    return text.split(' ').splice(0,limit).join(' ');
  }


}
