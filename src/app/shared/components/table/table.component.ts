import { Component, ContentChildren, Input, OnInit, QueryList, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatColumnDef, MatTable, MatTableDataSource } from '@angular/material/table';
import { MetadataTable } from '../../../interfaces/metada-table.interface';


//@ts-ignore
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {


  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @Input() dataTable: any[] = [];
  @Input() metadataTable: MetadataTable[] = [];
  @ViewChild(MatTable, { static: true }) table: MatTable<any> | any;
  @ContentChildren(MatColumnDef) columnsDef: QueryList<MatColumnDef> | undefined;
  columnsToView: string []=[];

  dataSource:any;
  constructor() {

   }

   ngOnChanges(){

      this.columnsToView = this.metadataTable.map(
      (el: MetadataTable) => el.field);

      this.loadData();
   }

    ngAfterContentInit(){

      this.loadData();




    }



    loadData():any{
      if(!this.columnsDef) return false;
      this.dataSource = new MatTableDataSource<any>(this.dataTable);
      this.columnsDef.forEach((columnsDef)=> this.table.addColumnDef(columnsDef));
      if (this.columnsDef.length){
            this.columnsToView.push('actions')
      }

      if (this.paginator){
        this.dataSource.paginator = this.paginator
        this.paginator.firstPage()
      }

    }

  ngOnInit(): void {
  }

}
