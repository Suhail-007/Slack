export const copyRefLink = async function(element) {
  await navigator.clipboard.writeText(element.innerText);
}
