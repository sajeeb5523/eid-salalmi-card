// provent right click
document.oncontextmenu = () => {
    alert("Don't try to right click")
    return false
}

//  StiLL anyone can inspect elements by F12 key. View page source by Ctrl + U key. Copy by Ctrl + C key. Paste by Ctrl + v key. Let's prevent these

 
document.onkeydown = e => {

    //Prevent Fl2 key
    if(e.key == "F12") {
        alert("Don't try to inspect element")
        return false
    }

    //Prevent showing page source by Ctrl + U
    if(e.ctrlKey && e.key == "u") {
        alert("Don't try to view page sources")
        return false
    }

    //Prevent copying anything from the page
    if(e.ctrlKey && e.key == "c") {
        alert("Don't try to copy page sources")
        return false
    }

    //Prevent paste anything from other sources
    if(e.ctrlKey && e.key == "v") {
        alert("Don't try to paste anything to page")
        return false
    }
}