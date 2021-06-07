import express from 'express';
import { catchErrors } from '../handlers/error';
import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from '../moddlewares/validation';

import {
  REGISTER_ROUTE,
  LOGIN_ROUTE,
  UPDATE_USER_ROUTE,
  DELETE_USER_ROUTE,
  GET_USER_BY_ID_ROUTE,
  GET_ALL_USERS_ROUTE,
} from '../constants';

import {
  register,
  login,
  updateUser,
  deleteUser,
  getUserById,
  getAllUsers,
} from '../controllers/user';

const router = express.Router();

router.post(
  REGISTER_ROUTE,
  emailValidator,
  nameValidator,
  passwordValidator,
  catchErrors(register),
);
router.post(LOGIN_ROUTE, emailValidator, passwordValidator, catchErrors(login));
router.put(UPDATE_USER_ROUTE, catchErrors(updateUser));
router.delete(DELETE_USER_ROUTE, catchErrors(deleteUser));
router.get(GET_USER_BY_ID_ROUTE, catchErrors(getUserById));
router.get(GET_ALL_USERS_ROUTE, catchErrors(getAllUsers));

export default router;
