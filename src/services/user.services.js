import http from "@/services/http.config";

export const getOtp = (body) => {
    return http({ url: "/user/send-otp", data: body, method: "POST" });
};

export const checkOtp = (body) => {
    return http({ url: "/user/check-otp", data: body, method: "POST" });
};

export const completeProfile = (body) => {
    return http.post("/user/register", body);
};

export const updateProfile = ({ data, token }) => {
    return http({ url: "/user/update", data, method: "PATCH", headers: { token } });
};

export const isUser = ({ token }) => {
    return http({ url: "/user/check-auth-by-jwt", method: "GET", headers: { token } });
};

export const addingUserAddressService = ({ token, body }) => {
    return http({ url: "/user/addresses/add", method: "PATCH", data: body, headers: { token } });
};

export const deleteUserAddressService = ({ token, addressID }) => {
    return http({ url: `/user/addresses/delete/${addressID}`, method: "DELETE", headers: { token } });
};

export const checkAuthByJWTService = ({ token }) => {
    return http({ url: "/user/check-auth-by-jwt", method: "GET", headers: { token } });
};
