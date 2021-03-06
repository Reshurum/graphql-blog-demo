// MIT License
//
// Copyright (c) 2018 Walter Kuppens
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

/* tslint:disable:object-literal-key-quotes */

type TemplatedTranslation = (args: any) => string;

interface Translation {
  [locale: string]: string | TemplatedTranslation;
}

interface Translations {
  [string: string]: Translation;
}

/**
 * All human-readable strings and their translations are stored here.
 */
const translations: Translations = {
  'InternalError': {
    'en': `Unable to process request due to an internal error.`,
  },
  'EmailClaimedError': {
    'en': `Email is already in use by another account.`,
  },
  'InvalidEmail': {
    'en': `The specified email isn't a valid email address.`,
  },
  'InvalidEmailLength': {
    'en': (args: any) => `Email must be between ${args.min} and ${args.max} characters long.`,
  },
  'InvalidNameLength': {
    'en': (args: any) => `Name must be between ${args.min} and ${args.max} characters long.`,
  },
  'InvalidPasswordLength': {
    'en': (args: any) => `Password must be at least ${args.min} chatacters long.`,
  },
  'InvalidAuthorizationInfo': {
    'en': `Email or password is incorrect.`,
  },
  'PasswordDoesntMatch': {
    'en': `The old password provided doesn't match your current password.`,
  },
  'PasswordRequired': {
    'en': `A password is required.`,
  },
  'EditUserDoesntExist': {
    'en': `The user you're trying to edit doesn't exist.`,
  },
  'InvalidPermissionString': {
    'en': `The permissions provided is invalid (no leading dots, trailing dots, or double dots).`,
  },
  'FieldAccessUnauthorized': {
    'en': (args: any) => `You're not authorized to access field '${args.fieldName}'.`,
  },
  'EditUnauthorized': {
    'en': `You're not authorized to edit this resource.`,
  },
  'DeleteUnauthorized': {
    'en': `You're not authorized to delete this resource.`,
  },
  'InvalidUserInfo': {
    'en': `Invalid user information specified.`,
  },
};

/**
 * Fetches a string message for a desired string in a chosen language.
 * @param string
 * @param locale
 */
export function getLocaleString(string: string, context?: any, args?: any): string {
  if (!(string in translations)) {
    throw new Error(`Unsupported translation string requested.`);
  }

  const locale = 'en';
  if (context != null) {
    // TODO: Handle different locales.
  }

  const candidates = translations[string];
  let actualLocale = locale;
  if (!(locale in candidates)) {
    actualLocale = 'en';
  }

  if (!(actualLocale in candidates)) {
    throw new Error(`No translations are available for the requested string.`);
  }

  const candidate = candidates[actualLocale];
  if (typeof candidate === 'string') {
    return candidate as string;
  } else {
    return candidate(args);
  }
}
