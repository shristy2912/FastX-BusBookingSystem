import { Component } from '@angular/core';
import { adminService } from '../../services/admin-service.service';
import { Operator } from '../../services/operator.model';



@Component({
  selector: 'app-operator-account',
  templateUrl: './operator-acc.component.html',
  styleUrls: ['./operator-acc.component.css']
})
export class OperatorAccountComponent {

  constructor(public srv: adminService) {}

  ngOnInit(): void {
    this.srv.getOperatorList().subscribe(
      (operators: Operator[]) => {
        this.srv.list = operators;
        console.log('Operator list:', this.srv.list);
      },
      (error) => {
        console.error('Error fetching operator list:', error);
      }
    );
  }

  delRecord(pid) {
    if (confirm("Are you sure?")) {
      this.srv.delOperator(pid).subscribe(
        res => {
          alert("Operator deleted");
          this.srv.getOperatorList();
        },
        err => {
          alert("Error: " + err);
        }
      );
    }
  }
}
