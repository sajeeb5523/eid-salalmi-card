function customAlert(title, message) {
    Swal.fire({
      title: title,
      text: message,
      confirmButtonText: "ঠিক আছে ",
      customClass: {
        confirmButton: "btn-custom",
      },
      confirmButtonColor: "#ef4d22",
    });
  } 