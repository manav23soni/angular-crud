
import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { ValidationService } from '../../../services/config/config.service';
import { StudentService } from '../../../services/student/student.service';
import { routerTransition } from '../../../services/config/config.service';

import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-student-add',
	templateUrl: './student-add.component.html',
	styleUrls: ['./student-add.component.css'],
	animations: [routerTransition()],
	host: { '[@routerTransition]': '' }
})

export class StudentAddComponent implements OnInit {
	// create studentAddForm of type FormGroup
	studentAddForm: FormGroup;
	index: any;
	resFileObj: any;
	@ViewChild('myInputImage', null) myInputImageVariable: any;

	constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private studentService: StudentService, private toastr: ToastrService) {

		// Check for route params
		this.route.params.subscribe(params => {
			this.index = params['id'];
			// check if ID exists in route & call update or add methods accordingly
			if (this.index && this.index !== null && this.index !== undefined) {
				this.getStudentDetails(this.index);
			} else {
				this.createForm(null);
			}
		});
	}

	ngOnInit() {
	}

	// Submit student details form
	doRegister() {
		if (this.index && this.index !== null && this.index !== undefined) {
			this.studentAddForm.value.id = this.index;
		} else {
			this.index = null;
		}
		const userData = new FormData();
		userData.append('firstName', this.studentAddForm.get('firstName').value);
		userData.append('lastName', this.studentAddForm.get('lastName').value);
		userData.append('email', this.studentAddForm.get('email').value);
		userData.append('phoneNumber', this.studentAddForm.get('phoneNumber').value);
		if (this.resFileObj) userData.append('profileImg', this.resFileObj);
		const studentRegister = this.studentService.doRegisterStudent(userData, this.index).subscribe(res => {
			if (res.data) {
				this.toastr.success(studentRegister.message, 'Success');
				this.router.navigate(['/']);
			} else {
				this.toastr.error(studentRegister.message, 'Failed');
			}
		});
	}

	levelImageFile(event) {
		const fileList: FileList = event.target.files;
		const file: File = fileList[0];
		if (fileList.length > 0) {
			if (file.size < 1e+7) {
				this.resFileObj = fileList[0];
			} else {
				return this.toastr.error('Please select image file');
			}
		}
	};

	// If this is update form, get user details and update form
	getStudentDetails(index: number) {
		this.studentService.getStudentDetails(index).subscribe(res => {
			this.createForm(res['data']);
		});
	}

	// If this is update request then auto fill form
	createForm(data) {
		if (data === null) {
			this.studentAddForm = this.formBuilder.group({
				firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
				lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
				phoneNumber: ['', [Validators.required]],
				email: ['', [Validators.required, ValidationService.emailValidator]]
			});
		} else {
			this.studentAddForm = this.formBuilder.group({
				firstName: [data.firstName, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
				lastName: [data.lastName, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
				phoneNumber: [data.phoneNumber, [Validators.required]],
				email: [{value: data.email, disabled: this.index}, [Validators.required, ValidationService.emailValidator]]
			});
		}
	}

}

