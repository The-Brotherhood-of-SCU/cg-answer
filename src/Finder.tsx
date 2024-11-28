class Finder{
    public list:string[]=[];
    constructor(json:string) {
        this.list=JSON.parse(json);
    }

    public find(pattern: string): string {
        if(pattern==""){
            return "";
        }
    
        let result = "";
        let count = 0;
        this.list.forEach(v => {
            if (v.includes(pattern)) {
                result += v + "\n-----------------------\n";
                count++;
            }
        });
        if (count === 0) {
            return "emmmm,找不到";
        }
        return result;
    }
    
    
}



export default Finder;