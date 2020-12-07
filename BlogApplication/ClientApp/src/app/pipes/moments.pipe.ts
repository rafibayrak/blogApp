import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'momentsPipe'
})

export class MomentPipe implements PipeTransform {
  transform(value: Date): any {
    const stillUtc = moment.utc(value).toDate();
    const langBrowser = navigator.language.toLowerCase().includes('tr') ? 'tr' : 'en';
    const local = moment(stillUtc).lang(langBrowser).local().format('LLL');
    return local;
  }
}
