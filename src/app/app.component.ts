import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Weather Charts  App';
  timeoutId: any = null;

  constructor(private router: Router) { }

  goTo(link: string) {
    this.timeoutId = setTimeout(() => {
      this.router.navigate([link]);
    }, 275);
  }

  cancelGoTo() {
    clearTimeout(this.timeoutId);
  }

  ngOnInit() {

  }

}
