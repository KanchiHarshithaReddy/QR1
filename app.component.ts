import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  finaluploadName:any;
  errormsg: any;
  show: boolean = false;
  title = 'Generate a QR code ';
  selected: File | undefined;
  urlData: any;
  formData: FormGroup;
  uploadfile: FormGroup;
  submit: any;
  data: any = [];
  url = "https://hfclazureblob.blob.core.windows.net/npdprocessdocs/"
  fileUrl: any;
  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer,private http:HttpClient) {
    this.url;
    this.formData = this.fb.group({
      value: ['', Validators.required]
    })
    console.log(this.formData, "formData")
    this.uploadfile = this.fb.group({
      file: [null, Validators.required]
    })
    console.log(this.uploadfile, "uploadfile")
  }
  onFileUpload() {
    let postUrl="  http://localhost:3000/posts"
    let obj = {
      file: this.selected?.name
    }
    console.log(obj, "öbj")
    // console.log( this.finaluploadName,"finaluploadName")
    this.http.post('http://localhost:3000/fileUpload',obj).subscribe((response)=>{
      console.log(response,"fileupload data");
    })
  }

  onSubmit() {
    this.submit = {
      VALUE: this.formData.value?.value
    }
    console.log(this.submit, "submitdata")
    this.data = this.submit;
    console.log(this.data, "data")
    this.urlData = this.url + this.data.VALUE + ".pdf"
  }

  onFileSelected(event) {
    this.selected = <File>event.target.files[0];
    if (this.selected.type === 'application/pdf') {
      this.show = true;
      this.errormsg = '';
    } else {
      this.show = false;
      this.errormsg = 'file type should be  pdf only'
    }
  }
  print() {
    this.urlData = this.url + this.data.VALUE + ".pdf";
    setTimeout(()=>{
      window.print();
    },1000)
  }
}

