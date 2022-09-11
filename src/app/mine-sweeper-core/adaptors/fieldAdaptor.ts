import { IFieldVisual } from "src/app/entities/IFieldVisual";
import { Field } from "../Entities/field";
import { FieldVisibleStates } from "../enums/fieldVisibleStates";

export class FieldAdaptor implements IFieldVisual{
    constructor(
        private field: Field
    ){}

    get content():string{
        if(this.field.visibleState == FieldVisibleStates.MarkedAsMine){
            return "£";
          }
      
          if(this.field.visibleState == FieldVisibleStates.PossibleMine){
            return "[£]";
          }
      
          if(this.field.visibleState == FieldVisibleStates.RevealedField || this.field.visibleState == FieldVisibleStates.OtherBombsRevealed){
            if(this.field.hasBomb){
              return '¥';
            }
            if(this.field.bombsOutside > 0){
              return ""+this.field.bombsOutside;
            }
          }
      
          return '';      
    }

    get fontColor():string{
        if(this.field.visibleState == FieldVisibleStates.OtherBombsRevealed){
            return "#252F3D";
          }
      
          if(this.field.visibleState == FieldVisibleStates.PossibleMine || this.field.visibleState == FieldVisibleStates.MarkedAsMine){
            return "rgb(77, 144, 142)"
          }
      
          if(this.field.hasBomb){
            return "#252F3D"; 
          }
      
          switch(this.field.bombsOutside) {
            case 0: 
              return "#277DA1";
            case 1:
              return "#577590";
            case 2:
              return "#4D908E";
            case 3:
              return "#43AA8B";
            case 4:
              return "#90BE6D";
            case 5:
              return "#F9C74F";
            case 6:
              return "#F9844A";
            case 7:
              return "#F8961E";
            case 8:
              return "#F3722C";
            default:  
              return "#277DA1";
        }
    }

    get backgroundColor():string{
        if(this.field.visibleState == FieldVisibleStates.RevealedField){
            if(!this.field.hasBomb){
              return "#C8EEF6";
            }
      
            return "#ff0035"
          }
      
          if(this.field.visibleState == FieldVisibleStates.OtherBombsRevealed){
            return '#efca08'
          }
      
          if(this.field.visibleState == FieldVisibleStates.PossibleMine || this.field.visibleState == FieldVisibleStates.MarkedAsMine){
            return "#bfe574";
          }
      
          return "#B6D1D7";
    }
}