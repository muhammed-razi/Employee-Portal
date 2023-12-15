import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../user-api.service';
import { UserModel } from '../users.model';
import jspdf from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent   implements OnInit{

  p: number = 1;
  searchKey:string=""
  allUsers:UserModel[]=[]
  constructor(private  api:UserApiService,private toaster:ToasterService){}
  //
ngOnInit(): void {
  this.getAllusers()
}
getAllusers(){
  console.log("Inside all users");
  
  this.api.getAllUserApi().subscribe({
    next:(res:any)=>{
      console.log(res); 
      this.allUsers = res     
    },
    error:(err:any)=>{
      this.toaster.showError(err.message)
    }
  })
}
removeUser(id:any){
  this.api.deleteUserApi(id).subscribe({
    next:(res:any)=>{
      console.log(res); 
      this.toaster.showSuccess("User removed successfully")
     this.getAllusers()
    },
    error:(err:any)=>{
      this.toaster.showError(err.message)
    }
  })
}

sortById(){
  this.allUsers.sort((a:any,b:any)=>a.id-b.id)
}

sortByName(){
  this.allUsers.sort((a:any,b:any)=>a.name.localeCompare(b.name))
  console.log(this.allUsers);
}

generatePDF(){
  let pdf = new jspdf()
  let head = [['Id','Username','Email','Status']]
  let body:any = []
  this.allUsers.forEach((item:any)=>{
    body.push([item.id,item.name,item.email,item.active])
  })
  pdf.setFontSize(16)
  pdf.text("All Users List",10,10)
  autoTable(pdf,{head,body})
  pdf.output('dataurlnewwindow')
  pdf.save('alluserslist.pdf')
}
}
