
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';

// Services
import { StudentService } from '../../../services/student/student.service';
import { routerTransition } from '../../../services/config/config.service';

@Component({
	selector: 'app-student-details',
	templateUrl: './student-details.component.html',
	styleUrls: ['./student-details.component.css'],
	animations: [routerTransition()],
	host: { '[@routerTransition]': '' }
})

export class StudentDetailsComponent implements OnInit {
	index: any;
	studentDetail: any;
	logo: string;
	
	constructor(private router: Router, private route: ActivatedRoute, private studentService: StudentService, private toastr: ToastrService) {
		// Get user detail index number sent in params
		this.route.params.subscribe(params => {
			this.index = params['id'];
			if (this.index && this.index != null && this.index !== undefined) {
				this.getStudentDetails(this.index);
			}
		});
	}

	ngOnInit() {
	}

	// Get student details
	getStudentDetails(index: number) {
		const getStudentDetail = this.studentService.getStudentDetails(index).subscribe(res => {
			this.logo = `${environment.profileImageUrl}${res['data'].profileImg}`
			this.studentDetail = res['data'];
			this.toastr.success(null, 'Success');
		});
	}

}


