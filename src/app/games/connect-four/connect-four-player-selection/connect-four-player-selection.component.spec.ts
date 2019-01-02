import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectFourPlayerSelectionComponent } from './connect-four-player-selection.component';

describe('ConnectFourPlayerSelectionComponent', () => {
  let component: ConnectFourPlayerSelectionComponent;
  let fixture: ComponentFixture<ConnectFourPlayerSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectFourPlayerSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectFourPlayerSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
