console.log('run tsc -w to watch all files...!');

const btn = document.getElementsByTagName('button')[0];

const clickHandler = () => {
    console.log('clicked');
}

btn.addEventListener('click', clickHandler);
