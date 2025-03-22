import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private data: { [key: string]: any } = {};
  private dataArray: { [key: string]: any[] } = {}; // To store arrays by key

  // Set a single variable
  set(key: string, value: any): void {
    this.data[key] = value;
  }

  // Get a single variable
  get(key: string): any {
    return this.data[key];
  }

  // Clear a single variable
  clear(key: string): void {
    delete this.data[key];
  }

  // Initialize an array if it doesn't exist, and push an item into it
  pushToArray(key: string, item: any): void {
    if (!this.dataArray[key]) {
      this.dataArray[key] = []; // Initialize the array if it doesn't exist
    }
    this.dataArray[key].push(item);
  }

  // Get the entire array by key
  getArray(key: string): any[] {
    return this.dataArray[key] || []; // Return an empty array if none exists
  }

  // Clear the array by key
  clearArray(key: string): void {
    delete this.dataArray[key];
  }
}
