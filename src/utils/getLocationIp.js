export default function () {
  let url = location.href;
  url = url.substring(url.indexOf(':') + 3, url.lastIndexOf(':'));
  return url;
}
