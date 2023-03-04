const scene_controls = document.getElementById("scene_controls");
const scene_controls_thumb = document.getElementById("scene_controls_thumb");

const htmlArrowUp = `<img src="images/expand_less.svg" alt="arrow_up"/>`;
const htmlArrowDown = `<img src="images/expand_more.svg" alt="arrow_up"/>`;

scene_controls_thumb.onclick = () => {
    scene_controls.classList.toggle("active");

    if (scene_controls.classList.contains("active"))
        scene_controls_thumb.innerHTML = htmlArrowDown;
    else
        scene_controls_thumb.innerHTML = htmlArrowUp;
};