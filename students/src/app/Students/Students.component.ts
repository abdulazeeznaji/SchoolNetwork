/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { StudentsService } from './Students.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Students',
	templateUrl: './Students.component.html',
	styleUrls: ['./Students.component.css'],
  providers: [StudentsService]
})
export class StudentsComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          assetId = new FormControl("", Validators.required);
        
  
      
          school = new FormControl("", Validators.required);
        
  
      
          StudentName = new FormControl("", Validators.required);
        
  
      
          Grade = new FormControl("", Validators.required);
        
  
      
          GPA = new FormControl("", Validators.required);
        
  


  constructor(private serviceStudents:StudentsService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          assetId:this.assetId,
        
    
        
          school:this.school,
        
    
        
          StudentName:this.StudentName,
        
    
        
          Grade:this.Grade,
        
    
        
          GPA:this.GPA
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceStudents.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.crypto.mynetwork.Students",
      
        
          "assetId":this.assetId.value,
        
      
        
          "school":this.school.value,
        
      
        
          "StudentName":this.StudentName.value,
        
      
        
          "Grade":this.Grade.value,
        
      
        
          "GPA":this.GPA.value
        
      
    };

    this.myForm.setValue({
      
        
          "assetId":null,
        
      
        
          "school":null,
        
      
        
          "StudentName":null,
        
      
        
          "Grade":null,
        
      
        
          "GPA":null
        
      
    });

    return this.serviceStudents.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "assetId":null,
        
      
        
          "school":null,
        
      
        
          "StudentName":null,
        
      
        
          "Grade":null,
        
      
        
          "GPA":null 
        
      
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.crypto.mynetwork.Students",
      
        
          
        
    
        
          
            "school":this.school.value,
          
        
    
        
          
            "StudentName":this.StudentName.value,
          
        
    
        
          
            "Grade":this.Grade.value,
          
        
    
        
          
            "GPA":this.GPA.value
          
        
    
    };

    return this.serviceStudents.updateAsset(form.get("assetId").value,this.asset)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceStudents.deleteAsset(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceStudents.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "assetId":null,
          
        
          
            "school":null,
          
        
          
            "StudentName":null,
          
        
          
            "Grade":null,
          
        
          
            "GPA":null 
          
        
      };



      
        if(result.assetId){
          
            formObject.assetId = result.assetId;
          
        }else{
          formObject.assetId = null;
        }
      
        if(result.school){
          
            formObject.school = result.school;
          
        }else{
          formObject.school = null;
        }
      
        if(result.StudentName){
          
            formObject.StudentName = result.StudentName;
          
        }else{
          formObject.StudentName = null;
        }
      
        if(result.Grade){
          
            formObject.Grade = result.Grade;
          
        }else{
          formObject.Grade = null;
        }
      
        if(result.GPA){
          
            formObject.GPA = result.GPA;
          
        }else{
          formObject.GPA = null;
        }
      

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({
      
        
          "assetId":null,
        
      
        
          "school":null,
        
      
        
          "StudentName":null,
        
      
        
          "Grade":null,
        
      
        
          "GPA":null 
        
      
      });
  }

}
