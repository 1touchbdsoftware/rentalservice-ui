import { Component, OnInit, AfterViewInit } from '@angular/core';
import $ from 'jquery';  // Default import for jQuery
import 'metismenu'; // Import MetisMenu
import { AreasHttpService } from '../areas.http.service';
import { UserService } from '../../shared/services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
})

export class AppNavbarComponent implements OnInit, AfterViewInit {
  userMenus!: any[] | null;

  constructor(
    private userService: UserService,
    private areasHttpService: AreasHttpService
  ) {}

  ngOnInit(): void {
    this.userMenus = this.userService.getuserprivileges();
  }

  siteThumbnailPath: string = this.areasHttpService.imageRoot + this.userService.getSiteThumbnailPath();
  siteShortName: string = this.userService.getSiteShortName();

  ngAfterViewInit() {
    $('#side-menu').metisMenu(); // Initialize MetisMenu plugin
    $('.navbar-minimalize').on('click', function (event: any) {
      event.preventDefault();
      $("body").toggleClass("mini-navbar");
      SmoothlyMenu();
    });
    $(window).on("resize", function () {
      if (window.innerWidth < 769) {
        $('body').addClass('body-small');
      } else {
        $('body').removeClass('body-small');
      }
    });
  }
}

function SmoothlyMenu() {
  if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
    // Hide menu in order to smoothly turn on when maximize menu
    $('#side-menu').hide();
    // For smoothly turn on menu
    setTimeout(
      function () {
        $('#side-menu').fadeIn(400);
      }, 200);
  } else if ($('body').hasClass('fixed-sidebar')) {
    $('#side-menu').hide();
    setTimeout(
      function () {
        $('#side-menu').fadeIn(400);
      }, 100);
  } else {
    // Remove all inline style from jquery fadeIn function to reset menu state
    $('#side-menu').removeAttr('style');
  }
}
