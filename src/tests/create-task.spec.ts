import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTask } from '../app/dashboard/create-task.component';

describe('CreateTask', () => {
  let component: CreateTask;
  let fixture: ComponentFixture<CreateTask>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTask],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTask);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
