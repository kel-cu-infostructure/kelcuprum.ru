document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById("name").addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            // Do work
            buttonClick();
        }
    });
    document.getElementById("api").addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            // Do work
            buttonClick();
        }
    });
})
var request = "{}";
async function buttonAlert(){
    console.log(request);
}
async function buttonClick(){
    const name = document.getElementById("name").value;
    if(!name.length > 16 || name.length < 1) return alert("Никнейм не соотвествует формату ников Minecraft")
    const api = document.getElementById("api").value;
    var url = `/api/skin/render?name=${name}`
    if(api.length !=0) url+=`&api=${api}`
    let isHead = document.getElementById("head").checked;
    url+=`&head=${isHead}`;
    // alert(url)
    const data = await fetch(url);
    const json = await data.json();
    // console.log(json);
    // document.getElementById("json").innerText = JSON.stringify(json, null, 3)
    // console.log(JSON.stringify(json, null, 3))
    request = JSON.stringify(json, null, 3);
    if(json.error) {
        alert(json.error.message);
        return;
    } else {
        document.getElementById("skin").src = json.render.web //image.setAttribute("ondblclick", `window.open("${image.src}", '_blank').focus()`)
        document.getElementById("skin").setAttribute('ondblclick', `window.open("${json.render.web}", '_blank').focus()`)
    }
}
