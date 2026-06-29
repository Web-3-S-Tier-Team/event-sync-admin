import { required, minLength, minValue } from "react-admin";

export const validateName = [required(), minLength(2)];

export const validateEmail = [required(), minLength(2)];

export const validateTitle = [required(), minLength(3)];

export const validateCapacity = [required(), minValue(1)];
