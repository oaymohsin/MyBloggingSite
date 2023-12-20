import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataManagementService } from 'src/app/Shared/Services/data-management.service';
import { NotifierService } from 'src/app/Shared/Services/notifier.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent {
  @ViewChild('FileSelect') FileSelect: ElementRef | any;
  myuploadform: FormGroup | any;
  imageArray: any = [];
  category: any = [
    'Tech and Telecom',
    'Business',
    'Sports',
    'Education',
    'Social',
    'Career',
    'Videos',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private dataManagementService: DataManagementService,
    private snackBar: MatSnackBar,
    private snackBarService: NotifierService
  ) {
    this.buildForm();
  }

  buildForm() {
    this.myuploadform = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      category: new FormControl('', Validators.required),
    });
  }

  getimages(event: any) {
    let files = event.target.files;
    const filelength = files.length;

    if (filelength <= 5) {
      this.imageArray.push(...files);
    } else {
      this.imageArray = [];
      this.FileSelect.nativeElement.value = null;
    }
  }

  submitUploadForm() {
    let MultiPartFormData = new FormData();
    MultiPartFormData.append('title', this.myuploadform.get('title').value);
    MultiPartFormData.append(
      'description',
      this.myuploadform.get('description').value
    );
    MultiPartFormData.append(
      'category',
      this.myuploadform.get('category').value
    );
    this.imageArray.forEach((ImagesData: any) => {
      MultiPartFormData.append('images', ImagesData);
    });
    this.dataManagementService
      .UploadData(MultiPartFormData)
      .subscribe((Response: any) => {
        this.myuploadform.reset();
        this.imageArray = [];
        if (this.FileSelect) {
          this.FileSelect.nativeElement.value = null;
        }
        this.snackBar.open('Data inserted successfully!', 'Close', {
          duration: 10000, // Duration in milliseconds
          panelClass: 'success-snackbar', //Custom Css class. we can customize snackbar style
          horizontalPosition: 'center', // Change to 'end' or 'center'
          verticalPosition: 'top',
        });
      });
  }
  showSnackBar() {
    this.snackBarService.showNotification();
  }
}
