const PHONO_NO_REGEX = /^\+\d{1,4}\d{6,14}$/;
const SPECIAL_CHARACTERS_REGEX = /^[A-Za-z0-9]+$/;
const SPECIAL_CHARACTERS_SPACE_REGEX = /^[A-Za-z0-9 ]+$/;
// eslint-disable-next-line no-useless-escape
const DATE_REGEX = /^\d{2}[-\/]\d{2}[-\/]\d{4}$/;
// /^\d{2}-\d{2}-\d{4}$/;
const TIME_REGEX =
  /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](-([0-1]?[0-9]|2[0-3]):[0-5][0-9])?$/;

// eslint-disable-next-line object-curly-newline
export {
  PHONO_NO_REGEX,
  SPECIAL_CHARACTERS_REGEX,
  DATE_REGEX,
  TIME_REGEX,
  SPECIAL_CHARACTERS_SPACE_REGEX,
};
