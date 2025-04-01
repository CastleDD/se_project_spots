export function setButtonText(
  btn,
  isLoading,
  defaultText = "Save",
  loadingText = "Saving...",
  defaultDelete = "Delete",
  loadingDelete = "Deleting..."
) {
  if (isLoading) {
    btn.textContent =
      btn.textContent === defaultDelete ? loadingDelete : loadingText;
  } else {
    btn.textContent =
      btn.textContent === loadingDelete ? defaultDelete : defaultText;
  }
}
