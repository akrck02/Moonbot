
export class Queue {

    private list: string[];

    constructor() {
        this.list = [];
    }

    /**
     * Add video to the queue
     * @param url The video url
     */
    add(url:string) : void {
        this.list.push(url);
    }

    /**
     * Skip video/s in the queue
     * @param number The number of videos to skip
     */
    skip(number : number) : void {
        for (let i = 0; i < number; i++) {
            this.list.shift();
        }
    }

    /**
     * Clear the queue
     */
    clean() : void {
        this.list = [];
    }


    /**
     * Get the queue current video
     * @returns The current video url
     */
    getCurrent() : string | undefined {
        return this.list[0] || undefined;
    }

    /**
     * Get the list of songs in the queue
     * @returns The queue list
     */
    getList() : string[] {
        return this.list;
    }
}