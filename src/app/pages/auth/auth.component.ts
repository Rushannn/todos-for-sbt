import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'src/app/core/models/auth.model';
import { Errors } from 'src/app/core/models/error.model';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  error: string | null = null;
  isSubmitting = false;
  authForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  })

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.authForm.valid) {
      const username = this.authForm.value.username as string;
      const password = this.authForm.value.password as string;
      const authData: Auth = {
        username,
        password
      };
      this.userService.attemptAuth(authData)
        .subscribe({
          next: data => {
            this.authForm.reset;
            this.router.navigateByUrl('/');
          },
          error: err => {
            console.error(err)
            this.error = err.message;
            this.isSubmitting = false;
            this.cdr.markForCheck();
          }
        })
    }
    console.warn(this.authForm);
  }


}
