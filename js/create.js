const cameraContainer = document.getElementById("camera-container");
const createButton = document.getElementById("create-button");
const step1 = document.getElementById("step-1");
const step2 = document.getElementById("step-2");
const step3 = document.getElementById("step-2");
const createLabel = document.getElementById("create-label");

let stream;
let recorder;
let video;

let timer;
let hours = "00";
let minutes = "00";
let seconds = "00";

let formdata;

async function getStreamAndRecord() {
  cameraContainer.innerHTML = `
  <h2>¿Nos das acceso a tu cámara?</h2>
  <p>¡Crea tu GIFO en sólo 3 pasos! por el tiempo en el que estés creando el GIFO.</p>`;

  addClass(createButton, "hidden");
  addClass(step1, "activate");

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true,
    });

    video = document.createElement("video");
    cameraContainer.innerHTML = "";
    cameraContainer.appendChild(video);
    video.srcObject = stream;
    await video.play();

    removeClass(createButton, "hidden");
    removeClass(step1, "activate");
    addClass(step2, "activate");
    createButton.innerText = "GRABAR";

    return stream;
  } catch (error) {
    console.error(error);
  }
}

function chronometer() {
  seconds++;

  if (seconds < 10) seconds = `0` + seconds;

  if (seconds > 59) {
    seconds = `00`;
    minutes++;

    if (minutes < 10) minutes = `0` + minutes;
  }

  if (minutes > 59) {
    minutes = `00`;
    hours++;

    if (hours < 10) hours = `0` + hours;
  }

  createLabel.textContent = `${hours}:${minutes}:${seconds}`;
}

function addHoverVideo() {
  const divHover = document.createElement("div");
  addClass(divHover, "div-hover-create");
  divHover.innerHTML = `
    ${SPINNER}
    <h2>Estamos Subiendo tu Gifo</h2>
  `;

  console.log(divHover);

  divHover.style.width = `${video.offsetWidth}px`;
  divHover.style.height = `${video.offsetHeight}px`;

  cameraContainer.insertBefore(divHover, video);
}

createButton.addEventListener("click", async () => {
  switch (createButton.innerText) {
    case "COMENZAR":
      stream = await getStreamAndRecord();
      addHoverVideo();
      break;

    case "GRABAR":
      console.log("grabando", stream);
      recorder = RecordRTC(stream, {
        type: "gif",
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        onGifRecordingStarted: function () {
          console.log("started");
        },
      });

      recorder.startRecording();
      createButton.innerText = "FINALIZAR";
      addClass(createLabel, "active");
      timer = setInterval(chronometer, 1000);

      break;

    case "FINALIZAR":
      console.log("stop");
      await recorder.stopRecording();
      await video.pause();
      clearInterval(timer);
      // let blob = await recorder.getBlob();
      // invokeSaveAsDialog(blob);
      formdata = new FormData();
      formdata.append("file", recorder.getBlob(), "myGif.gif");

      createButton.innerText = "SUBIR";
      break;

    case "SUBIR":
      console.log("subiendo");

      try {
        const response = await uploadGif(formdata);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
      break;

    default:
      break;
  }
});
