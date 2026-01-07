import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngFor
import { RouterModule } from '@angular/router'; // Import RouterModule for routerLink

interface Access {
    id: number;
    title: string;
    date: string;
    description: string;
    icon: string;
    routerLink: string[]; // Added routerLink property
}

interface SessionInfo {
    lastSessionDate: string;
    sessionDuration: string;
    terminationReason: 'logout' | 'inactivity';
}

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, RouterModule], // Added RouterModule
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class Home implements OnInit {

    accesses: Access[] = [];
    sessionInfo!: SessionInfo;

    ngOnInit() {
        this.sessionInfo = {
            lastSessionDate: '2025-11-24 18:00',
            sessionDuration: '45 minutos',
            terminationReason: 'logout'
        };

        this.accesses = [
            { id: 1, title: 'Dashboard', date: '2025-11-24 10:00', description: 'Acceso principal al panel de control.', icon: 'pi pi-home', routerLink: ['/'] },
            { id: 2, title: 'Login', date: '2025-11-24 09:30', description: 'Página de inicio de sesión.', icon: 'pi pi-sign-in', routerLink: ['/auth/login'] },
            { id: 3, title: 'Not Found', date: '2025-11-23 16:45', description: 'Página no encontrada (error 404).', icon: 'pi pi-exclamation-triangle', routerLink: ['/notfound'] },
            { id: 4, title: 'Acceso Denegado', date: '2025-11-23 14:15', description: 'Página de acceso denegado.', icon: 'pi pi-lock', routerLink: ['/auth/access'] },
            { id: 5, title: 'Página de Error', date: '2025-11-23 11:00', description: 'Página de error genérico.', icon: 'pi pi-times-circle', routerLink: ['/auth/error'] },
            { id: 6, title: 'Contacto', date: '2025-11-22 15:30', description: 'Página de información de contacto.', icon: 'pi pi-envelope', routerLink: ['/contact'] } // Example link
        ];
    }
}
