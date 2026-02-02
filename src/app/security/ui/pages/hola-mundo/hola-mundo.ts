import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { SelectModule } from 'primeng/select';

@Component({
    selector: 'app-hola-mundo',
    standalone: true,
    imports: [CommonModule, ToolbarModule, ButtonModule, InputTextModule, TableModule, SelectModule],
    templateUrl: './hola-mundo.html',
    styleUrl: './hola-mundo.scss',
})
export class HolaMundo {
    estadoOptions = [
        { label: 'Todos', value: null },
        { label: 'Activo', value: 'ACTIVO' },
        { label: 'Inactivo', value: 'INACTIVO' }
    ];

    modulos = [
        { id: 101, nombre: 'Seguridad', estado: 'ACTIVO', descripcion: 'Gestión de accesos y perfiles' },
        { id: 102, nombre: 'Créditos', estado: 'ACTIVO', descripcion: 'Gestión de créditos' },
        { id: 103, nombre: 'Cartera', estado: 'INACTIVO', descripcion: 'Gestión de cartera' },
        { id: 104, nombre: 'Contabilidad', estado: 'ACTIVO', descripcion: 'Procesos contables' },
        { id: 105, nombre: 'Reportes', estado: 'ACTIVO', descripcion: 'Reportes y análisis' }
    ];

}
