import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { StudentService } from "src/app/service/student.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-create-inventory",
  templateUrl: "./create-inventory.component.html",
  styleUrls: ["./create-inventory.component.css"],
})

export class CreateInventoryComponent implements OnInit {
  private URL: string = environment.url;
  studentForm: FormGroup;
  submitted:boolean = false;
  studentId: string;
  States: any = ['Punjab', 'Delhi', 'Goa', 'Harayana'];
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  buttonName: string;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.pattern(this.emailRegx)]],
      state: ["", Validators.required],
      city: ["", Validators.required],
      dob: ['',Validators.required]
    });

    this.studentId = this.route.snapshot.paramMap.get("id");
    if(this.studentId){
      this.getSingleValue(this.studentId);
      this.buttonName = "Update"
    }else{
      this.buttonName = "Submit"
    }
  }

  studentList(){
    this.router.navigate(["inventory-list"]);
  }

  get f(){
    return this.studentForm.controls;
  }

  date(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.studentForm.get('dob').setValue(convertDate, {
      onlyself: true
    })
  }
  
  onSubmit() {
    this.submitted = true;
    if(this.studentForm.invalid){
      return
    }
    if (this.studentId) {
      this.http
        .put(this.URL + "/student/" + this.studentId, this.studentForm.value)
        .subscribe(
          (res) => {
            if (res) {
              this.toastr.success("Updated Succesfully");
              this.router.navigate(["inventory-list"]);
            } else {
              this.toastr.error("Error");
            }
          },
          (error) => {
            this.toastr.error("Something went wrong while editing!!");
            alert(error);
          }
        );
    } else {
      this.studentService.addStudent(this.studentForm.value).subscribe(
        (res) => {
          if (res) {
            this.toastr.success("Student added succesfully");
            this.router.navigate(["/inventory-list"]);
          } else {
            this.toastr.error("Something Went Wrong");
          }
        },
        (error) => {
          this.toastr.error("Something went wrong while adding!!");
          alert(error);
        }
      );
    }
  }

  getSingleValue(id) {
    this.studentService.singleValue(id).subscribe((res) => {
      if (res) {
        this.studentForm.patchValue({
          firstName: res["firstName"],
          lastName: res["lastName"],
          email: res["email"],
          state: res["state"],
          city: res["city"],
          dob: res["dob"]
        });
      } else {
        this.toastr.error("Something Went Wrong");
      }
    },
    (error) => {
      this.toastr.error("Something went wrong !!");
      alert(error);
    });
  }
}
