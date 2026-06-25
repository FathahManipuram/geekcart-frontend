// shared/services/pincode.service.js

export const getPincodeDetails = async (pincode) => {
  const response = await fetch(
    `https://api.postalpincode.in/pincode/${pincode}`,
  );

  const data = await response.json();
console.log("postofficeData: ", data)
  const postOffice = data?.[0]?.PostOffice?.[0];

  if (!postOffice) {
    throw new Error("Invalid pincode");
  }

  return {
    state: postOffice.State,
    city: postOffice.District,
  };
};
