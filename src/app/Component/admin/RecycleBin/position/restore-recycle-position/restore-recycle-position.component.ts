import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { listRecyclePositionService } from 'src/app/_service/RecycleBin/listRecyclePosition.service';

@Component({
  selector: 'app-restore-recycle-position',
  templateUrl: './restore-recycle-position.component.html',
  styleUrls: ['./restore-recycle-position.component.css']
})
export class RestoreRecyclePositionComponent {

  positionForm: FormGroup;
  constructor(private listRecyclePositionService: listRecyclePositionService, private formBuilder: FormBuilder, private dialogRef: MatDialogRef<RestoreRecyclePositionComponent>, private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) private data: any) {
    this.positionForm = this.formBuilder.group({
      id: this.data.id,
      positionName: this.data.positionName,
      // image: this.data.image,
      isDelete: this.data.isDelete
    })
  }

  ngOnInit(): void {
    console.log(this.positionForm.value)
  }

  closeRestorePosition() {
    this.dialogRef.close(true)
  }

  RestorePosition() {
    this.listRecyclePositionService.RestorePosition(this.positionForm.value)
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
