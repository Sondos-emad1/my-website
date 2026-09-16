import {
  Component,
  OnInit,
  ChangeDetectorRef,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { RouterLink } from '@angular/router';

import Swal from 'sweetalert2';

interface MenuItem {
  _id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
}

@Component({
  selector: 'app-admin-menu',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './admin-menu.html',
  styleUrl: './admin-menu.css'
})
export class AdminMenu implements OnInit {

  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);

  menuItems: MenuItem[] = [];

  menu = {
    name: '',
    description: '',
    price: 0,
    category: ''
  };

  selectedImage: File | null = null;

  editingId: string | null = null;

  message = '';
  errorMessage = '';
  loading = false;

  private apiUrl =
    'http://localhost:3000/api/menu';

  ngOnInit(): void {
    this.loadMenu();
  }

  getHeaders(): HttpHeaders {

    const token =
      localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

  }

  loadMenu(): void {

    this.http
      .get<MenuItem[]>(this.apiUrl)
      .subscribe({

        next: (data) => {

          console.log('Menu:', data);

          this.menuItems =
            Array.isArray(data) ? data : [];

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.log(
            'Menu error:',
            error
          );

          this.errorMessage =
            'Failed to load menu items';

          this.cdr.detectChanges();

        }

      });

  }

  onImageSelected(event: any): void {

    const file =
      event.target.files[0];

    if (file) {
      this.selectedImage = file;
    }

  }

  addMenuItem(): void {

    if (
      !this.menu.name ||
      !this.menu.description ||
      !this.menu.price ||
      !this.menu.category
    ) {

      this.errorMessage =
        'Please fill in all fields';

      this.message = '';

      this.cdr.detectChanges();

      return;
    }

    const token =
      localStorage.getItem('token');

    const formData =
      new FormData();

    formData.append(
      'name',
      this.menu.name
    );

    formData.append(
      'description',
      this.menu.description
    );

    formData.append(
      'price',
      this.menu.price.toString()
    );

    formData.append(
      'category',
      this.menu.category
    );

    if (this.selectedImage) {

      formData.append(
        'image',
        this.selectedImage
      );

    }

    const headers =
      new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

    this.loading = true;
    this.message = '';
    this.errorMessage = '';

    this.cdr.detectChanges();

    this.http
      .post<any>(
        this.apiUrl,
        formData,
        { headers }
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Add menu success:',
            response
          );

          if (response.item) {

            this.menuItems = [
              ...this.menuItems,
              response.item
            ];

          }

          this.loading = false;

          this.resetForm();

          this.cdr.detectChanges();

          Swal.fire({
            icon: 'success',
            title: 'Menu Item Added',
            text:
              response.message ||
              'Menu item added successfully',
            confirmButtonText: 'OK'
          });

        },

        error: (error: any) => {

          console.log(
            'Add menu error:',
            error
          );

          this.errorMessage =
            error.error?.message ||
            'Failed to add menu item';

          this.loading = false;

          this.cdr.detectChanges();

        }

      });

  }

  editMenuItem(item: MenuItem): void {

    this.editingId =
      item._id || null;

    this.menu = {

      name: item.name,

      description:
        item.description,

      price: item.price,

      category:
        item.category

    };

    this.selectedImage = null;

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  }

  updateMenuItem(): void {

    if (!this.editingId) {
      return;
    }

    if (
      !this.menu.name ||
      !this.menu.description ||
      !this.menu.price ||
      !this.menu.category
    ) {

      this.errorMessage =
        'Please fill in all fields';

      this.message = '';

      this.cdr.detectChanges();

      return;
    }

    const token =
      localStorage.getItem('token');

    const formData =
      new FormData();

    formData.append(
      'name',
      this.menu.name
    );

    formData.append(
      'description',
      this.menu.description
    );

    formData.append(
      'price',
      this.menu.price.toString()
    );

    formData.append(
      'category',
      this.menu.category
    );

    if (this.selectedImage) {

      formData.append(
        'image',
        this.selectedImage
      );

    }

    const headers =
      new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

    this.loading = true;
    this.message = '';
    this.errorMessage = '';

    const id =
      this.editingId;

    this.cdr.detectChanges();

    this.http
      .put<any>(
        `${this.apiUrl}/${id}`,
        formData,
        { headers }
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Update menu success:',
            response
          );

          if (response.item) {

            this.menuItems =
              this.menuItems.map(
                item =>
                  item._id === id
                    ? response.item
                    : item
              );

          }

          this.loading = false;

          this.resetForm();

          this.cdr.detectChanges();

          Swal.fire({
            icon: 'success',
            title: 'Menu Item Updated',
            text:
              response.message ||
              'Menu item updated successfully',
            confirmButtonText: 'OK'
          });

        },

        error: (error: any) => {

          console.log(
            'Update menu error:',
            error
          );

          this.errorMessage =
            error.error?.message ||
            'Failed to update menu item';

          this.loading = false;

          this.cdr.detectChanges();

        }

      });

  }

  deleteMenuItem(
    id: string | undefined
  ): void {

    if (!id) {
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this menu item?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel'
    }).then((result) => {

      if (!result.isConfirmed) {
        return;
      }

      const headers =
        this.getHeaders();

      this.loading = true;
      this.message = '';
      this.errorMessage = '';

      this.cdr.detectChanges();

      this.http
        .delete<any>(
          `${this.apiUrl}/${id}`,
          { headers }
        )
        .subscribe({

          next: (response: any) => {

            this.menuItems =
              this.menuItems.filter(
                item =>
                  item._id !== id
              );

            this.loading = false;

            this.cdr.detectChanges();

            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text:
                response.message ||
                'Menu item deleted successfully',
              confirmButtonText: 'OK'
            });

          },

          error: (error: any) => {

            console.log(
              'Delete menu error:',
              error
            );

            this.errorMessage =
              error.error?.message ||
              'Failed to delete menu item';

            this.loading = false;

            this.cdr.detectChanges();

          }

        });

    });

  }

  cancelEdit(): void {
    this.resetForm();
  }

  resetForm(): void {

    this.menu = {

      name: '',
      description: '',
      price: 0,
      category: ''

    };

    this.selectedImage = null;

    this.editingId = null;

    const fileInput =
      document.getElementById(
        'menuImage'
      ) as HTMLInputElement;

    if (fileInput) {
      fileInput.value = '';
    }

  }

}