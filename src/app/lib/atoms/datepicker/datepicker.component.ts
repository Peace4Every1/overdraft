import {Component, Output, ElementRef, EventEmitter, HostListener, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.less']
})

export class DatepickerComponent implements OnInit {
  @Output() selectDate = new EventEmitter();
  // ui
  @Input() calendarIconClass;
  @Input() leftArroxIcon;
  @Input() rightArroxIcon;

  // logic
  datePickerVisible = true;
  @Input() startsFromMonday = false;

  dateFormat = 'dd/mm/yyyy';
  placeholder = '';
  selectedDay = null;
  selectedDate = null;
  d = new Date();

  mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  curMonth;
  curMonthIndex;
  staticCurMonthIndex;
  selectedMonthIndex;

  curYear;
  staticYear;
  selectedYear;
  manualChangeYear;

  wDl = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
  wDStep = 0;
  weekDays: any = [];
  curDay;
  daysInCurMonth;
  firstDayInMonthWeekIndex;

  @ViewChild('datepicker', {read: ElementRef}) datepickerEl: ElementRef;

  constructor( private elRef: ElementRef) {}

  ngOnInit() {
    if ( this.startsFromMonday ) {
      this.wDl = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
      this.wDStep = -1;
    }
    this.initDatePicker();
  }

  initDatePicker() {
    // init month
    this.curMonthIndex = this.d.getMonth();
    this.staticCurMonthIndex = this.d.getMonth();
    this.curMonth = this.mL[this.curMonthIndex];

    // init year
    this.curYear = this.d.getFullYear();
    this.staticYear = this.d.getFullYear();

    this.initDaysOfMonth();

  }

  initDaysOfMonth() {
    // reset
    this.weekDays = [];

    // init days
    this.curDay = this.d.getDate(); // today date
    this.daysInCurMonth = new Date(this.curYear, this.curMonthIndex + 1, 0).getDate();
    this.firstDayInMonthWeekIndex = new Date(this.curYear, this.curMonthIndex, 1).getDay() + this.wDStep;

    // first week
    const firstWeekInMonth = [];
    const daysInFirstWeek = 7 - this.firstDayInMonthWeekIndex;
    let counter = 7;
    while (counter) {
      if ( counter > 7 - this.firstDayInMonthWeekIndex ) {
        firstWeekInMonth.push('');
      }
      counter--;
    }

    for (let i = 1; i <= daysInFirstWeek; i++) {
      firstWeekInMonth.push(i);
    }
    this.weekDays.push(firstWeekInMonth);

    // rest weeks
    const secondWeekStart = daysInFirstWeek + 1;
    const restDaysInMonth = this.daysInCurMonth - daysInFirstWeek;

    const weeksInMonth =  Math.floor(restDaysInMonth / 7);
    let week = [];
    for (let i = secondWeekStart; i <= this.daysInCurMonth; i++ ) {
      week.push(i);
      if ( week.length === 7) {
        this.weekDays.push(week);
        week = [];
      }
    }

    // last week if incomplete
    if ( this.weekDays.length === weeksInMonth + 1 && this.weekDays[weeksInMonth][6] !== this.daysInCurMonth) {
      const lastWeek = [];
      let _counter = 7;
      let start = this.weekDays[weeksInMonth][6] + 1;

      while ( _counter ) {
        if ( start <= this.daysInCurMonth ) {
          lastWeek.push(start);
        } else {
          lastWeek.push('');
        }

        start++;
        _counter--;
      }

      this.weekDays.push(lastWeek);

    }
  }

  changeMonth(index) {
    const curMonthIndex = this.curMonthIndex + index;
    this.curMonthIndex = curMonthIndex;
    if ( curMonthIndex === -1 ) {
      this.curMonthIndex = 11;
      this.curYear = this.curYear - 1;
    } else if ( curMonthIndex === 11 ) {
      this.curMonthIndex = 1;
      this.curYear = this.curYear + 1;
    }

    this.curMonth = this.mL[this.curMonthIndex];
    this.initDaysOfMonth();
  }

  changeYear(index) {
    this.curYear += index;
    this.initDaysOfMonth();
  }

  onYearManualFocus() {
    console.log('focus', this.curYear);
    this.manualChangeYear = this.curYear;
  }

  onYearManualChange() {
    if ( this.curYear.length > 4 || this.curYear.length < 4 ) {
      this.curYear = this.manualChangeYear;
      return;
    }

    this.initDaysOfMonth();
  }

  selectDate(d) {
    if (!d) {
      return;
    }
    let _date = d, month = this.curMonthIndex + 1;

    this.selectedDay = d;
    this.selectedMonthIndex = this.curMonthIndex;
    this.selectedYear = this.curYear;

    if ( d < 10 ) {
      _date = '0' + d;
    }

    if ( month < 10 ) {
      month = '0' + month;
    }

    this.selectedDate = _date + '/' + month  + '/' + this.curYear;

    this.datePickerVisible = false;

    this.selectDate.emit(this.selectedDate);
  }

  onDateChange() {
    this.placeholder = 'focus';
   // alert(this.selectedDate)
    // if( !this.selectedDate )
  }

  toggleDatePicker() {
    this.datePickerVisible = !this.datePickerVisible;


  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    const curElement = event.target;

    if ( this.datePickerVisible && !this.datepickerEl.nativeElement.contains(curElement) ) {
      this.datePickerVisible = false;
    }
  }
}
