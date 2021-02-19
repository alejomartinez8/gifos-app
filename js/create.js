const cameraContainer = document.getElementById("camera-container");
const createButton = document.getElementById("create-button");
const step1 = document.getElementById("step-1");
const step2 = document.getElementById("step-2");
const step3 = document.getElementById("step-2");
const createLabel = document.getElementById("create-label");

let stream;
let recorder;
let video;

let hours = "00";
let minutes = "00";
let seconds = "00";

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

createButton.addEventListener("click", async () => {
  let chronometerTimer;

  switch (createButton.innerText) {
    case "COMENZAR":
      stream = await getStreamAndRecord();
      console.log(stream);
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
      chronometerTimer = setInterval(chronometer, 1000);

      break;

    case "FINALIZAR":
      await recorder.stopRecording();
      await video.pause();
      clearInterval(chronometerTimer);
      let blob = await recorder.getBlob();
      // invokeSaveAsDialog(blob);
      let form = new FormData();
      form.append("file", recorder.getBlob(), "myGif.gif");
      console.log(form.get("file"));

      createButton.innerText = "SUBIR";
      break;

    case "SUBIR":
      console.log(subiendo);
      break;

    default:
      break;
  }
});
