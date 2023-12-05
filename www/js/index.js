document.addEventListener("DOMContentLoaded", function(event) {
    getImagesAndAddClickURL();
    console.log(`Сайт загружен!`)
})

function getImagesAndAddClickURL(){
    const images = document.getElementsByTagName("img");
    for(i=0;i<images.length;i++){
        const image = images[i];
        image.setAttribute("ondblclick", `window.open("${image.src}", '_blank').focus()`)
        if(image.style.maxHeight === "") image.style.maxHeight = `500pt`;
        if(image.style.maxWidth === "") image.style.maxWidth = `85%`;
        console.log(`Обработано изображение #${i+1} ${image.src}`)
    }
}