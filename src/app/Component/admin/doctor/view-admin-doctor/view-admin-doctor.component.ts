import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-admin-doctor',
  templateUrl: './view-admin-doctor.component.html',
  styleUrls: ['./view-admin-doctor.component.css']
})
export class ViewAdminDoctorComponent {
  constructor(private dialogRef: MatDialogRef<ViewAdminDoctorComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    // console.log(data)
  }

  closeModal() {
    this.dialogRef.close(true)
  }
}
