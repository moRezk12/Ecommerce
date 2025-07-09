import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { NavbarBlankComponent } from 'src/app/components/navbar-blank/navbar-blank.component';

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [CommonModule , NavbarBlankComponent , RouterOutlet , FooterComponent],
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.css']
})
export class BlankLayoutComponent {

  goToUp():void {
    window.scrollTo(0,0);
  }

}
