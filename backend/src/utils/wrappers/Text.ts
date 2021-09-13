export class Text {
    constructor(private text: string) {
        this.text = text;
    }

    normalize() {
        return this.text.trim().toLowerCase();
    }
}
