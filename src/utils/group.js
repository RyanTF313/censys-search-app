export const group = (arr) =>
  arr.reduce((r, x) => {
    (r[x.ip] = r[x.ip] || []).push(groupServices(x.services));
    return r;
  }, {});
export const groupServices = (services) => {
  const pojo = {};
  services.forEach((service) => {
    if (pojo[service.service_name]) {
      pojo[service.service_name] += 1;
    } else {
      pojo[service.service_name] = 1;
    }
  });
  return pojo;
};
