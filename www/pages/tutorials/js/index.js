document.addEventListener("DOMContentLoaded", async function(event) {
    await getContent();
    console.log(`Контент загружен!`)
})
async function getContent(){
    let id = window.location.pathname.split(`/`)[2];
    let git = await axios({ url: `https://raw.githubusercontent.com/kel-cu-infostructure/docs/main/files/${id}.md` })
    let info = git.data;
    let infoA = info.split("\r\n");
    console.log(`1`)
    console.log(infoA.length)
    console.log(infoA);
    
    if(infoA.length === 1) infoA = info.split("\n")
    console.log(`2`)
    console.log(infoA);
    let data = JSON.parse(infoA[0].replace("#### ", ""));
    document.title = `${data.title} - Kel Cuprum`;

    var converter = new showdown.Converter(),
        html = converter.makeHtml(info.replace(`${infoA[0]}\r\n`, ``).replace(`${infoA[0]}\n`, ``));
    document.getElementById("contentinner").innerHTML = html;
    document.getElementById("giturl").href = `https://github.com/kel-cu-infostructure/docs/blob/main/files/${id}.md`
    // console.log(infoA);
    getImagesAndAddClickURL();
}