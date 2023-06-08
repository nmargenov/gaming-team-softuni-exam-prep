exports.optionsGenerator = (selected,neutral=false)=>{
    const platforms = ["PC","Nintendo","PS4","PS5","XBOX"];

    let html = "";
    if(neutral){
        html +=`<option value="">-------</option>`;
    }
    platforms.forEach(platform => {
        html+=`<option value="${platform}" ${selected == platform ? 'selected' : ''}>${platform}</option>`;
    });

    return html;
};