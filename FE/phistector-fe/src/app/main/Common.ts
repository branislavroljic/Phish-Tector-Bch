import { MatTableDataSource } from "@angular/material/table";
import { TagValue } from "../interfaces/TagValue.model";
import { TagValueDesc } from "../interfaces/TagValueDesc.model";

export class Common {
    public tagValueArray: Array<TagValueDesc> = new Array();
    public testResultArray: Array<TagValue> = new Array();
    public exceptionMessage: string | undefined;

    public tagValueDataSource = new MatTableDataSource<TagValueDesc>();
    public tagValueDisplayedColumns: string[] = ['tag', 'value', 'description'];

    public testResultDataSource = new MatTableDataSource<TagValue>();
    public testResultDisplayedColumns: string[] = ['tag', 'value'];

}