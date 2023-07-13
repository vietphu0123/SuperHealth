import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SpecialtyService } from 'src/app/_service/specialty.service';

@Component({
  selector: 'app-add-edit-specialty',
  templateUrl: './add-edit-specialty.component.html',
  styleUrls: ['./add-edit-specialty.component.css']
})
export class AddEditSpecialtyComponent implements OnInit {
  specialtyForm: FormGroup;
  file: any;
  loading: boolean = false

  constructor(private specialtyService: SpecialtyService, private formBuilder: FormBuilder, private dialogRef: MatDialogRef<AddEditSpecialtyComponent>,
    private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any, private firestogare: AngularFireStorage) {
    this.specialtyForm = this.formBuilder.group({
      SpecialtyName: [null, [Validators.required]],
      Image: ''
    });
    if (this.data) {
      this.specialtyForm = this.formBuilder.group({
        Id: data.id,
        SpecialtyName: [data.specialtyName, [Validators.required]],
        Image: data.image
      });
    }
  }
  ngOnInit(): void {
    console.log(this.specialtyForm.value)
  }

  get specialtyName(): AbstractControl {

    return this.specialtyForm.controls['SpecialtyName'];

  }

  get image(): AbstractControl {

    return this.specialtyForm.controls['Image'];

  }

  async AddSpecialty() {
    this.loading = true
    if (this.file) {
      const uploadTask = this.firestogare.upload(this.file.name, this.file);
      this.specialtyForm.value.Image = await (await uploadTask).ref.getDownloadURL();
    }
    if (this.data) {
      this.specialtyService.UpdateSpecialty(this.specialtyForm.value).subscribe({
        next: (response: any) => {
          if (response.code === 200) {
            this.dialogRef.close(true);
            this.toastr.success(response.message, "", {
              progressBar: true,
              closeButton: true
            })
          }
          else {
            this.loading = false
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
      this.specialtyService.AddSpecialty(this.specialtyForm.value).subscribe({
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
    previewImg.setAttribute("width", "200px");
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
