export default function toKebabCase(str) {
  console.log(str, str.trim().replace(/\s+/g, '-').toLowerCase())
    return str.trim().replace(/\s+/g, '-').toLowerCase();
  }