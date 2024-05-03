const MainImg = document.getElementById('MainImg');
const smallimg = document.getElementsByClassName('small-img');

// Just to see the images on the console
console.log(`The HTML Collection is:`, smallimg);


smallimg[0].addEventListener('click', function() {
    MainImg.src = smallimg[0].src;
});

smallimg[1].addEventListener('click', function() {
    MainImg.src = smallimg[1].src;
});

smallimg[2].addEventListener('click', function() {
    MainImg.src = smallimg[2].src;
});

smallimg[3].addEventListener('click', function() {
    MainImg.src = smallimg[3].src;
});
