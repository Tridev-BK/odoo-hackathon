export const ok = (res, data, message, status = 200) => {
  return res.status(status).json({ data, ...(message ? { message } : {}) });
};

export const created = (res, data, message = "Created") => {
  return ok(res, data, message, 201);
};
