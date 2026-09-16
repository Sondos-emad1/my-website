import { Component, inject, signal } from '@angular/core';
import { MenuService, MenuItem } from '../../services/menu';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {

  private menuService = inject(MenuService);

  menuItems = signal<MenuItem[]>([]);
  loading = signal(true);
  error = signal('');

  constructor() {
    this.loadMenu();
  }

  loadMenu(): void {

    console.log('Loading menu...');

    this.menuService.getMenu().subscribe({

      next: (data) => {

        console.log('MENU DATA:', data);

        this.menuItems.set(data);
        this.loading.set(false);

        console.log('Loading:', this.loading());
        console.log('Items:', this.menuItems());

      },

      error: (err) => {

        console.error('MENU ERROR:', err);

        this.error.set('Unable to load menu. Please try again.');
        this.loading.set(false);

      }

    });

  }

}