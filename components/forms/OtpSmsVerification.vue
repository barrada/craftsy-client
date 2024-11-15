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

const props = defineProps({
  fullPhoneNumber: {
    type: String,
    required: true,
  },
  selectedCountry: {
    type: Object,
    required: true,
    default: () => ({})
  },
  config: {
    type: Object,
    required: true,
  },
});

const otpCode = ref("");
const showOTPError = ref(false);
const otpErrorMessage = ref("");

const emit = defineEmits(["otp-verified"]);

const verifyOTP = async () => {
  try {
    const payload = {
      phone: props.fullPhoneNumber,
      otp: otpCode.value,
    };
    console.log("Request payload:", payload);

    const response = await $fetch(`${props.config.public.apiBase}/communication/otp/sms/verify`, {
      method: "POST",
      body: payload,
    });
    console.log("Server response:", response);

    if (response.message === 'OTP verified and deleted successfully') {
  emit("otp-verified", otpCode.value);
} else {
  showOTPError.value = true;
  otpErrorMessage.value = response.error || "Invalid OTP";
}
  } catch (error) {
  console.error("Error verifying OTP:", error);
  if (error.response && error.response.data && error.response.data.error) {
    showOTPError.value = true;
    otpErrorMessage.value = error.response.data.error;
  } else {
    showOTPError.value = true;
    otpErrorMessage.value = "Failed to verify OTP";
  }
}
};
</script>