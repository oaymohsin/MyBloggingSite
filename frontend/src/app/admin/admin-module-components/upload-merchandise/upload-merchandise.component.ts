import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DataManagementService } from 'src/app/Shared/Services/data-management.service';

@Component({
  selector: 'app-upload-merchandise',
  templateUrl: './upload-merchandise.component.html',
  styleUrls: ['./upload-merchandise.component.css'],
})
export class UploadMerchandiseComponent {
  @ViewChild('FileSelect') FileSelect: ElementRef | any;
  myuploadform: FormGroup | any;
  imageArray: any = [];
  category: any = ['Shirts', 'Trousers', 'caps'];

  constructor(
    private formbuilder: FormBuilder,
    private dataManagementService: DataManagementService
  ) {
    this.buildform();
  }

  buildform() {
    this.myuploadform = this.formbuilder.group({
      name: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),

      category: new FormControl('', Validators.required),
    });
  }

  getimages(event: any) {
    let files = event.target.files;
    let filelength = files.length;

    if (filelength <= 5) {
      this.imageArray.push(...files);
    } else {
      this.imageArray = [];
      this.FileSelect.nativeElement.value = null;
    }
  }

  submitUploadForm() {
    let MultiPartFormData = new FormData();
    MultiPartFormData.append('name', this.myuploadform.get('name').value);
    MultiPartFormData.append(
      'quantity',
      this.myuploadform.get('quantity').value
    );
    MultiPartFormData.append('price', this.myuploadform.get('price').value);
    MultiPartFormData.append(
      'category',
      this.myuploadform.get('category').value
    );
    this.imageArray.forEach((ImagesData: any) => {
      MultiPartFormData.append('images', ImagesData);
    });
    this.dataManagementService
      .uploadMerchandisedata(MultiPartFormData)
      .subscribe((Response: any) => {
        this.myuploadform.reset();
        this.imageArray = [];
        if (this.FileSelect) {
          this.FileSelect.nativeElement.value = null;
        }
      });
  }
}
