import { body, check } from 'express-validator';
import { User } from '../../models/user';

const emailValidator = () =>
  check('email')
    .isEmail()
    .withMessage('잘못된 이메일 형식입니다.')
    .custom(async (value, { req }) => {
      const users = await User.findAll({ where: { email: value } });
      const user = users[0];
      if (user) {
        return Promise.reject('이미 가입된 회원입니다.');
      }
    });

const passwordValidator = () =>
  body('password')
    .isLength({ min: 12 })
    .withMessage(
      '12자리 이상의 비밀번호를 입력해주세요.'
    )
    .custom((value, { req }) => {
      const regEx =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.~_-])[A-Za-z\d@$!%*?&#.~_-]{12,20}$/;
      if (!regEx.exec(value)) {
        throw new Error('영문자와 숫자, 기호를 포함한 최소 12자리 이상의 비밀번호를 입력해주세요.');
      }
      return true;
    });

const confirmPasswordValidator = () =>
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }
    return true;
  });

export { emailValidator, passwordValidator, confirmPasswordValidator };
