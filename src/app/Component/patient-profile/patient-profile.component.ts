import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AccountService } from 'src/app/_service/account.service';
import { Observable, of,map } from 'rxjs';
@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit{
  constructor(private account:AccountService){

  }
  ngOnInit(): void {
    this.account.local().subscribe(
        (value)=>
        {
          if(value){
            console.log(value)
          }

        });
      

    $(".ProfilePatient_left nav li a").first().toggleClass('hide-before');
    $(".ProfilePatient_left nav li a").on('click', function(event) {
        event.preventDefault();
        var current = $(event.target).parent();
        var siblings = [];
        var prevElement = current.prev();
        while (prevElement.length) {
            siblings.push(prevElement.get(0));
            prevElement = prevElement.prev();
        }
        var nextElement = current.next();
        while (nextElement.length) {
            siblings.push(nextElement.get(0));
            nextElement = nextElement.next();
        }
        siblings.forEach(function(sub) {
          if (sub) { // Check if sub is not undefined
              var subElement = $(sub).find("a");
              subElement.css('background-color', '#fff');
              if (!subElement.hasClass('hide-before')) {
                  subElement.toggleClass('hide-before');
              }
          }
      });
        $(event.target).css('background-color', 'rgb(249,250,251)');
        $(event.target).removeClass('hide-before');
        
        console.log($(event.target).attr('class'));
        if ($(event.target).attr('class')?.includes('medical_examination_schedule')) {
            $(".ProfilePatient_medical_examination_schedule_right").css('display', 'block');
            $(".ProfilePatient_history_pay_right").css('display', 'none');
            $(".ProfilePatient_file_right").css('display', 'none');
            $(".ProfilePatient_account_right").css('display', 'none');
        } else if ($(event.target).attr('class')?.includes('history_pay')) {
            $(".ProfilePatient_medical_examination_schedule_right").css('display', 'none');
            $(".ProfilePatient_history_pay_right").css('display', 'block');
            $(".ProfilePatient_history_pay_right .ProfilePatient_medical_examination_schedule_right").css('display', 'block');
            $(".ProfilePatient_file_right").css('display', 'none');
            $(".ProfilePatient_account_right").css('display', 'none');
        } else if ($(event.target).attr('class')?.includes('file')) {
            $(".ProfilePatient_medical_examination_schedule_right").css('display', 'none');
            $(".ProfilePatient_history_pay_right").css('display', 'none');
            $(".ProfilePatient_file_right").css('display', 'block');
            $(".ProfilePatient_file_right .ProfilePatient_medical_examination_schedule_right").css('display', 'block');
            $(".ProfilePatient_account_right").css('display', 'none');
        } else if ($(event.target).attr('class')?.includes('account')) {
            $(".ProfilePatient_medical_examination_schedule_right").css('display', 'none');
            $(".ProfilePatient_history_pay_right").css('display', 'none');
            $(".ProfilePatient_file_right").css('display', 'none');
            $(".ProfilePatient_account_right").css('display', 'block');
            $(".ProfilePatient_account_right .ProfilePatient_medical_examination_schedule_right").css('display', 'block');
        }
        $(".ProfilePatient_medical_examination_schedule_right .ProfilePatient_right_title_button").on('click', function(event) {
          $(this).children("form").css('display', 'block');
      });
      
      $(".ProfilePatient_medical_examination_schedule_right .ProfilePatient_right_title_button a").on('click', function(event) {
          $(this).closest(".ProfilePatient_right_title_button").find("form").css('display', 'none');
      });
      
      $(".ProfilePatient_right_content_right_change_infor button").on('click', function(event) {
          $(".ProfilePatient_file_right .ProfilePatient_right_content_right").css('display', 'none');
          $(".ProfilePatient_right_content_right_new_profile").css('display', 'block');
      });
      
      $(".ProfilePatient_right_content_right_container_update_profile_button button").on('click', function(event) {
          $(".ProfilePatient_file_right .ProfilePatient_right_content_right").css('display', 'block');
          $(".ProfilePatient_right_content_right_new_profile").css('display', 'none');
      });
      
      $(".ProfilePatient_right_content_right_container_add_profile_button").on('click', function(event) {
          $(".ProfilePatient_file_right .ProfilePatient_right_content_right").css('display', 'none');
          $(".ProfilePatient_right_content_right_new_profile").css('display', 'block');
      });
    });
    
  }

  
}
