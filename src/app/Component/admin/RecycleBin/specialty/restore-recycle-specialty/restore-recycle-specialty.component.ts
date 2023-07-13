import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { listRecycleSpecialtyService } from 'src/app/_service/RecycleBin/listRecycleSpecialty.service';

@Component({
  selector: 'app-restore-recycle-specialty',
  templateUrl: './restore-recycle-specialty.component.html',
  styleUrls: ['./restore-recycle-specialty.component.css']
})
export class RestoreRecycleSpecialtyComponent {
  specialtyForm: FormGroup;
  constructor(private listRecycleSpecialtyService: listRecycleSpecialtyService, private formBuilder: FormBuilder, private dialogRef: MatDialogRef<RestoreRecycleSpecialtyComponent>, private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) private data: any) {
    this.specialtyForm = this.formBuilder.group({
      id: this.data.id,
      specialtyName: this.data.specialtyName,
      image: this.data.image,
      isDelete: this.data.isDelete
    })
  }

  ngOnInit(): void {
    console.log(this.specialtyForm.value)
  }

  closeRestorePosition() {
    this.dialogRef.close(true)
  }

  RestoreSpecialty() {
    this.listRecycleSpecialtyService.RestoreSpecialty(this.specialtyForm.value)
    .subscribe({
      next: (respone: any) => {
        if(respone.code === 200){
          this.dialogRef.close(true);
          this.toastr.success(respone.message, "", {
            progressBar: true,
            closeButton: true
        })
      }
        else{
          this.toastr.error(respone.message, "", {})
        }

    },
    error: (error)  => {
      console.log('Thất bại:', error);
    }
  })
  }
}
