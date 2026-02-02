// Angular core y módulos base.
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

// UI de PrimeNG.
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

// Componentes reutilizables de la capa UI (standalone).
// Se importan aquí para poder usarlos en el template (perfil.html).
import { SearchPanelComponent, SearchFieldConfig } from '@security/ui/components/search-panel/search-panel';
import { TableComponent, TableItem } from '@security/ui/components/table/table';
import { DetailPanelComponent, DetailFieldConfig } from '@security/ui/components/detail-panel/detail-panel';
import { FormDialogComponent, FormDialogField } from '@security/ui/components/form-dialog/form-dialog';
import { PageHeroComponent } from '@shared/ui/components/page-hero/page-hero';
import { QuickNavComponent, QuickNavItem } from '@shared/ui/components/quick-nav/quick-nav';
import { QuickNavService } from '@shared/ui/services/quick-nav.service';

// Puertos de la capa de aplicación (inyección por token).
import { PERFIL_INPUT_PORT } from '@security/application/port/input/perfil-input.token';
import { PerfilInputPort } from '@security/application/port/input/perfil-input-port';

// Modelo de dominio.
import { Perfil } from '@security/domain/perfil.model';

@Component({
  selector: 'app-perfil',
  standalone: true,
  // Aquí se registran los módulos/componentes que usará el template.
  imports: [CommonModule, ReactiveFormsModule, ConfirmDialog, ToastModule, SearchPanelComponent, TableComponent, DetailPanelComponent, FormDialogComponent, PageHeroComponent, QuickNavComponent],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
  providers: [ConfirmationService, MessageService]
})
export class PerfilPage implements OnInit, OnDestroy {
  // Inyección de dependencias.
  private readonly fb = inject(FormBuilder);
  private readonly perfilInputPort = inject<PerfilInputPort>(PERFIL_INPUT_PORT);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);
  private readonly quickNavService = inject(QuickNavService);

  // Formulario principal del perfil.
  readonly form = this.fb.nonNullable.group({
    id: [''],
    nombre: ['', [Validators.required]]
  });

  // Formulario de búsqueda.
  readonly searchForm = this.fb.nonNullable.group({
    id: ['']
  });

  readonly detailForm = this.fb.nonNullable.group({
    id: [''],
    nombre: ['']
  });

  readonly detailForm2 = this.fb.nonNullable.group({
    id: [''],
    nombre: ['']
  });

  readonly detailForm3 = this.fb.nonNullable.group({
    id: [''],
    nombre: ['']
  });

  readonly detailForm4 = this.fb.nonNullable.group({
    id: [''],
    nombre: ['']
  });

  // Configuración dinámica del panel de búsqueda.
  readonly searchFields: SearchFieldConfig[] = [
    { name: 'id', label: 'ID', placeholder: 'Ej: 1' , type: 'number' }
  ];

  // Configuración dinámica del formulario en el diálogo.
  readonly formFields: FormDialogField[] = [
    {
      name: 'nombre',
      label: 'Nombre',
      type: 'text',
      placeholder: 'Ej: Administrador',
      errorMessage: 'El nombre es obligatorio.'
    }
  ];

  readonly detailFields: DetailFieldConfig[] = [
    { name: 'id', label: 'ID', placeholder: 'Ej: 1', type: 'text', readonly: true },
    { name: 'nombre', label: 'Nombre', placeholder: 'Ej: Administrador', type: 'text', readonly: false }
  ];

  readonly detailFields2: DetailFieldConfig[] = [
    { name: 'id', label: 'ID secundario', placeholder: 'Ej: 1', type: 'text', readonly: false },
    { name: 'nombre', label: 'Nombre auxiliar', placeholder: 'Ej: Administrador', type: 'text', readonly: false }
  ];

  readonly detailFields3: DetailFieldConfig[] = [
    { name: 'id', label: 'Referencia', placeholder: 'Ej: 1', type: 'text', readonly: false },
    { name: 'nombre', label: 'Etiqueta', placeholder: 'Ej: Administrador', type: 'text', readonly: false }
  ];

  readonly detailFields4: DetailFieldConfig[] = [
    { name: 'id', label: 'Código', placeholder: 'Ej: 1', type: 'text', readonly: false },
    { name: 'nombre', label: 'Estado', placeholder: 'Ej: Activo', type: 'text', readonly: false }
  ];

  readonly quickNavItems: QuickNavItem[] = [
    { id: 'perfil-busqueda', label: 'Búsqueda', icon: 'pi pi-search' },
    { id: 'perfil-tabla', label: 'Resultados', icon: 'pi pi-table' },
    { id: 'perfil-detalle', label: 'Detalle', icon: 'pi pi-id-card' },
    { id: 'perfil-detalle-2', label: 'Detalle 2', icon: 'pi pi-id-card' },
    { id: 'perfil-detalle-3', label: 'Detalle 3', icon: 'pi pi-id-card' },
    { id: 'perfil-detalle-4', label: 'Detalle 4', icon: 'pi pi-id-card' }
  ];

  ngOnInit(): void {
    this.quickNavService.setState({
      title: 'Navegación rápida',
      items: this.quickNavItems,
      hintTitle: 'TIP',
      hintText: 'Usa la navegación rápida para ir a las secciones.',
      hintIcon: 'pi pi-bolt'
    });
  }

  ngOnDestroy(): void {
    this.quickNavService.clear();
  }

  toggleQuickNav(): void {
    this.showQuickNav = !this.showQuickNav;
  }

  // Estado de la vista.
  perfiles: TableItem[] = [];
  selectedPerfil: TableItem | null = null;
  showFormDialog = false;
  isSubmitting = false;
  showQuickNav = true;

  // Helper para validar el campo nombre.
  get nombreInvalid(): boolean {
    const control = this.form.controls.nombre;
    return control.invalid && (control.dirty || control.touched);
  }

  // Busca un perfil por ID y nombre (según la lógica actual).
  async buscarPorId(): Promise<void> {
    const id = this.searchForm.getRawValue().id.trim();
    if (!id) {
      this.messageService.add({ severity: 'warn', summary: 'Atención', detail: 'El ID es obligatorio para buscar.' });
      return;
    }

    try {
      const perfil = await this.perfilInputPort.buscarPorId(id);
      this.perfiles = [perfil];
      this.messageService.add({ severity: 'success', summary: 'Encontrado', detail: 'Perfil encontrado correctamente.' });
    } catch (error) {
      const detail = error instanceof Error ? error.message : 'No se pudo encontrar el perfil.';
      this.messageService.add({ severity: 'error', summary: 'Error', detail });
    }
  }

  limpiarBusqueda(): void {
    this.searchForm.reset({ id: '' });
    this.perfiles = [];
    this.detailForm.reset({ id: '', nombre: '' });
    this.detailForm2.reset({ id: '', nombre: '' });
    this.detailForm3.reset({ id: '', nombre: '' });
    this.detailForm4.reset({ id: '', nombre: '' });
    this.selectedPerfil = null;
  }

  selectPerfil(perfil: TableItem): void {
    this.selectedPerfil = perfil;
    const idValue = perfil.id != null ? String(perfil.id) : '';
    this.detailForm.patchValue({ id: idValue, nombre: perfil.nombre ?? '' });
  }

  // Abre el diálogo en modo creación.
  openCreateDialog(): void {
    this.form.reset({ id: '', nombre: '' });
    this.searchForm.reset({ id: '' });
    this.showFormDialog = true;
  }

  // Abre el diálogo en modo edición.
  edit(perfil: TableItem): void {
    const idValue = perfil.id != null ? String(perfil.id) : '';
    this.form.patchValue({ id: idValue, nombre: perfil.nombre });
    this.searchForm.patchValue({ id: idValue });
    this.showFormDialog = true;
  }

  // Envía el formulario para crear o actualizar.
  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.messageService.add({ severity: 'warn', summary: 'Atención', detail: 'Completa los campos obligatorios.' });
      return;
    }

    const { id, nombre } = this.form.getRawValue();
    const nombreTrim = nombre.trim();

    if (!nombreTrim) {
      this.messageService.add({ severity: 'warn', summary: 'Atención', detail: 'El nombre del perfil es obligatorio.' });
      return;
    }

    this.isSubmitting = true;

    const isUpdate = !!id;

    try {
      if (isUpdate) {
        const actualizado = await this.perfilInputPort.actualizar(id, { nombre: nombreTrim });
        this.addOrUpdateLocal(actualizado);
        this.messageService.add({ severity: 'success', summary: 'Actualizado', detail: 'Perfil actualizado con éxito.' });
        this.showFormDialog = false;
      } else {
        const creado = await this.perfilInputPort.crear({ nombre: nombreTrim });
        this.addOrUpdateLocal(creado);
        this.messageService.add({ severity: 'success', summary: 'Creado', detail: 'Perfil creado con éxito.' });
        this.form.reset({ id: '', nombre: '' });
        this.searchForm.reset({ id: '' });
      }
    } catch (error) {
      const detail = error instanceof Error
        ? error.message
        : isUpdate
          ? 'No se pudo actualizar el perfil.'
          : 'No se pudo crear el perfil.';
      this.messageService.add({ severity: 'error', summary: 'Error', detail });
      if (isUpdate) {
        this.showFormDialog = false;
      }
    } finally {
      this.isSubmitting = false;
    }
  }

  confirmRemove(perfil: TableItem): void {
    this.confirmationService.confirm({
      message: `¿Deseas eliminar el perfil "${perfil.nombre}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary p-button-outlined',
      accept: () => this.remove(perfil)
    });
  }

  async remove(perfil: TableItem): Promise<void> {
    const idValue = perfil.id != null ? String(perfil.id) : '';
    if (!idValue) {
      this.messageService.add({ severity: 'warn', summary: 'Atención', detail: 'El perfil seleccionado no tiene id válido.' });
      return;
    }

    this.isSubmitting = true;

    try {
      await this.perfilInputPort.eliminar(idValue);
      this.perfiles = this.perfiles.filter((p) => String(p.id ?? '') !== idValue);
      this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Perfil eliminado correctamente.' });
      if (this.detailForm.getRawValue().id === idValue) {
        this.detailForm.reset({ id: '', nombre: '' });
        this.selectedPerfil = null;
      }
    } catch (error) {
      const detail = error instanceof Error ? error.message : 'No se pudo eliminar el perfil.';
      this.messageService.add({ severity: 'error', summary: 'Error', detail });
    } finally {
      this.isSubmitting = false;
    }
  }

  private addOrUpdateLocal(perfil: Perfil): void {
    const idx = this.perfiles.findIndex((p) => p.id === perfil.id);
    if (idx >= 0) {
      this.perfiles[idx] = perfil;
    } else {
      this.perfiles = [...this.perfiles, perfil];
    }
  }

}
