import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args: any): any {
    if(args === '' || args.length < 3) return value;
    let results = [];
    for (let character of value){
      if(String(character.PlayerName).toLowerCase().indexOf(args.toLowerCase())> -1){
        results.push(character);
      }
    }
    return results;
  }

}
