import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
selector: 'app-root',
imports: [FormsModule],
templateUrl: './app.html',
styleUrl: './app.css'
})
export class App {
members = [
{
name: 'Esraa',
age: 24,
department: 'Development',
available: true
},
{
name: 'Ahmed',
age: 28,
department: 'Marketing',
available: false
},
{
name: 'Mariam',
age: 25,
department: 'Design',
available: true
}
];

departments = [
'Development',
'Marketing',
'Design'
];

selectedDepartment = 'All';

viewMode = 'card';

newMember = {
name: '',
age: 0,
department: 'Development',
available: true
};

errorMessage = '';

addMember() {
if (this.newMember.name.trim() === '') {
this.errorMessage = 'Name is required';
return;
}

if (this.newMember.age === 0) {
  this.errorMessage = 'Age is required';
  return;
}

if (this.newMember.age < 18) {
  this.errorMessage = 'Age must be 18 or older';
  return;
}

this.members.push({
  name: this.newMember.name,
  age: this.newMember.age,
  department: this.newMember.department,
  available: this.newMember.available
});

this.newMember = {
  name: '',
  age: 0,
  department: 'Development',
  available: true
};

this.errorMessage = '';

}

toggleAvailability(member: any) {
member.available = !member.available;
}

deleteMember(member: any) {
this.members = this.members.filter(item => item !== member);
}

get filteredMembers() {
if (this.selectedDepartment === 'All') {
return this.members;
}

return this.members.filter(
  member => member.department === this.selectedDepartment
);

}
}