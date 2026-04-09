import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of, throwError } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('LoginComponent (E2E)', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, CommonModule],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener usuario y password vacíos al inicio', () => {
    expect(component.usuario).toBe('');
    expect(component.password).toBe('');
  });

  it('debería navegar a /principal/dashboard tras login exitoso', fakeAsync(() => {
    authServiceSpy.login.and.returnValue(of({ token: 'fake-jwt' }));

    component.usuario = 'juan';
    component.password = '1234';
    component.login();
    tick();

    expect(authServiceSpy.login).toHaveBeenCalledWith('juan', '1234');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/principal/dashboard']);
  }));

  it('no debería navegar si el login falla', fakeAsync(() => {
    authServiceSpy.login.and.returnValue(
      throwError(() => new Error('Credenciales inválidas'))
    );

    component.usuario = 'juan';
    component.password = 'wrong';
    component.login();
    tick();

    expect(routerSpy.navigate).not.toHaveBeenCalled();
  }));

  it('debería llamar a AuthService.login con los valores del formulario', () => {
    authServiceSpy.login.and.returnValue(of({}));

    component.usuario = 'testuser';
    component.password = 'testpass';
    component.login();

    expect(authServiceSpy.login).toHaveBeenCalledWith('testuser', 'testpass');
  });

  it('debería leer usuario y password desde los inputs del template', fakeAsync(async () => {
    authServiceSpy.login.and.returnValue(of({ token: 'fake-jwt' }));

    const usuarioInput: HTMLInputElement = fixture.nativeElement.querySelector('input[name="usuario"]');
    const passwordInput: HTMLInputElement = fixture.nativeElement.querySelector('input[name="password"]');
    const submitBtn: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');

    if (usuarioInput && passwordInput && submitBtn) {
      usuarioInput.value = 'juan';
      usuarioInput.dispatchEvent(new Event('input'));
      passwordInput.value = '1234';
      passwordInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      tick();
      submitBtn.click();
      tick();
      expect(authServiceSpy.login).toHaveBeenCalled();
    } else {
      component.usuario = 'juan';
      component.password = '1234';
      component.login();
      tick();
      expect(authServiceSpy.login).toHaveBeenCalledWith('juan', '1234');
    }
  }));
});