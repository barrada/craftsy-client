<template>
  <div class="flex items-center justify-center relative">
    <form
      @submit.prevent="verifyOTP"
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm"
    >
      <h1 class="text-xl font-bold mb-4">OTP Verification</h1>
      <div class="mb-3">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="otp"
          >Enter OTP Code</label
        >
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
        :disabled="isLocked"
        class="bg-slate-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full hover:bg-blue-700"
        :class="{ 'opacity-50 cursor-not-allowed': isLocked }"
      >
      <span v-if="!isVerifying">Verify OTP</span>
      <IndicatorsProcessing v-else />
      </button>
      <div class="mt-4">
        <span class="text-sm">Didn't receive the code?</span>
        <a
          href="#"
          class="text-blue-600 hover:text-blue-800 ml-2"
          @click.prevent="resendOTPCode"
          :disabled="!isResendAllowed"
          :class="{ 'opacity-50 cursor-not-allowed': !isResendAllowed }"
          >Resend OTP<span v-if="resendCountdown > 0"> ({{ resendCountdown }})</span></a
        >
      </div>
      <div v-if="isLocked" class="mt-4 text-red-500">
        Your account has been temporarily locked due to too many failed attempts.
        Please try again after 60 minutes.
      </div>
      <div class="mt-4">
        <a
          href="#"
          class="text-blue-600 hover:text-blue-800"
          @click.prevent="wrongNumber"
          >Wrong number?</a
        >
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  fullPhoneNumber: {
    type: String,
    required: true,
  },
  selectedCountry: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  config: {
    type: Object,
    required: true,
  },
});

const otpCode = ref("");
const showOTPError = ref(false);
const otpErrorMessage = ref("");
const failedAttempts = ref(0);
const isResendAllowed = ref(false);
const isLocked = ref(false);
const resendTimer = ref(null);
const resendCountdown = ref(60);
const resendAttempts = ref(0);
const maxResendAttempts = 3;
const isVerifying = ref(false);

const emit = defineEmits(["otp-verified", "wrong-number"]);

const wrongNumber = () => {
  emit("wrong-number");
};

const verifyOTP = async () => {
  isVerifying.value = true;
  try {
    const payload = {
      phone: props.fullPhoneNumber,
      otp: otpCode.value,
    };
    console.log("Request payload:", payload);

    const response = await $fetch(
      `${props.config.public.apiBase}/communication/otp/sms/verify`,
      {
        method: "POST",
        body: payload,
      }
    );
    console.log("Server response:", response);

    if (response.message === "OTP verified and deleted successfully") {
      emit("otp-verified", otpCode.value);
      failedAttempts.value = 0; // Reset failed attempts
      isLocked.value = false; // Unlock the account if it was locked
      resendAttempts.value = 0; // Reset resend attempts
    } else {
      showOTPError.value = true;
      otpErrorMessage.value = response.error || "Invalid OTP";
      failedAttempts.value++; // Increment failed attempts
      handleFailedAttempts();
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
    failedAttempts.value++; // Increment failed attempts
    handleFailedAttempts();
  }finally {
    isVerifying.value = false; // Set isVerifying to false after verifying OTP
  }
};

const handleFailedAttempts = () => {
  if (failedAttempts.value >= 3) {
    isLocked.value = true; // Lock the account
    setTimeout(() => {
      isLocked.value = false; // Unlock the account after 60 minutes
      failedAttempts.value = 0; // Reset failed attempts
    }, 60 * 60 * 1000); // 60 minutes in milliseconds
  }
};

const resendOTPCode = async () => {
  if (resendAttempts.value >= maxResendAttempts) {
    isLocked.value = true; // Lock the account if max resend attempts reached
    setTimeout(() => {
      isLocked.value = false; // Unlock the account after 60 minutes
      resendAttempts.value = 0; // Reset resend attempts
    }, 60 * 60 * 1000); // 60 minutes in milliseconds
    return;
  }

  try {
    const payload = {
      phone: props.fullPhoneNumber,
   
      // Any other required data
    };
    console.log('Deleting OTP with payload:', payload);
    // Delete the old OTP code from the database
    await $fetch(`${props.config.public.apiBase}/communication/otp/sms/delete`, {
      method: "DELETE",
      body: payload,
    });

    // Send a new OTP code and insert it into the database
    const response = await $fetch(
      `${props.config.public.apiBase}/communication/otp/sms/send`,
      {
        method: "POST",
        body: payload,
      }
    );

    // Handle the response if needed
    console.log("OTP resent successfully");
    resendAttempts.value++; // Increment resend attempts
    startResendTimer();
  } catch (error) {
    console.error("Error resending OTP:", error);
  }
};

const startResendTimer = () => {
  isResendAllowed.value = false;
  clearInterval(resendTimer.value);
  resendCountdown.value = 60; // Reset countdown to 60 seconds

  resendTimer.value = setInterval(() => {
    resendCountdown.value--;
    if (resendCountdown.value === 0) {
      isResendAllowed.value = true;
      clearInterval(resendTimer.value);
    }
  }, 1000);
};

onMounted(() => {
  startResendTimer();
});
</script>