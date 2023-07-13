import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { positionService } from 'src/app/_service/position.service';

@Component({
  selector: 'app-add-edit-position',
  templateUrl: './add-edit-position.component.html',
  styleUrls: ['./add-edit-position.component.css']
})
export class AddEditPositionComponent implements OnInit {
  positionForm: FormGroup;
  file: any;
  loading: boolean = false

  constructor(private positionService: positionService, private formBuilder: FormBuilder, private dialogRef: MatDialogRef<AddEditPositionComponent>
    , private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any, private firestogare: AngularFireStorage) {

      this.positionForm = this.formBuilder.group({
      PositionName: [null, [Validators.required]],
      Image: ''
    });
    if (this.data) {
      this.positionForm = this.formBuilder.group({
        Id: data.id,
        PositionName: [data.positionName, [Validators.required]],
        Image:''
      });
    }
  }
  ngOnInit(): void {
    console.log(this.positionForm.value)
  }

  get positionName(): AbstractControl {

    return this.positionForm.controls['PositionName'];

  }

  get image(): AbstractControl {

    return this.positionForm.controls['Image'];

  }

  async AddPosition() {
    this.loading = true
    if (this.file) {
      const uploadTask = this.firestogare.upload(this.file.name, this.file);
      this.positionForm.value.Image = await (await uploadTask).ref.getDownloadURL();
    }
    if (this.data) {
      this.positionService.UpdatePosition(this.positionForm.value).subscribe({
        next: (response: any) => {
          if (response.code === 200) {
            this.dialogRef.close(true);
            this.toastr.success(response.message, "", {
              progressBar: true,
              closeButton: true
            })
          }
          else {
            this.toastr.error(response.message, "", {
              progressBar: true,
              closeButton: true
            })
          }
        },
        error: (error) => {
          this.loading = false
          this.toastr.error("Có lỗi")
        }
      })
    } else {
      this.positionService.AddPosition(this.positionForm.value).subscribe({
        next: (response: any) => {
          if (response.code === 200) {
            this.dialogRef.close(true);
            this.toastr.success(response.message, "", {
              progressBar: true,
              closeButton: true
            })
          }
          else {
            this.toastr.error(response.message, "", {
              progressBar: true,
              closeButton: true
            })
          }
        },
        error: (error) => {
          this.toastr.error("Có lỗi")
        }
      })
    }
  }


  closeAddSpecialty() {
    this.dialogRef.close(true)
  }

  async dragNdrop(event: any) {
    this.file = event.target.files[0];
    var fileName = URL.createObjectURL(event.target.files[0]);
    var preview: any = document.getElementById("preview");
    var previewImg: any = document.createElement("img");
    previewImg.setAttribute("src", fileName);
    preview.innerHTML = "";
    preview.appendChild(previewImg);
  }
  drag() {
    var a: any = document.getElementById('uploadFile');
    a.parentNode.className = 'draging dragBox';
  }
  drop() {
    var b: any = document.getElementById('uploadFile');
    b.parentNode.className = 'dragBox';
  }
}
