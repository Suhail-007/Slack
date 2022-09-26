const ref_link = document.querySelector('.ref_link');
export const copyRefLink = async function() {
  await navigator.clipboard.writeText(ref_link.innerText);
}
