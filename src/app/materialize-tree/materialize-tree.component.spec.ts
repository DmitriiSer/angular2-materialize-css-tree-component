import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterializeTreeComponent } from './materialize-tree.component';

describe('MaterializeTreeComponent', () => {
  let component: MaterializeTreeComponent;
  let fixture: ComponentFixture<MaterializeTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterializeTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterializeTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
