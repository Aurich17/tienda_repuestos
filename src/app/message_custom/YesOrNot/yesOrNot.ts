import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'DialogYesOrNot',
  templateUrl: 'yesOrNot.html',
  styleUrls: ['./yerOrNot.css']
})
export class DialogYesOrNot {
  constructor(
    public dialogRef: MatDialogRef<DialogYesOrNot>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string }
  ) {}

    // Método para cerrar el diálogo con 'Yes'
  onConfirm(): void {
    this.dialogRef.close(true); // Devolver 'true' si el usuario confirma
  }

    // Método para cerrar el diálogo con 'No'
  onCancel(): void {
    this.dialogRef.close(false); // Devolver 'false' si el usuario cancela
  }
}
