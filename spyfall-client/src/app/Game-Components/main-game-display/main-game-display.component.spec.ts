import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainGameDisplayComponent } from './main-game-display.component';

describe('MainGameDisplayComponent', () => {
  let component: MainGameDisplayComponent;
  let fixture: ComponentFixture<MainGameDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainGameDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainGameDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
