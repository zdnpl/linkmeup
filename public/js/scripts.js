let currentStep = 0;

function validateStep(stepIndex) {
  const steps = document.querySelectorAll(".form-step");
  const inputs = steps[stepIndex].querySelectorAll("input, select, textarea");
  let isValid = true;

  inputs.forEach((input) => {
    if (input.required && !input.value.trim()) {
      isValid = false;
      input.classList.add("is-invalid");
    } else {
      input.classList.remove("is-invalid");
    }

    // Validasi khusus untuk URL
    if (input.type === "url") {
      if (!validateURL(input.value)) {
        isValid = false;
        input.classList.add("is-invalid");
      } else {
        input.classList.remove("is-invalid");
      }
    }
  });

  return isValid;
}

function validateURL(url) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(url);
}

function nextStep() {
  const steps = document.querySelectorAll(".form-step");

  if (validateStep(currentStep)) {
    steps[currentStep].classList.add("d-none");
    currentStep++;
    if (currentStep < steps.length) {
      steps[currentStep].classList.remove("d-none");
    }
  }
}

function previousStep() {
  const steps = document.querySelectorAll(".form-step");
  steps[currentStep].classList.add("d-none");
  currentStep--;
  if (currentStep >= 0) {
    steps[currentStep].classList.remove("d-none");
  }
}

document.getElementById("addLink").addEventListener("click", function () {
  if (document.querySelectorAll("#links .d-flex").length < 5) {
    const newLink = document.createElement("div");
    newLink.className = "d-flex justify-content-center mb-3";
    newLink.innerHTML = `
      <input type="text" class="input-form shadow-sm input-title" placeholder="Title" autocomplete="off" name="linkNames[]" required />
      <input type="url" class="input-form shadow-sm input-link" placeholder="Link URL (https://www.instagram.com/)" autocomplete="off" name="linkUrls[]" required />
      <button type="button" class="btn btn-danger btn-sm ms-2" onclick="removeLink(this)"><i class="bi bi-trash3"></i></button>
    `;
    document.getElementById("links").appendChild(newLink);
  }
});

function removeLink(button) {
  const linkGroup = button.parentElement;
  linkGroup.remove();
}

document.addEventListener("DOMContentLoaded", function () {
  const fontColorInput = document.getElementById("fontColor");
  const bgColorInput = document.getElementById("bgColor");
  const buttonColorInput = document.getElementById("buttonColor");

  const previewName = document.getElementById("previewName");
  const previewBio = document.getElementById("previewBio");
  const previewButton = document.getElementById("previewButton");

  function updatePreview() {
    previewName.style.color = fontColorInput.value;
    previewBio.style.color = fontColorInput.value;
    previewButton.style.backgroundColor = buttonColorInput.value;
    previewButton.style.borderColor = buttonColorInput.value;
    document.getElementById("themePreview").style.backgroundColor = bgColorInput.value;
  }

  fontColorInput.addEventListener("input", updatePreview);
  bgColorInput.addEventListener("input", updatePreview);
  buttonColorInput.addEventListener("input", updatePreview);
});
