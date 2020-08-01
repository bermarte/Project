export default function setTitle(title) {
    if (typeof title !== "string") {
       throw new Error("Title should be an string");
    }
    document.title = title;
}
/*
https://stackoverflow.com/questions/46160461/how-do-you-set-the-document-title-in-react#46160586 5
*/