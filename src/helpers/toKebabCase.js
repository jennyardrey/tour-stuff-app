export default function toKebabCase(str) {

    return str.trim().replace(/\s+/g, '-').toLowerCase();
  }