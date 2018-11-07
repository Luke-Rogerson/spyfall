import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinGameMenuComponent } from './join-game-menu.component';

describe('JoinGameMenuComponent', () => {
  let component: JoinGameMenuComponent;
  let fixture: ComponentFixture<JoinGameMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinGameMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinGameMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
