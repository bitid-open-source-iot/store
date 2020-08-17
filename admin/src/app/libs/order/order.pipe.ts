import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderBy'
})

export class OrderPipe implements PipeTransform {

    transform(array: any[], key: string): any[] {
        return array.sort((a, b) => {
            if (a[key].toLowerCase() < b[key].toLowerCase()) {
                return -1;
            } else if (a[key].toLowerCase() > b[key].toLowerCase()) {
                return 1;
            } else {
                return 0;
            };
        });
    };

}