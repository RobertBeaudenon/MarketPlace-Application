import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { TokenService } from 'src/app/services/token.service';
import { Router, ActivatedRoute } from '@angular/router';

//to use jquery selector
declare var $: any;

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit {
  constructor(private userService: UsersService, private router: Router, private route: ActivatedRoute) {}
  user: any;
  id: string;

  ngOnInit() {
    //declaring self as this to memorize what this is , because get lost when invoking external function from jquery
    var self = this;

    //retreiver id of user that we are rating through the url
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);

    this.GetUserDoingTask(this.id);

    //1star
    var clickedValue = 0;
    $(document).ready(function() {
      $('#1_star').hover(function() {
        $('#1_star').attr('src', '../../../assets/images/star_on.png');
        $('#2_star').attr('src', '../../../assets/images/star_off.png');
        $('#3_star').attr('src', '../../../assets/images/star_off.png');
        $('#4_star').attr('src', '../../../assets/images/star_off.png');
        $('#5_star').attr('src', '../../../assets/images/star_off.png');

        $('#showTitle').html('Bad');
      });

      $('#1_star').on('click', function() {
        clickedValue = 1;
      });
    });

    //2stars
    $(document).ready(function() {
      $('#2_star').hover(function() {
        $('#1_star').attr('src', '../../../assets/images/star_on.png');
        $('#2_star').attr('src', '../../../assets/images/star_on.png');
        $('#3_star').attr('src', '../../../assets/images/star_off.png');
        $('#4_star').attr('src', '../../../assets/images/star_off.png');
        $('#5_star').attr('src', '../../../assets/images/star_off.png');
        $('#showTitle').html('Poor');
      });

      $('#2_star').on('click', function() {
        clickedValue = 2;
      });
    });

    //3stars
    $(document).ready(function() {
      $('#3_star').hover(function() {
        $('#1_star').attr('src', '../../../assets/images/star_on.png');
        $('#2_star').attr('src', '../../../assets/images/star_on.png');
        $('#3_star').attr('src', '../../../assets/images/star_on.png');
        $('#4_star').attr('src', '../../../assets/images/star_off.png');
        $('#5_star').attr('src', '../../../assets/images/star_off.png');
        $('#showTitle').html('Fair');
      });

      $('#3_star').on('click', function() {
        clickedValue = 3;
      });
    });

    //4stars
    $(document).ready(function() {
      $('#4_star').hover(function() {
        $('#1_star').attr('src', '../../../assets/images/star_on.png');
        $('#2_star').attr('src', '../../../assets/images/star_on.png');
        $('#3_star').attr('src', '../../../assets/images/star_on.png');
        $('#4_star').attr('src', '../../../assets/images/star_on.png');
        $('#5_star').attr('src', '../../../assets/images/star_off.png');
        $('#showTitle').html('Good');
      });

      $('#4_star').on('click', function() {
        clickedValue = 4;
      });
    });

    //5stars
    $(document).ready(function() {
      $('#5_star').hover(function() {
        $('#1_star').attr('src', '../../../assets/images/star_on.png');
        $('#2_star').attr('src', '../../../assets/images/star_on.png');
        $('#3_star').attr('src', '../../../assets/images/star_on.png');
        $('#4_star').attr('src', '../../../assets/images/star_on.png');
        $('#5_star').attr('src', '../../../assets/images/star_on.png');
        $('#showTitle').html('Excellent');
      });

      $('#5_star').on('click', function() {
        clickedValue = 5;
      });
    });

    //get ratings once submit button clicked
    $('#rate').on('click', function() {
      var valid = true;
      if (clickedValue === 0 || clickedValue > 5) {
        valid = false;
        $('#error').html('<div class="alret alret-dnger> Please give a rating before you submit</div>');
      } else {
        $('#error').html('');
      }

      if ((valid = true)) {
        self.AddRating(clickedValue, self.id);
      } else {
        return false;
      }
    });
  }

  AddRating(clickedValue, id) {
    console.log(clickedValue + id);
    this.userService.AddRating(id, clickedValue).subscribe(data => {
      console.log(data);
    });
  }

  GetUserDoingTask(id) {
    this.userService.GetUserByID(id).subscribe(data => {
      this.user = data.result;
    });
  }
}
