import {HttpErrorResponse} from '@angular/common/http';

export interface HttpErrorModel {
  value: HttpErrorResponse;
  name: string;
}
