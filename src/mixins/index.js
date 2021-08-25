import Vue from "vue";
import httpStatus from "../httpStatus";

const parseError = (error, locale = "es") => {
  let object = null;
  let status = null;
  let message = null;
  let code = null;
  let errors = [];
  if (error) {
      object = JSON.parse(JSON.stringify(error));
      object = object ? object : {};
      if (error.response && error.response.data) {
          status = error.response.status ? error.response.status : status;
          code = error.response.data.code;
          errors = error.response.data.errors || [];
          if (typeof error.response.data.error == "string") {
              message = error.response.data.error;
          } else if (typeof error.response.data.error == "object" || typeof error.response.data.error == "array") {
              errors = error.response.data.error || [];
          }
      } else {
          if (object.message == "Error de conexión") {
              status = 600;
          }
      }
  }
  status = status ? status : 400;
  status = code ? code : status;
  if (!message) {
      if (httpStatus[locale][status]) {
          message = httpStatus[locale][status];
      } else if (object.message) {
          message = object.message;
      } else if (error) {
          message = error;
      }
  }
  message = message ? message : "Error desconocido";
  return {
      status: status,
      message: message,
      errors: errors
  };
};

const isRetrievable = (error) => {
  let status = [408, 600, 400];
  if (error) {
    return status.includes(error.status);
  }
  return false;
};

Vue.mixin({
  methods: {
    parseError,
    isRetrievable,
  },
});
