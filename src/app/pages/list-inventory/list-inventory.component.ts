import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { StudentService } from "src/app/service/student.service";

@Component({
  selector: "app-list-inventory",
  templateUrl: "./list-inventory.component.html",
  styleUrls: ["./list-inventory.component.css"],
})
export class ListInventoryComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "name",
    "dob",
    "email",
    "state",
    "city",
    "actions",
  ];
  dataSource: any;

  constructor(
    private studentService: StudentService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUserList();
  }

  
  addStudent(){
    this.router.navigate(["inventory-create"]);
  }

  getUserList() {
    this.studentService.studentList().subscribe(
      (res) => {
        if (res) {
          this.dataSource = res;
        } else {
          console.log("Error");
        }
      },
      (error) => {
        this.toastr.error("Something went wrong !!");
        alert(error);
      }
    );
  }

  editStudentDetails(id) {
    this.router.navigate([`/inventory-create/${id}`]);
  }

  deleteButton(id) {
    this.studentService.deleteStudent(id).subscribe(
      (res) => {
        if (res) {
          this.toastr.success("Succesfully Deleted");
          this.getUserList();
        } else {
          this.toastr.error("Failed To Delete");
        }
      },
      (error) => {
        this.toastr.error("Something went wrong !!");
        alert(error);
      }
    );
  }
}
