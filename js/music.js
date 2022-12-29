let songs = document.querySelectorAll('.music_list li');
let btn;
document.querySelector('.map_new').addEventListener('click',function(e){
    if(e.target.tagName != 'LI')return;
    document.querySelector('.change').style.display = 'none';
    let id = e.target.id;
    if(btn)btn.classList.toggle('selected');
    btn = e.target;
    btn.classList.toggle('selected');
    for (let i = 0; i < songs.length; i++) {
        const song = songs[i];
        if(song.className == id)song.style.display = 'list-item';
        else song.style.display = 'none';
    }
});