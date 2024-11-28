class Finder{
    public dict: Map<string,Entry> =new  Map<string,Entry>();
    constructor(json:string) {
        const list: Entry[]=JSON.parse(json);
        list.forEach(o=>{
            const entry=new Entry(o["Question"],o["Answer"]);
            this.dict.set(o["Question"],entry)
        })
        console.log(`total  entries ${this.dict.size}`)
        //this.printDict();
    }
    handleRawText(txt_raw:string){
        let splited = txt_raw.split("\r\n\r\n");
        splited.forEach(i => {
            let index = i.indexOf("\r\n");
            if (index === -1) {
                index = i.indexOf("\r");
            }
            if (index === -1 || index === 0) {
                return;
            }
            let question = i.substring(0, index);
            let answer = i.substring(index, i.length);
            if (this.dict.has(question)) {
                if (this.dict.get(question)!.Prority < 1) {
                    let entry1 = new Entry(question, answer);
                    if (entry1.Prority > 0) {
                        this.dict.set(question, entry1);
                    }
                } else {
                    return;
                }
            } else {
                let entry1 = new Entry(question, answer);
                this.dict.set(question, entry1);
            }
        });
    }
    printDict(){
        let total: Entry[]=[]
        this.dict.forEach((v,k)=>{total.push(v)});
        console.log(JSON.stringify(total));
    }
    public find(pattern: string): string {
        if(pattern==""){
            return "";
        }
    
        let result = "";
        let count = 0;
        this.dict.forEach((value, key) => {
            if (key.includes(pattern) || value.Answer.includes(pattern)) {
                result += key + "\n" + value.Answer + "\n-----------------------\n";
                count++;
            }
        });
        if (count === 0) {
            return "emmmm,找不到";
        }
        return result;
    }
    
    
}

class Entry {
    public Question: string;
    public Answer: string;
    public Prority: number = 0;

    constructor(question: string, answer: string) {
        this.Question = question;

        let index = answer.indexOf("标准答案");
        if (index !== -1) {
            let index2 = answer.indexOf("你的答案");
            if (index2 !== -1) {
                this.Answer = answer.substring(0, index2);
                this.Answer += answer.substring(index);
            } else {
                this.Answer = answer;
            }

            this.Prority = 1;
        } else {
            this.Answer = answer;
        }
    }
}

export default Finder;