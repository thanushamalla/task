import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tasDetail !: FormGroup;
  tasObj : Task= new Task();
  tasList : Task[] = [];

  filters = {
    keyword: '',
    sortBy: 'Title',
    sortBy: 'Description',
    sortBy: 'Duedate',
    filter:'tag',
    filter:'status'

  }


  constructor(private formbuilder : FormBuilder,private tasService : TaskService) { }
     
date1 =new Date();
currentYear=this.date1.getUTCFullYear();
currentMonth=this.date1.getUTCMonth()+1;
currentDay=this.date1.getUTCDate();

CurrentDate ="2022-7-7";
FinalMonth : any;
FinalDay : any;


  ngOnInit(): void {

    if(this.currentMonth<10){
      this.FinalMonth="0"+this.currentMonth;
    }else{
  this.FinalMonth=this.currentMonth;
}

if(this.currentDay<10){
  this.FinalDay="0"+this.currentDay;
}else{
this.FinalDay=this.currentDay;
}

    this.getAllTask();
    this.tasDetail = this.formbuilder.group({
      timestamp :[''],
      title :[''],
      description :[''],
      duedate :[''],
      tag :[''],
      status : ['']

    });
    addTask() {
      console.log(this.tasDetail);
      this.tasObj.timestamp= this.tasDetail.value.timestamp;
      this.tasObj.title= this.tasDetail.value.title;
      this.tasObj.description= this.tasDetail.value.description;
      this.tasObj.duedate = this.tasDetail.value.duedate;
      this.tasObj.tag=this.tasDetail.value.tag;
      this.tasObj.status=this.tasDetail.value.status;

  
      this.tasService.addTask(this.tasObj).subscribe(res=>{
          console.log(res);
          this.getAllTask();
      },err=>{
          console.log(err);
      });
  
    }
  
    getAllTask() {
      this.tasService.getAllTask().subscribe(res=>{
          this.tasList = res;
      },err=>{
        console.log("error while fetching data.")
      });
    }
  
    editTask(tas: Task) {
      this.tasDetail.controls['title'].setValue(tas.title);
      this.tasDetail.controls['description'].setValue(tas.description);
      this.tasDetail.controls['duedate'].setValue(tas.duedate);
      this.tasDetail.controls['tag'].setValue(tas.tag);
      this.tasDetail.controls['status'].setValue(tas.status);
}
  
    updateTask() {
  
      this.tasObj.timestamp = this.tasDetail.value.timestamp;
      this.tasObj.title = this.tasDetail.value.title;
      this.tasObj.description = this.tasDetail.value.description;
      this.tasObj.duedate= this.tasDetail.value.duedate;
      this.tasObj.tag= this.tasDetail.value.tag;
      this.tasObj.status= this.tasDetail.value.status;
  
  
      this.tasService.updateTask(this.tasObj).subscribe(res=>{
        console.log(res);
        this.getAllTask();
      },err=>{
        console.log(err);
      })
    }
  
    deleteTask(tas: Task) {
  
      this.tasService.deleteTask(tas).subscribe(res=>{
        console.log(res);
        alert('Task deleted successfully');
        this.getAllTask();
      },err => {
        console.log(err);
      });
  
  }

}
