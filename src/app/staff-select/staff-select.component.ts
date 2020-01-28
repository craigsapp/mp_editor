import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { StaffService } from '../staff.service';
import { HNPService } from '../hnp.service';
import { Voice, Mensuration } from '../definitions';

@Component({
  selector: 'app-staff-select',
  templateUrl: './staff-select.component.html',
  styleUrls: ['./staff-select.component.css']
})
export class StaffSelectComponent implements OnInit {

  constructor(public staffService: StaffService, private hnpService: HNPService) { }

  ngOnInit() {
    this.staffService.selectedStaff.subscribe({
      next: (staff) => {
        console.log(staff.voice.toString());
        this.staffForm.get('voice').setValue(staff.voice.toString());
        this.staffForm.get('modus').setValue(staff.modus.toString());
        this.staffForm.get('tempus').setValue(staff.tempus.toString());
        this.staffForm.get('prolatio').setValue(staff.prolatio.toString());
      }
    })
  }

  staffForm = new FormGroup({
    voice: new FormControl(''),
    modus: new FormControl(''),
    tempus: new FormControl(''),
    prolatio: new FormControl('')
  });

  onSubmit() {
    if (this.staffService._selectedStaff !== null) {
      console.log("Set!");
      this.staffService._selectedStaff.voice = this.staffForm.get('voice').value as Voice;
      this.staffService._selectedStaff.modus = this.staffForm.get('modus').value as Mensuration;
      this.staffService._selectedStaff.tempus = this.staffForm.get('tempus').value as Mensuration;
      this.staffService._selectedStaff.prolatio = this.staffForm.get('prolatio').value as Mensuration;
    }
  }

}
