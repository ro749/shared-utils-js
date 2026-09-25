export function configureEnums(enums) {
  window.enums = enums;
}

export function getEnum(enumName, enumValue) {
  return window.enums[enumName][enumValue];
}


