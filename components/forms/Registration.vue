<template>
  <div class="flex items-center justify-center relative">
    <form
     v-if="!showOTPVerification"
       @submit.prevent="sendOTPCode"
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm"
    >
      <h1 class="text-xl font-bold mb-4">{{ $t("registration.register") }}</h1>
      <!-- Name input -->
      <div class="mb-3">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">{{
          $t("registration.name")
        }}</label>
        <input
          v-model="name"
          type="text"
          id="name"
          placeholder="First and last name"
          required
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          @input="validateName"
        />
      </div>
      <!-- name errors -->
      <div class="name-errors text-red-500 text-sm mb-2" v-if="showNameError">
        {{ nameErrorMessage }}
      </div>

      <!-- Phone Input -->
      <div class="mb-3">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="phone">{{
          $t("registration.phone")
        }}</label>
        <div class="flex">
          <div
            class="country-code-container shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            @click="toggleCountryList"
          >
            <img
              class="country-flag"
              :src="selectedCountryFlag"
              alt="Country Flag"
            />
            <span class="country-code">{{ selectedCountryCode }}</span>
            <i class="arrow-icon"></i>
          </div>
          <div class="phone-input">
            <input
              type="tel"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Mobile number"
              v-model="phone"
              required
               @input="handlePhoneInput"
              @keypress="isNumber($event)"
          
            />
          </div>
        </div>

        <div
          class="country-list-container"
          :class="{ hidden: !showCountryList }"
        >
          <ul class="country-list">
            <li
              v-for="country in countries"
              :key="country.code"
              @click="selectCountry(country)"
            >
              <img
                :src="`/img/flags/${country.initials}.png`"
                class="countryflag w-6 h-4 mr-2"
                :alt="`${country.name} flag`"
              />
              <span class="country-name">{{ country.name }}</span>
              <!-- Show only country name -->
            </li>
          </ul>
        </div>
      </div>
      <!-- phone errors -->
      <div class="phone-errors text-red-500 text-sm mb-2" v-if="isPhoneErrorVisible">
  {{ phoneError }}
</div>

      <!-- Password Input -->
      <div class="mb-4 relative">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password"
          >{{ $t("registration.password") }}</label
        >
        <div class="flex items-center">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            id="password"
            required
            placeholder="At least 6 characters"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
            @input="validatePassword"
          />
          <div
            class="absolute  right-0 pr-3 flex items-center"
            @click="toggleShowPassword"
          >
            <EyeIcon
              v-if="!showPassword"
              class="h-5 w-5 text-gray-500 cursor-pointer"
            />
            <EyeSlashIcon
              v-else
              class="h-5 w-5 text-gray-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
      <!-- password errors -->
      <div
        class="password-errors text-red-500 text-sm mb-2"
        v-if="showPasswordError"
      >
        {{ passwordErrorMessage }}
      </div>

      <!-- Submit Form -->
      <button
        type="submit"
        :disabled="!formValid"
        :class="[
          'bg-slate-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full',
          formValid ? 'hover:bg-blue-700' : 'opacity-50 cursor-not-allowed',
        ]"
        @click.prevent="handleSubmit"
      >
      
      <span v-if="!isSubmitting">{{ $t("registration.submit") }}</span>
      <IndicatorsProcessing v-else />

      </button>
      <!-- form errors -->
      <div class="form-errors">
        <p v-if="errorMessage" class="text-red-500 text-xs mt-2">
          {{ errorMessage }}
        </p>
      </div>

      <!-- Social Media Seperator -->
      <div class="inline-flex items-center justify-center w-full">
        <hr class="w-full h-0.5 my-4 bg-gray-200 border-0" />
        <div class="absolute px-4 -translate-x-1/2 bg-white left-1/2">
          <div class="text-slate-400">OR</div>
        </div>
      </div>
      <!--  Social Media Login-->

      <button
        class="bg-white-800 hover:bg-blue-700 border-2 border-slate-400 text-slate-600 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
      >
        <svgo-img-google filled class="inline text-xl mr-1" />Continue with
        Google
      </button>
      <button
        class="bg-white-800 hover:bg-blue-700 border-2 border-slate-400 text-slate-600 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full my-3"
      >
        <svgo-img-facebook filled class="inline text-xl mr-1" /> Continue with
        Facebook
      </button>
      <button
        class="bg-white-800 hover:bg-blue-700 border-2 border-slate-400 text-slate-600 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
      >
        <svgo-img-apple filled class="inline text-xl mr-1" /> Continue with
        Apple
      </button>

      <!-- Already Have An Account - Sign In Link -->
      <div class="mt-2 ml-1 text-sm text-slate-600">
        Already have an account?
        <NuxtLink
          :to="localePath('/signin')"
          class="text-sky-600 font-semibold underline"
        >
          Sign in</NuxtLink
        >
      </div>

      <!-- before submit info -->
      <hr class="my-2" />
      <div class="text-xs ml-1 mt-2 text-slate-600">
        By clicking Continue with Google, Facebook, or Apple, you agree to
        Crafty's
        <NuxtLink
          to="legal/terms-of-use"
          class="text-sky-600 font-semibold underline"
        >
          Terms of Use
        </NuxtLink>
        and
        <NuxtLink
          to="legal/privacy-policy"
          class="text-sky-600 font-semibold underline"
        >
          Privacy Policy</NuxtLink
        >.
      </div>
    </form>
    <!-- OTP SMS Verification -->
     <FormsOtpSmsVerification 
     v-else
      :fullPhoneNumber="fullPhoneNumber"
      :selectedCountry="selectedCountry"
      :config="config"
      @otp-verified="completeRegistration"
       @wrong-number="showRegistrationForm"
     />
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRuntimeConfig } from "#app";

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

import countryData from "@/assets/countryData.json";
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/outline";
import FormsOtpSmsVerification from '@/components/forms/OtpSmsVerification.vue'

const showOTPVerification = ref(false)


const config = useRuntimeConfig();
const apiUrl = `${config.public.apiBase}/users/register`;
const checkPhoneUrl = `${config.public.apiBase}/users/check-phone`;

const name = ref("");
const password = ref("");
const phone = ref("");

const selectedCountry = ref(null); 
const fullPhoneNumber = ref('')

const errorMessage = ref("");
const showPassword = ref(false); // State for showing/hiding password

const showNameError = ref(false);
const showPhoneError = ref(false);
const showPasswordError = ref(false);

const phoneError = ref("");
const isPhoneErrorVisible = ref(false);

const nameValid = computed(() => {
  const names = name.value.trim().split(" ");
  return (
    names.length >= 2 &&
    names.every((name) => name.length >= 2 && !/\d/.test(name))
  );
});

const nameErrorMessage = computed(() => {
  const names = name.value.trim().split(" ");
  if (names.length === 1) {
    return t('registration.errors.empty_name')  
  } else if (names.some((name) => name.length < 2)) {
    return t('registration.errors.2char_name') ;
  } else if (names.some((name) => /\d/.test(name))) {
    return t('registration.errors.nonum_name') ;
  }
  return "";
});

const phoneValid = computed(() => {
  const phoneNumber = phone.value.replace(/\D/g, ""); // Remove non-digit characters
  return phoneNumber.length >= 6;
});

const phoneErrorMessage = computed(() => {
  return phoneValid.value
    ? ""
    : "Phone number must be at least 6 digits long";
});

const passwordValid = computed(() => {
  return password.value.length >= 6;
});

const passwordErrorMessage = computed(() => {
  return passwordValid.value
    ? ""
    : "Password must be at least 6 characters long";
});

const formValid = computed(() => {
  return nameValid.value && phoneValid.value && passwordValid.value && !isPhoneErrorVisible.value;
});
     // Check if the phone number already exists
     const checkPhoneAvailability = async () => {
  try {
    const selectedCountry = countries.value.find(
      (country) => country.code === selectedCountryCode.value.slice(1)
    );

    const countryCode = selectedCountryCode.value;
    const fullPhoneNumber = `${countryCode}${phone.value}`;

    const checkPhoneResponse = await $fetch(checkPhoneUrl, {
      method: "POST",
      body: {
        phone: fullPhoneNumber,
      },
    });

    if (checkPhoneResponse.exists) {
      phoneError.value = "Phone number already exists";
      isPhoneErrorVisible.value = true;
    } else {
      phoneError.value = "";
      isPhoneErrorVisible.value = false;
    }
  } catch (error) {
    console.error("Error checking phone availability:", error);
    phoneError.value = "Error checking phone availability";
    isPhoneErrorVisible.value = true;
  }
};

//  prevent multiple API calls when the user is typing quickly.
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};
const debouncedCheckPhoneAvailability = debounce(checkPhoneAvailability, 500);

    // handle phone inputs
    const handlePhoneInput = async () => {
  validatePhone(); // Validate phone number on input
  await debouncedCheckPhoneAvailability(); // Check availability
};
// Submit Registration
const register = async () => {
  try {
        // Reset phone error before registration
   

    // const selectedCountry = countries.value.find(
    //   (country) => country.code === selectedCountryCode.value.slice(1)
    // );

    const countryCode = selectedCountryCode.value;
    const fullPhoneNumber = `${countryCode}${phone.value}`;




    // response
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

// Validation functions
function validateName() {
  showNameError.value = !nameValid.value;
}

function validatePhone() {
  const phoneNumber = phone.value.replace(/\D/g, ""); // Remove non-digit characters
  if (phoneNumber.length < 6) {
    phoneError.value = "Phone number must be at least 6 digits long";
    isPhoneErrorVisible.value = true; // Show error
  } else {
    // Only clear the error if the phone number is *valid* and at least 6 digits
    phoneError.value = ""; 
    isPhoneErrorVisible.value = false; // Hide error
  }
}

function validatePassword() {
  showPasswordError.value = !passwordValid.value;
}

// ADDED Country selection INPUT

const countries = ref([]);
const selectedCountryCode = ref("+20"); // Default dialing code for Egypt
const selectedCountryFlag = ref("/img/flags/eg.png"); // Default flag for Egypt
const showCountryList = ref(false);

onMounted(() => {
  countries.value = countryData;
});

function selectCountry(country) {
  // Find the selected country object from the countryData.json
  const selectedCountryObj = countries.value.find(c => c.code === country.code);

  if (selectedCountryObj) {
    selectedCountryCode.value = `+${selectedCountryObj.code}`; // Set the code with a plus sign
    selectedCountryFlag.value = getCountryFlagPath(selectedCountryObj.initials); // Set the flag using initials
    selectedCountry.value = { name: selectedCountryObj.name, code: selectedCountryObj.code }; // Set the selectedCountry object
    showCountryList.value = false; // Hide the dropdown
  } else {
    console.error('Invalid country data:', country);
  }
}

function toggleCountryList() {
  showCountryList.value = !showCountryList.value;
}

function getCountryFlagPath(initials) {
  return `/img/flags/${initials}.png`; // Use initials to construct the path
}

function toggleShowPassword() {
  showPassword.value = !showPassword.value;
}
function isNumber(event) {
  const keyCode = event.keyCode;
  const isValidNumber = (keyCode >= 48 && keyCode <= 57) || keyCode === 8;
  if (!isValidNumber) {
    event.preventDefault();
  }
}
// check phone availability

// NEW CODE ADDED

// show spinner
const isSubmitting = ref(false);

const handleSubmit = async () => {
  isSubmitting.value = true;
  try {
    await sendOTPCode();
  } catch (error) {
    console.error("Error sending OTP:", error);
  } finally {
    isSubmitting.value = false;
  }
};

// Send OTP code to the server
const sendOTPCode = async (event) => {
  try {
    // Construct the full phone number
    const selectedCountry = countries.value.find(
      (country) => country.code === selectedCountryCode.value.slice(1)
    );
    const countryCode = selectedCountryCode.value;
    fullPhoneNumber.value = `${countryCode}${phone.value}`;

    // Prepare the request payload
    const payload = {
      phone: fullPhoneNumber.value,
      // Any other required data
    };

    // Send the OTP request to the server
    const response = await $fetch(`${config.public.apiBase}/communication/otp/sms/send`, {
      method: "POST",
      body: payload,
    });

    // Handle the response if needed

    // Show the OTP verification component
    showOTPVerification.value = true;
  } catch (error) {
    console.error("Error sending OTP:", error);
  }
};

// Complete the registration after OTP verification

const completeRegistration = async () => {
  try {
        // Find the Egypt country object from the countryData
        const egyptCountry = countries.value.find(country => country.name === 'Egypt');
    // Prepare the request payload with the OTP code
    const payload = {
      name: name.value,
      password: password.value,
      phone: fullPhoneNumber.value,
      countryData: selectedCountry.value || egyptCountry // Use the selectedCountry object directly
  
    };

    // Send the registration request to the server
    console.log('Registration payload:', payload);
    const response = await $fetch(`${config.public.apiBase}/users/register`, {
      method: "POST",
      body: payload,
    });

    // Handle the response if needed
    console.log("User registered:", response);
  } catch (error) {
    errorMessage.value = error.data || "Registration failed";
    console.error("Registration error:", error);
  }
};
const showRegistrationForm = () => {
  showOTPVerification.value = false;
};

</script>

<style scoped>
.country-code-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 8px;
}

.country-flag {
  width: 24px;
  height: 16px;
  margin-right: 4px;
}

.arrow-icon {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #333;
  margin-left: 4px;
}

.phone-input {
  flex: 1;
  border: none;
  outline: none;
}

.country-list-container {
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  z-index: 1;
}

.country-list-container.hidden {
  display: none;
}

.country-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.country-list li {
  display: flex;
  align-items: center;
  padding: 4px;
  cursor: pointer;
}

.country-list li:hover {
  background-color: #f5f5f5;
}
.country-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.country-list li {
  padding: 10px;
  cursor: pointer;
}

.country-list li:hover {
  background-color: #f0f0f0; /* Change background on hover */
}

.country-code-container {
  display: flex;
  align-items: center;
}
input::placeholder {
  font-size: 0.9rem;
}
</style>