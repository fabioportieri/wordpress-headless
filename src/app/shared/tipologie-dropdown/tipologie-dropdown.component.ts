import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface Tipologie {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
  meta: any[];
  _links: any;
}

@Component({
  selector: 'awp-tipologie-dropdown',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    AsyncPipe,
  ],
  template: `
    <form class="example-form">
      <mat-form-field class="example-full-width">
        <mat-label>Tipologie</mat-label>
        <input
          matInput
          aria-label="Tipologie"
          [matAutocomplete]="auto"
          [formControl]="tipologiaFC"
        />
        <mat-autocomplete #auto="matAutocomplete">
          @for (tipo of filteredTipologie | async; track tipo) {
          <mat-option [value]="tipo.name">
            <span>{{ tipo.name }}</span> |
            <!-- <small>Population: {{ tipo.description }}</small> -->
          </mat-option>
          }
        </mat-autocomplete>
      </mat-form-field>

      <br />

      <!-- <mat-slide-toggle
    [checked]="tipologiaFC.disabled"
    (change)="tipologiaFC.disabled ? tipologiaFC.enable() : tipologiaFC.disable()">
    Disable Input?
  </mat-slide-toggle> -->
    </form>
  `,
  styles: `
    :host {
      display: block;
    }
    .example-form {
      min-width: 150px;
      max-width: 500px;
      width: 100%;
    }

    .example-full-width {
      width: 100%;
    }

    .example-option-img {
      vertical-align: middle;
      margin-right: 8px;
    }

    [dir='rtl'] .example-option-img {
      margin-right: 0;
      margin-left: 8px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TipologieDropdownComponent {
  tipologiaFC = new FormControl('');
  filteredTipologie: Observable<Tipologie[]>;

  private _tipologie: Tipologie[] = [];
  public get tipologie(): Tipologie[] {
    return this._tipologie;
  }
  @Input()
  public set tipologie(value: Tipologie[]) {
    this._tipologie = value;
    console.log(
      '🚀 ~ TipologieDropdownComponent ~ settipologie ~ this._tipologie:',
      this._tipologie
    );
  }

  constructor() {
    this.filteredTipologie = this.tipologiaFC.valueChanges.pipe(
      startWith(''),
      map((state) =>
        state ? this._filterStates(state) : this.tipologie.slice()
      )
    );
  }

  private _filterStates(value: string): Tipologie[] {
    const filterValue = value.toLowerCase();

    return this.tipologie.filter((tipologia) =>
      tipologia.name.toLowerCase().includes(filterValue)
    );
  }
}
