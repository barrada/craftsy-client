<template>
  <div class="flex items-center justify-center relative">
    <form
      @submit.prevent="verifyOTP"
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm"
    >
      <h1 class="text-xl font-bold mb-4">OTP Verification</h1>
      <div class="mb-3">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="otp">Enter OTP Code</label>
        <input
          v-model="otpCode"
          type="text"
          id="otp"
          placeholder="Enter OTP Code"
          required
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div class="otp-errors text-red-500 text-sm mb-2" v-if="showOTPError">
        {{ otpErrorMessage }}
      </div>
      <button
        type="submit"
        class="bg-slate-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full hover:bg-blue-700"
      >
        Verify OTP
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRuntimeConfig } from "#app";

const config = useRuntimeConfig();
const apiUrl = `${config.public.apiBase}/users/register`;

const otpCode = ref("");
const showOTPError = ref(false);
const otpErrorMessage = ref("");

const props = defineProps({
  userPhoneNumber: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
  selectedCountry: {
    type: Object,
    required: true,
  },
});


const verifyOTP = async () => {
  try {
    const response = await $fetch(`${apiUrl}/verify-otp`, {
      method: "POST",
      body: {
        otp: otpCode.value,
        phone: props.userPhoneNumber, // Assuming you have the user's phone number stored in a variable
        name: props.userName, // Pass the user's name
        password: props.userPassword, // Pass the user's password
        countryData: props.selectedCountry, // Pass the selected country data
      },
    });

    if (response.success) {
      // OTP verification successful, proceed with user registration
      await registerUser();
    } else {
      showOTPError.value = true;
      otpErrorMessage.value = response.message || "Invalid OTP code";
    }
  } catch (error) {
    showOTPError.value = true;
    otpErrorMessage.value = error.data || "OTP verification failed";
    console.error("OTP verification error:", error);
  }
};

const registerUser = async () => {
  try {
    const selectedCountry = countries.value.find(
      (country) => country.code === selectedCountryCode.value.slice(1)
    );

    const countryCodeWithoutPlus = selectedCountryCode.value.slice(1);
    const fullPhoneNumber = `00${countryCodeWithoutPlus}${phone.value}`;

    // Register the user with the provided data
    const response = await $fetch(apiUrl, {
      method: "POST",
      body: {
        name: name.value,
        password: password.value,
        phone: fullPhoneNumber,
        countryData: selectedCountry,
      },
    });

    console.log("User registered:", response);
    // Redirect or perform any other necessary actions after successful registration
  } catch (error) {
    errorMessage.value = error.data || "Registration failed";
    console.error("Registration error:", error);
  }
};
</script>