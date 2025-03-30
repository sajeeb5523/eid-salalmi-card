let currentMessageType = "random";

function toggleMessageType(type) {
  currentMessageType = type;
  const randomBtn = document.getElementById("randomBtn");
  const customBtn = document.getElementById("customBtn");
  const customMessageInput = document.getElementById("customMessageInput");

  if (type === "random") {
    randomBtn.classList.add("primary_border", "primary_color");
    randomBtn.classList.remove("border-gray-200", "text-gray-500");
    customBtn.classList.remove("primary_border", "primary_color");
    customBtn.classList.add("border-gray-200", "text-gray-500");
    customMessageInput.classList.add("hidden");
  } else {
    customBtn.classList.add("primary_border", "primary_color");
    customBtn.classList.remove("border-gray-200", "text-gray-500");
    randomBtn.classList.remove("primary_border", "primary_color");
    randomBtn.classList.add("border-gray-200", "text-gray-500");
    customMessageInput.classList.remove("hidden");
  }
}

function getRandomMessage() {
  return randomMessages[Math.floor(Math.random() * randomMessages.length)];
}

function showForm() {
  document.getElementById("inputForm").classList.remove("hidden");
  document.getElementById("cardPreview").classList.add("hidden");
}

function generateCard() {
  const friendName = document.getElementById("friendName").value;
  const phoneNumber = document.getElementById("phoneNumber").value;

  const salamiAmount = document.getElementById("salamiAmount").value;
  const signature = document.getElementById("signature").value;
  let message;

  // Check if the message type is 'random' or custom
  if (currentMessageType === "random") {
    message = getRandomMessage();
  } else {
    message = document.getElementById("customMessage").value;
    if (!message) {
      customAlert("ম্যাসেজ খালি।", `আপনার ম্যাসেজটি লিখুন, তার পরে "কার্ড তৈরি করুন" বাটুনে ক্লিক করুন।`);
      return;
    }
  }

  // Validate all fields are filled
  if (!friendName || !phoneNumber || !salamiAmount || !signature) {
    customAlert("ফিল্ড খালি।", "অনুগ্রহ করে সমস্ত ঘর/ফিল্ড পূরণ করুন।");
    return;
  }

  // Mask the middle part of the phone number
  const maskedPhone = phoneNumber.replace(/^(\d{2})\d+(\d{2})$/, "$1****$2");

  // Set the preview values
  document.getElementById("previewName").textContent = friendName;
  document.getElementById("previewPhone").textContent = maskedPhone;
  if (salamiAmount > 0) {
    document.getElementById("previewAmount").textContent = salamiAmount;
  } else {
    customAlert("কিপ্টামি বন্ধ করুন।", "সালামি শুন্য থেকে বড় হতে হবে।");
    return;
  }
  document.getElementById("previewMessage").textContent = message;
  document.getElementById("previewSignature").textContent = signature;

  // Check if the removeDevInfo checkbox is checked
  const isDevInfoHidden = document.getElementById("removeDevInfo").checked;

  // Hide dev info and show card preview based on checkbox state
  if (isDevInfoHidden) {
    document.getElementById("devInfo").classList.add("hidden");
    document.getElementById("bkashLogo").classList.remove("hidden");
  } else {
    document.getElementById("devInfo").classList.remove("hidden");
    document.getElementById("bkashLogo").classList.add("hidden");
  }

  // Show the card preview and hide the input form
  document.getElementById("inputForm").classList.add("hidden");
  document.getElementById("cardPreview").classList.remove("hidden");
}

async function downloadCard() {
  const cardContent = document.getElementById("cardContent");
  const friendName = document.getElementById("friendName").value;

  try {
    const canvas = await html2canvas(cardContent, {
      scale: 2,
      backgroundColor: null,
    });

    const link = document.createElement("a");
    link.download = `eid-salami-${friendName.toLowerCase().replace(/\s+/g, "-")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  } catch (error) {
    console.error("Error generating image:", error);
  }
}

// Initialize with random message type
toggleMessageType("random");