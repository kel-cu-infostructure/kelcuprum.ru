let theme = 0;
/**
- 0 Default
- 1 Luna (from XP)
- 2 Circus
*/
const themes = [
   {
      url: "/style/index.css",
      id: "cuprum",
      name: "Cuprum"
   },
   {
      url: "/style/luna.css",
      id: "luna",
      name: "Luna (Microsoft Windows XP Style)"
   },
   {
      url: "/style/circus.css",
      id: "circus",
      name: "Circus"
   },
   {
      url: "/style/watercolor.css",
      id: "watercolor",
      name: "Watercolor"
   }
] 
document.addEventListener("DOMContentLoaded", function(event) {
   let hell = window.localStorage.getItem("theme");
   if(hell != null) theme = parseInt(hell);
   document.getElementById("theme").href = themes[theme].url;
   document.body.id = themes[theme].name;

   const lock = document.createElement('meta');
    lock.name = 'darkreader-lock';
    document.head.appendChild(lock);
    themeButton();
})
async function changeTheme(){
   if((theme+1) >= themes.length) theme = 0;
   else theme++;
   window.localStorage.setItem("theme", theme.toString());
   document.getElementById("theme").href = themes[theme].url;
   document.body.id = themes[theme].name;
   console.log(`Тема изменена на ${themes[theme].name}!`)
};

function themeButton(){
   const sidebar = document.createElement('div');
   sidebar.innerHTML = `
   <label><b>[BETA] Настройки</b></label>
           <ul>
               <li id="sidebar-setup"><a onclick="changeTheme();" title="">Переключить тему</a><i></i></li>
           </ul>
   `
   sidebar.className = "sidebar-section";
   document.getElementById("sidebar").appendChild(sidebar);

}
