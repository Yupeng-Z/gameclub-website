export class Game {
    id: string;                       //game ID
    name: string;                     //game Name
    rating: number;                    //game rating
    description: string;
    author:string;                     //作者
    like:Array<string>;                 //喜欢
    icon: string;
    photo:string;
    gameurl:String;                      //game url
    ratingDetail: Array<RatingDetail>
}
export class RatingDetail{
    user:string
    rating:number
}
export abstract class SmartTableData {
    abstract getData(): any[];
}
