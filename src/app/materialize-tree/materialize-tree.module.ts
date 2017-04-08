import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterializeTreeComponent } from './materialize-tree.component';

@NgModule({
    declarations: [MaterializeTreeComponent],
    imports: [CommonModule],
    exports: [MaterializeTreeComponent]
})
export class MaterializeTreeModule { }