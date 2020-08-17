import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterBy'
})

export class FilterPipe implements PipeTransform {

    transform(array: any[], key: string, value: any): any[] {
        if (typeof (value) != 'undefined' && value != null && value != '') {
            return array.filter(item => (item[key].toLowerCase().search(value.toLowerCase()) > -1));
        } else {
            return array
        };
    };

}