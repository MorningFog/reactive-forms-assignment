import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  projectForm: FormGroup;

  invalidProjectName = 'Test';

  isSubmitted = false;

  projectNameInvalid = true;

  project = {
    projectName: '',
    email: '',
    projectStatus: ''
  };

  ngOnInit() {
    this.projectForm = new FormGroup({
      projectData: new FormGroup({
        projectName: new FormControl(null, [Validators.required], this.validateProjectName.bind(this)),
        email: new FormControl(null, [Validators.required, Validators.email]),
        projectStatus: new FormControl(null)
      })
    });

    this.projectForm.patchValue({
      projectData: {
        projectStatus: 'stable'
      }
    });
  }

  validateProjectName(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === this.invalidProjectName) {
          this.projectNameInvalid = true;
          resolve({ projectNameForbidden: true });
        } else {
          this.projectNameInvalid = false;
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  formInvalid() {
    return (this.projectForm.invalid && this.projectForm.touched);
  }

  onSubmit() {
    this.isSubmitted = true;

    this.project.projectName = this.projectForm.value.projectData.projectName;
    this.project.email = this.projectForm.value.projectData.email;
    this.project.projectStatus = this.projectForm.value.projectData.projectStatus;

    this.projectForm.reset();
  }
}
