
import {
getFormCSRF,
signUpForm,
checkSuccessRedirect,
getEmailWithConfirmationLink,
openConfirmationLink,
generateUserDataWithEmail
} from './utils/gitflic'

describe('GitFlic.ru', () => {
  describe('Registration', () => {
    it('can create new user', async () => {
      await generateUserDataWithEmail();

      await getFormCSRF();

      await signUpForm();

      await checkSuccessRedirect();

      await getEmailWithConfirmationLink();

      await openConfirmationLink();
    })
  })
})