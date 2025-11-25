import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TextfieldComponent } from '@house-plan/ui-components';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface NewProjectData {
  projectName: string | null;
  clientName: string | null;
  startDate: string | null;
  budget: number | null;
}

@Component({
  standalone: true,
  selector: 'lib-new-project-form',
  imports: [CommonModule, ReactiveFormsModule, TextfieldComponent],
  templateUrl: './new-project-form.html',
  styleUrl: './new-project-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewProjectForm implements OnInit {
  private fb = inject(FormBuilder);
  projectForm!: FormGroup;

  isLoading = signal<boolean>(false);
  submissionSuccess = signal<boolean>(false);

  private destroyRef = inject(DestroyRef);
  private router: Router = inject(Router);

  constructor() {
    this.createForm();
  }

  ngOnInit(): void {
    this.monitorFormChanges();
  }

  createForm(): void {
    this.projectForm = this.fb.group({
      projectName: ['', Validators.required],
      clientName: ['', Validators.minLength(2)],
      startDate: [this.getTodayDate(), Validators.required],
      budget: [null, [Validators.required, Validators.min(1000)]],
    });
  }

  monitorFormChanges(): void {
    this.projectForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.submissionSuccess.set(false);
      });
  }

  onSubmit(): void {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    const data = this.projectForm.value as NewProjectData;

    setTimeout(() => {
      this.isLoading.set(false);
      this.submissionSuccess.set(true);
      this.projectForm.reset({ startDate: this.getTodayDate() });
    }, 1500);
  }

  getControlError(controlName: keyof NewProjectData, errorType: string): boolean | undefined {
    const control = this.projectForm.get(controlName);
    return control?.hasError(errorType) && (control?.touched || control?.dirty);
  }

  private getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  public backToHome(){
    this.router.navigate(['/home']);
  }
}