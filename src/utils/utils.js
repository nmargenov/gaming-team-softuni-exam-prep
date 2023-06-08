exports.optionsGenerator = (selected)=>{
    const platforms = ["PC","Nintendo","PS4","PS5","XBOX"];

    let html = "";
    platforms.forEach(platform => {
        html+=`<option value="${platform}" ${selected == platform ? 'selected' : ''}>${platform}</option>`;
    });

    return html;
};